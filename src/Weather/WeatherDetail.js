import React from "react";

const WeatherDetail = ({data}) => {
  const convertToFarenheit = (data) => {
    return Math.round((data * 1.8 + 32)*100)/100
  }
    return (
        <div className="flex justify-between mb-3">
          <div className="flex flex-col items-start">
            <h1 className="text-3xl font-bold font-city mb-2 text-red-700">{data?.name}</h1>
            <p>{data?.weather[0].description.toUpperCase()}</p>
          </div>
          <div>
            <p className="text-2xl font-bold mb-2">{data?.main.temp} &#8451;</p>
            <p className="text-xl font-semibold">{convertToFarenheit(data?.main.temp)} &#8457;</p>
          </div>
        </div>)
}

export default WeatherDetail;