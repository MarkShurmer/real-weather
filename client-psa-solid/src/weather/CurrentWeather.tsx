import { Card, CardContent, CardHeader, TextField } from "@suid/material";
import { Component, createEffect, createResource, createSignal, ErrorBoundary, Show } from "solid-js";
import { Weather } from "./weather-types";
import { format } from "date-fns";
import { Visibility } from "./Visibility";
import type { ChangeEventHandler } from "@suid/types";

import styles from "./Weather.module.css";

const DEGREE_SYMBOL = "\u00B0";

function formatDate(date: string) {
  const asDate = new Date(date);
  return format(asDate, "HH:mm:ss"); // `${asDate.getHours()}:${asDate.getMinutes().toString()}:${asDate.getSeconds()}`;
}

const fetchWeather = async (postcode: string) => {
  const url = new URL("http://localhost:3000/weather");
  url.search = new URLSearchParams({ postcode }).toString();

  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const CurrentWeather: Component<{}> = (props) => {
  const [postcode, setPostcode] = createSignal<string>("");
  const [weather] = createResource<Weather, string, Error>(postcode, fetchWeather);

  const onChangePostcode: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setPostcode(e.currentTarget.value);
  };

  createEffect(() => {
    console.log("weather", weather());
  });

  return (
    <div class={styles.weatherContainer} role="region">
      <form>
        <TextField
          placeholder="Enter postcode"
          label="Enter a full postcode to get current weather"
          variant="outlined"
          fullWidth
          onChange={onChangePostcode}
        />
      </form>

      <Show when={weather()} fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback="error">
          <div class={styles.weatherDisplay} role="contentinfo">
            <Card>
              <CardHeader>Current Weather</CardHeader>
              <CardContent>
                <div class={styles.cardMain} role="contentinfo">
                  <div class={styles.cardItem}>Temperature</div>
                  <div class={styles.cardItem}>
                    {weather().report.temperature.amount} {DEGREE_SYMBOL}
                    {weather().report.temperature.units}
                  </div>

                  <div class={styles.cardItem}>Type</div>
                  <div class={styles.cardItem}>{weather()?.report.weatherType}</div>

                  <div class={styles.cardItem}>Location</div>
                  <div class={styles.cardItem}>{weather()?.name}</div>

                  <div class={styles.cardItem}>Visibility</div>
                  <div class={styles.cardItem}>
                    <Visibility visibility={weather()!.report.visibility} />
                  </div>

                  <div class={styles.cardItem}>Time</div>
                  <div class={styles.cardItem}>{formatDate(weather()!.date)}</div>

                  <div class={styles.cardItem}>Pressure</div>
                  <div class={styles.cardItem}>
                    {weather()?.report.pressure.amount} {weather()?.report.pressure.units}
                  </div>

                  <div class={styles.cardItem}>Humidity</div>
                  <div class={styles.cardItem}>
                    {weather()?.report.humidity.amount} {weather()?.report.humidity.units}
                  </div>

                  <div class={styles.cardItem}>Wind</div>
                  <div class={styles.cardItem}>
                    {weather()?.report.windDirection} {" from "}
                    {weather()?.report.windSpeed.amount} {weather()?.report.windSpeed.units} {" to "}
                    {weather()?.report.windGust.amount} {weather()?.report.windGust.units}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ErrorBoundary>
      </Show>
    </div>
  );
};
