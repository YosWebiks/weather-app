import React, { useEffect, useState } from "react";
import { Units } from "./eunms";

export default function App() {
  const [data, setData] = useState<any>();
  const [city, setCity] = useState(""); // location default
  const [unit, setUnit] = useState<Units>(Units.C);

  useEffect(() => {
    (async () => {
      try {
        if (city.length < 3) return;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d7f64e05043d19af9eb95658ec1a2f74&units=${unit}`
        );
        const d = await res.json();
        console.log(d.cod);
        if (d.cod == 200) {
          setData(d);
        }
        console.log(d);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [city, unit]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      //(position.coords.latitude, position.coords.longitude);

      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=d7f64e05043d19af9eb95658ec1a2f74&`
      );
      const d = await res.json();
      console.log(d[0].name);
      setCity(d[0].name);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {data?.coord ? (
        <>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            name=""
            id=""
          />
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].main}
          />
          <h1 className="temp">{data.main.temp}°</h1>
          <div
            className="controls"
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <button onClick={() => setUnit(Units.C)}>°C</button>
            <button onClick={() => setUnit(Units.F)}>°F</button>
          </div>
        </>
      ) : (
        <>
          <h1>Please select city</h1>
        </>
      )}
    </div>
  );
}
