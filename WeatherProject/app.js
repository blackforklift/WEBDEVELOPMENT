const express = require("express");
const https = require('node:https');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function name(req, res) {

    res.sendFile(__dirname + "/index.html");
});

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

app.post("/", function (req, res) {

    const query = req.body.cityName
    const apiKey = "b08a5bd66e1f0859010de7a623604788"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {

        console.log(response.statusCode);

        response.on("data", function (data) {

            const weatherData = JSON.parse(data);
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";


            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            console.log(temp, weatherDescription);

            res.write("<h1>The temperature in " + capitalize(query) + " is " + temp + " degrees Celcius.</h1>");
            res.write("<img src=" + imageURL + ">");

            res.write(" <h3> The weather is currently " + weatherDescription + " </h3>");


            res.send();

        })
    })

});


app.listen(3000, function name() {

    console.log("server is running on port 3000");

});