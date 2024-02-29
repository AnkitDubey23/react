import React, { useState, useEffect } from "react";
import RestaurantCard from "./ResturantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
// import Dropdown from "./Dropdown";
import "../../index.css";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.603469716345977&lng=77.10485871881247&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json)

    setRestaurantList(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurantList(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  return restaurantList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-text"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          ></input>
          <button
            className="search-btn"
            onClick={() => {
              const filteredRestaurant = restaurantList.filter((res) =>
                res.info.name.toLowerCase().includes(inputText.toLowerCase())
              );
              setFilteredRestaurantList(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const resFilter = restaurantList.filter(
              (res) => res.info.avgRating > 4
            );
            setRestaurantList(resFilter);
          }}
        >
          Tap To Filter
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurantList.map((restaurant) => (
          <Link key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}><RestaurantCard resData={restaurant} /></Link>
        ))}
      </div>
      {/* <Dropdown/> */}
    </div>
  );
};

export default Body;
