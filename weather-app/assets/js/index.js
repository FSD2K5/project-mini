const searchInput = document.querySelector(".input__search input");
const searchButton = document.querySelector(".input__search button");
const city = document.querySelector(".name__city");
const temperature = document.querySelector(".info__temperature");
const state = document.querySelector(".state");
const sight = document.querySelector("#sight");
const wind = document.querySelector("#windy");
const humidity = document.querySelector("#humidity");
const time = document.querySelector(".time");

function handleChooseCity() {
    const cityName = searchInput.value;
    return cityName.trim();
}

function handleTime() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    time.textContent = `${day}/${month + 1}/${year}`;
}

async function callApi(city) {
    const URLAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=00e8e6dad2972a38fc92cc80c41c7779`;
    const data = await fetch(URLAPI).then((res) => res.json());
    console.log(data);
    return data;
}

function setUpInfo(data) {
    city.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = Math.floor(data.main.temp) + "°C";
    state.textContent = data.weather[0].main;
    sight.textContent = data.visibility / 1000 + "km";
    wind.textContent = data.wind.speed + " m/s";
    humidity.textContent = data.main.humidity;
    handleTime();
}

// Default
async function setDefault() {
    const infomation = await callApi("hanoi");
    setUpInfo(infomation);
}
setDefault();

searchButton.addEventListener("click", async (e) => {
    const infomation = await callApi(handleChooseCity());
    // set Value
    setUpInfo(infomation);
    handleTime();
    searchInput.value = "";
});

window.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        if (handleChooseCity() === "") {
            setDefault();
            searchInput.value = "";
        } else {
            const infomation = await callApi(handleChooseCity());
            // set Value
            setUpInfo(infomation);
            handleTime();
            searchInput.value = "";
        }
    }
});
