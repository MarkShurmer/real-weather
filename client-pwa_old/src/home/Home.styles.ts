import { createUseStyles } from 'react-jss';

export type HomeStyleProps = {
    isError: boolean;
};

export const useHomeStyles = createUseStyles({
    contentView: {
        display: 'flex',
        flexDirection: 'column',
        margin: 10,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
    },
    subHeader: {
        // backgroundColor: '#2089dc',
        // color: 'white',
        textAlign: 'center' as const,
        padding: 10,
        margin: 10,
    },
    cta: {
        width: 200,
        marginHorizontal: 50,
        marginVertical: 10,
    },
    errorPanel: {
        display: (props: HomeStyleProps) => (props.isError ? 'flex' : 'none'),
        borderRadius: 7.5,
        padding: 15,
        backgroundColor: '#ff3333',
    },
    errorText: {
        color: '#ffffff',
        opacity: 0.7,
        // padding: 15,
    },
});
