import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useState, useCallback } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {
  const apiKey = '0e220bf2e069127f559bf6f5504f89a1';
  const [isError, setIsError] = useState(false);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [pending, setPending] = useState(false);
  const handleCityChange = useCallback(({ city }) => {
    setCity(city);
    console.log(city);
    setPending(true);
    setIsError(false);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(res => {
        if(res.status === 200) {
          return res.json()
          .then(data => {
            setPending(false);
            console.log(data);
            const weatherData = {
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main
            };
            setWeatherData(weatherData);
            console.log(weatherData);
          });
        } else {
          setIsError(true);
        }
      });
  }, []);
  return (
    <section>
      <PickCity action={handleCityChange} />
      {pending == false && weatherData && <WeatherSummary data={weatherData} />}
      {isError == false && pending == true && <Loader />}
      {isError == true && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;