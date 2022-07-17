import React, { useState, useEffect, useRef } from "react";
import WeatherDetail from "./WeatherDetail";
import WeatherSearch from "./WeatherSearch";

const Weather = () => {
  const [dataLocation, setDataLocation] = useState(null);
  const [dataLatLong, setDataLatLong] = useState(null);
  const [isSearchByLocation, setIsSearchByLocation] = useState(false);
  const [rawLocation, setRawLocation] = useState();
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [location, setLocation] = useState();
  const [searchHistory, setSearchHistory] = useState([]);
  const inputValue = useRef(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    handleGetWeatherByLatLong(lat, long);
    handleGetWeatherByLocation(location);
  }, [lat, long, location]);

  const handleGetWeatherByLocation = async (location) => {
    try {
      const res = await fetch(
        `https://openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02`
      );
      const data = await res.json();
      setDataLocation(data);
    } catch (error) {
      console.log("Cannot get data!");
    }
  };

  const handleGetWeatherByLatLong = async (lat, long) => {
    try {
      const res = await fetch(
        `https://openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02`
      );
      const data = await res.json();
      setDataLatLong(data);
    } catch (error) {
      console.log("Cannot get lat long data!");
    }
  };

  const handleChange = (e) => {
    setRawLocation(e.target.value);
  };

  const handleSearchByLocation = (isHistory) => {
    setLocation(rawLocation);
    inputValue.current.value='';
    setIsSearchByLocation(true);
    if(isHistory === true) {
      setSearchHistory((prev) => [...prev, rawLocation]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchByLocation(true);
      setIsSearchByLocation(true);
    }
  };

  const handleChooseLocation = (e) => {
    setIsSearchByLocation(true);
    setLocation(e.currentTarget.textContent);
  }

  const handleChooseLatLong = (e) => {
    setIsSearchByLocation(false);
  }

  const deleteItemInHistory = (index) => {
    let arr = [...searchHistory]
    arr.splice(index, 1);
    setSearchHistory(arr);
  }

  return (
    <div className=" w-2/3 border-2 border-gray-700 rounded-xl p-8 m-5">
      <h1 className="font-bold text-xl text-left mb-3">WEATHER</h1>
      {dataLocation ||
      dataLatLong ? (
        <div>
          <WeatherDetail
            data={isSearchByLocation ? dataLocation : dataLatLong}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <WeatherSearch
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
        searchHistory={searchHistory}
        inputValue={inputValue}
        handleSearchByLocation={handleSearchByLocation}
        handleChooseLocation={handleChooseLocation}
        handleChooseLatLong={handleChooseLatLong}
        deleteItemInHistory={deleteItemInHistory}
      />
    </div>
  );
};

export default Weather;
