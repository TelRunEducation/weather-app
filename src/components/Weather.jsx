import {api_key, base_url} from "../utils/constants.js";
import {useEffect, useState} from "react";

const Weather = ({params}) => {
    const [weather, setWeather] = useState({});
    const [message, setMessage] = useState("Enter city name");

    const getWeather = () => {
        console.log("getWeather: " + params.city)
        fetch(`${base_url}?q=${params.city}&appid=${api_key}&units=metric`)
            .then(response => response.json())
            .then(data => setWeather({
                        city: data.name,
                        country: data.sys.country,
                        temp: data.main.temp,
                        pressure: data.main.pressure,
                        sunset: data.sys.sunset * 100,
                    },
                    setMessage(""))
            )
            .catch(() => setMessage('Enter correct city name'));
    }
    useEffect(() => {
            if (params.city) {
                getWeather()
            }
        },
        [params])
    return (
        <div className={'infoWeath'}>
            {!message &&
                <>
                    <p>Location: {weather.country}, {weather.city}</p>
                    <p>Temp: {weather.temp} </p>
                    <p>Presure: {weather.pressure} </p>
                    <p>Sunset: {new Date(weather.sunset).toLocaleTimeString()} </p>
                </>}
            {message}
        </div>)
};

export default Weather;