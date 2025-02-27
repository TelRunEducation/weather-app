import {useSelector} from "react-redux";
import {messageSelector, weatherSelector} from "../redux/weather/weatherSlice.js";

const Weather = () => {
  const weather = useSelector(weatherSelector);
  const message = useSelector(messageSelector);
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