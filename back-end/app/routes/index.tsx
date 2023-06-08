import { Suspense, useRef, useState } from "react";
import Header from "./Header";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useRecoilState } from "recoil";

export default function Index() {
  const addrRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [, setPostCode] = useRecoilState(postCodeAtom);

  const loadInfo = async () => {
    const newPostCode = addrRef.current?.value ?? "";
    if (newPostCode.length < 6) {
      setError("Must be full post code");
      return;
    }

    setPostCode(newPostCode);
  };

  return (
    <main className=" bg-white text-black">
      <Header />

      <div className="container mx-40 my-20">
        <section className="m-10 flex flex-col">
          <div className="m-5 p-5 text-center">
            Enter your postcode to get nearest current info
          </div>
          <div
            className="my-5 flex flex-wrap items-center justify-around"
            role="search"
          >
            <InputText placeholder="Enter postcode" ref={addrRef} />
            <Button onClick={loadInfo}>Get weather</Button>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <CurrentWeather />
          </Suspense>

          <div className={classes.errorPanel} role="alert">
            <div className={classes.errorText}>{error}</div>
          </div>
        </section>
      </div>
    </main>
  );
}

export const useHomeStyles = createUseStyles({
  contentView: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  subHeader: {
    // backgroundColor: '#2089dc',
    // color: 'white',
    textAlign: "center" as const,
    padding: 10,
    margin: 10,
  },
  cta: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  errorPanel: {
    display: (props: HomeStyleProps) => (props.isError ? "flex" : "none"),
    borderRadius: 7.5,
    padding: 15,
    backgroundColor: "#ff3333",
  },
  errorText: {
    color: "#ffffff",
    opacity: 0.7,
    // padding: 15,
  },
});
