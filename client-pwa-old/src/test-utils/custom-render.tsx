import React, {ReactElement} from 'react'
import {render, queries, within, RenderOptions} from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import * as customQueries from './custom-queries'


const allQueries = {
  ...queries,
  ...customQueries,
}

export type RecoilInitatior = () => void;

const providerWrapper = (initRecoilState?:  RecoilInitatior) => {
    const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
        return (
            <RecoilRoot initializeState={initRecoilState}>
                {children}
            </RecoilRoot>
        )
    }

    return AllTheProviders
}

const customScreen = within(document.body, allQueries)
// const customWithin = (element: ReactElement) => within(element, allQueries)
const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
    initRecoilState?: RecoilInitatior
) => 
    render(ui, { wrapper: providerWrapper(initRecoilState), ...options })


export * from '@testing-library/react'
export {customScreen as screen, customRender as render}