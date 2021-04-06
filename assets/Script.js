var apiKey = "298a6bc4c725cb1dc874f64cb9a101d5";
var City = "#citySearched";
var CurrentWeather = "#currentWeather";
var TempEl = "#temperature";
var HumidityEl = "#humidity";
var WindEl = "windSpeed";
var UvIndexEl = "UV-index";
var lat = "";
var lon = "";

function saveLocally(citySelected) {
    var importData = JSON.parse(localStorage.getItem("searchCity")) || [];
    importData.push(citySelected);
    localStorage.setItem("searchCity", JSON.stringify(importData));
  }

  function SaveBtns() {
    let importData = JSON.parse(localStorage.getItem("searchCity")) || [];
    if (importData === null);

    document.querySelector("#searchHistoryContainer").innerHTML = "";
    importData.forEach(function (citySearches) {
      let searchHistoryBtn = document.createElement("button");
      searchHistoryBtn.classList.add("saved-city-button");
      searchHistoryBtn.innerHTML = citySearches;
      // console.log(searchHistoryBtn)
      document
        .querySelector("#searchHistoryContainer")
        .prepend(searchHistoryBtn);
    });
  }
  SaveBtns();

  document
    .querySelector("#search-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      let CitySelected = document.querySelector("#search-bar").value;

      if (document.getElementById("search-bar").value === "") {
        alert("Please enter a city name!");
      } else if (CitySelected === false) {
        alert("Please choose a different city!");
        // return;
      } else {
        getWeather(CitySelected);
        saveLocally(CitySelected);
        SaveBtns();
      }
    });


    function getWeather(city) {
      console.log(city);
      console.log(uviBadge);
      let queryURLForToday = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  
      fetch(queryURLForToday)
      .catch(
        console.log("api doesnt work!ERROR!")
      )
        // .then(function (weatherResponse) {
        //   return weatherResponse.json();
        // })
        // .then(function (data) {
        //   console.log(data);
        //   showWeatherForToday(city, data);
          data.json().then(function (jsonData) {
            showWeatherForToday(city, jsonData);
            console.log(data)
          })
          // Call 5 day URL with lat lon from the one day response
          let queryURLForFiveDay = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKey}`;
          fetch(queryURLForFiveDay)
            .then(function (weatherResponse) {
              return weatherResponse.json();
            })
            .then(function (fiveDayData) {
              console.log(fiveDayData);
              showFiveDayWeather(fiveDayData);
            });
        };
    


    function showWeatherForToday(cityName, data) {
      // document.querySelector("#currentDate").innerHTML = moment().format(
      //   "MMMM Do, YYYY"
      // );
      document.querySelector("#currentWeather").innerHTML =
      console.log(data)
        data.weather[0].description;
      document.querySelector(
        "#currentIcon"
      ).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`;
      document.querySelector("#citySearched").innerHTML = cityName;
      document.querySelector("#temperature").innerHTML =
        Math.round(data.main.temp) + "°F";
      document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
      document.querySelector("#wind").innerHTML =
        Math.round(data.wind.speed) + "mph";
  
      $("#card-text").empty();
    }
  
    function uviBadge(data) {
      let UVIndex = $("#UV-index");
      UVIndex.innerHTML = Math.round(data.current.uvi);
  
      if (data.current.uvi <= 2) {
          UVIndex.addClass("badge badge-success");
      } else if (data.current.uvi > 2 && data.current.uvi <= 5) {
          UVIndex.addClass("badge badge-warning");
      } else if (data.current.uvi > 5) {
          UVIndex.addClass("badge badge-danger");
      }
    }




    // Click event for each saved city button - dynamic
//
  // var savedCityButtons = document.querySelectorAll(".button");
  // savedCityButtons.forEach(function (eachButton) {
  //   eachButton.addEventListener("click", function (e) {
  //     console.log("button was pressed!")
  //     var searchBar= "#search-bar"
  //     var city = searchBar.innerHTML;
  //     getWeather(city);
  //   });
  // });


  


