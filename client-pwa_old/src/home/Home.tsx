import { ChangeEvent, Suspense, useCallback, useState } from 'react';
import { useHomeStyles } from '@/home/Home.styles';
import Loading from '@/loading/Loading';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import CurrentWeather from '@/weather/CurrentWeather';

export function Home() {
    const [error, setError] = useState('');
    const [postcode, setPostcode] = useState<string>('');
    const [postcodeValidated, setPostcodeValidated] = useState<string>('');
    const classes = useHomeStyles({ isError: error !== '' });
    // const addrRef = useRef<HTMLInputElement>(null);

    const onChangePostcode = (e: ChangeEvent<HTMLInputElement>) => {
        setPostcode(e.target.value);
        checkPostCode(e.target.value);
    };

    const checkPostCode = (postCode: string) => {
        if (postCode.length < 6) {
            setError('Must be full post code');
        } else {
            setError('');
        }
    };

    const onClickSearch = useCallback(() => {
        if (postcode.length >= 6) {
            setPostcodeValidated(postcode);
        }
    }, [postcode]);

    return (
        <section className={classes.contentView} data-testid="home">
            <div className={classes.subHeader}>Enter your postcode to get nearest current info</div>
            <div className={classes.buttonsContainer} role="search">
                <label htmlFor="postcode">Username</label>
                <InputText
                    type="text"
                    id="postcode"
                    placeholder="Enter postcode"
                    aria-describedby="postcode-help"
                    value={postcode}
                    onChange={onChangePostcode}
                />
                <small id="username-help">Enter the postcdoe to get current weather for.</small>
                <Button onClick={onClickSearch}>Get weather</Button>
            </div>
            {postcodeValidated && (
                <Suspense fallback={<Loading />}>
                    <CurrentWeather postcode={postcodeValidated} />
                </Suspense>
            )}

            <div className={classes.errorPanel} role="alert">
                <div className={classes.errorText}>{error}</div>
            </div>
        </section>
    );
}
