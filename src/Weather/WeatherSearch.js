import React from "react";

const WeatherSearch = ({
  handleChange,
  handleKeyPress,
  searchHistory,
  handleSearchByLocation,
  rawLocation,
  handleChooseLocation,
  handleChooseLatLong,
  deleteItemInHistory,
  inputValue,
}) => {
  return (
    <div>
      <div className="mb-5">
        <p className="text-left font-semibold mb-3">Search</p>
        <div className="flex">
          <input
            className="border p-2 rounded-sm w-full"
            value={rawLocation}
            ref={inputValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="City name..."
          />
          <button
            className="w-32 py-2 rounded-lg bg-red-700 hover:bg-red-500 text-white text-lg ml-3"
            onClick={() => handleSearchByLocation(true)}
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex w-100 flex-wrap">
        <div
          className="border-red-700 bg-red-700 border-2 min-w-[120px] text-lg py-1 px-3 mr-3 mb-3 rounded-md cursor-pointer text-white font-semibold hover:border-red-500 hover:bg-red-500"
          onClick={handleChooseLatLong}
        >
          Current Location
        </div>
        {searchHistory.map((item, index) => {
          return (
            <div className="flex items-center mr-3 mb-3">
              <div
                className="border-red-700 border-2 min-w-[120px] text-lg py-1 px-3 rounded-md mr-2 cursor-pointer text-red-700 font-semibold hover:border-red-500 hover:text-red-500"
                onClick={handleChooseLocation}
              >
                <p>{item}</p>
              </div>
              <span
                className="material-icons text-sm text-gray-600 hover:text-gray-400 cursor-pointer"
                onClick={() => deleteItemInHistory(index)}
              >
                cancel
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherSearch;
