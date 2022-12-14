/* Global Variables */
const apiKey = `,us&appid=7f9207f1198fed31175fc1429ceaa9d3&units=imperial`;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=`;

const generate = document.querySelector("#generate");
const date = document.querySelector("#date");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

generate.addEventListener("click", () => {
  const zipCode = document.querySelector("#zip").value;
  // update UI
  const feelings = document.querySelector("#feelings");
  getWeather(baseUrl, zipCode, apiKey);
});
// Function to GET Web API Data
const getWeather = async (baseUrl, zipCode, apiKey) => {
  const res = await fetch(baseUrl + zipCode + apiKey);
  try {
    const weatherInfo = await res.json();
    postData("/weather", weatherInfo);
    updateUi();
  } catch (error) {
    console.log("error", error);
  }
};
// make a post req to the route
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// update UI
const updateUi = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    date.textContent = `Date: ${newDate}`;
    temp.textContent = `temp: ${Math.round(allData.main.temp)} ℃`;
    content.textContent = `feeling: ${feelings.value}`;
  } catch (error) {
    console.log("error", error);
  }
};
