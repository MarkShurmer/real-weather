import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import { RecoilRoot } from 'recoil'

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



const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
    initRecoilState?: RecoilInitatior
) => 
    render(ui, { wrapper: providerWrapper(initRecoilState), ...options })


export * from '@testing-library/react'
export {customRender as render}