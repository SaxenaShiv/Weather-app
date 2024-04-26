import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "f571223296d6f424e308e2d550096de4";

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeatherData = (locationData) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.latitude}&lon=${locationData.longitude}&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.log(error));
  };

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords);
        },
        (error) => console.log(error)
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const fetchData = () => {
    if (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => setWeatherData(data))
        
        .catch((error) => console.log(error));
    }
    
  };

  useEffect(() => {
    console.log(weatherData);
    fetchUserLocation();
  }, []);

  return (
    <section className="vh-100" style={{ backgroundColor: "#4B515D" }}>
      <MDBContainer className="h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="8" lg="6" xl="4">
            <MDBCard style={{ color: "#4B515D", borderRadius: "35px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex">
                  <MDBTypography tag="h6" className="flex-grow-1">
                    {weatherData && weatherData.name}
                  </MDBTypography>
                  <MDBTypography tag="h6">
                    {weatherData &&
                      new Date(weatherData.dt * 1000).toLocaleString([], {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                  </MDBTypography>
                </div>

                <div className="d-flex flex-column text-center mt-5 mb-4">
                  <MDBTypography
                    tag="h6"
                    className="display-4 mb-0 font-weight-bold"
                    style={{ color: "#1C2331" }}
                  >
                    {Math.round(weatherData && weatherData.main.temp - 273.15)}
                    °C
                  </MDBTypography>
                  <span className="small" style={{ color: "#868B94" }}>
                    {weatherData && weatherData.weather[0].main}
                  </span>
                </div>

                <div className="d-flex align-items-center">
                  <div className="flex-grow-1" style={{ fontSize: "1rem" }}>
                    <div>
                      <MDBIcon
                        fas
                        icon="wind fa-fw"
                        style={{ color: "#868B94" }}
                      />{" "}
                      <span className="ms-1">
                        {weatherData && weatherData.wind.speed} m/s
                      </span>
                    </div>
                    <div>
                      <MDBIcon
                        fas
                        icon="tint fa-fw"
                        style={{ color: "#868B94" }}
                      />{" "}
                      <span className="ms-1">
                        {weatherData && weatherData.main.humidity}%
                      </span>
                    </div>
                    <div>
                      <MDBIcon
                        fas
                        icon="sun fa-fw"
                        style={{ color: "#868B94" }}
                      />{" "}
                      <span className="ms-1">
                        {weatherData &&
                          weatherData.sys &&
                          new Date(
                            weatherData.sys.sunrise * 1000
                          ).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                      </span>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp"
                      alt="weather"
                      width="100px"
                    />
                  </div>
                </div>
                <div className="input-group mt-3">
                  <input
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    placeholder="Enter city name"
                    className="form-control"
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={fetchData}
                  >
                    <MDBIcon icon="search" />
                  </button>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Weather;
