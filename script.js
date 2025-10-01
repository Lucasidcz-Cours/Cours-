const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");
searchBtn.addEventListener("click", () => {
 resultDiv.innerHTML = "Please enter a city name and click Search.";
 document.body.style.backgroundColor = "#8dbbd9ab";
});
const API_KEY = "e9086e7e54c503084a711213248c7948";
searchBtn.addEventListener("click", async () => {
    const city = document.getElementById("cityInput").value;
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
    );
    const data = await response.json();

    if (data.main.temp < 10) {
    document.body.style.backgroundColor = "rgba(212, 212, 250, 1)";
    console.log("cold");
}
 else if (data.main.temp >= 10 && data.main.temp <= 20) {
    document.body.style.backgroundColor = "#2fb37cab";
} else {
    document.body.style.backgroundColor = "#f00";
    console.log("hot");
}

    if (data.cod === "404") {
        resultDiv.innerHTML = "Ville introuvable.";
        return;
    }

    resultDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p>Température : ${data.main.temp}°C</p>
        <p>Météo : ${data.weather[0].description}</p>
    `;

    localStorage.setItem("lastCity", city);
});
window.addEventListener("load", () => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        document.getElementById("cityInput").value = lastCity;
        searchBtn.click();
    }

});