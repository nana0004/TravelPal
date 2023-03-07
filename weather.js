const cityForm = document.querySelector("#weatherForm");

const getWeatherConditions = async(city) => {

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
        let div = document.createElement("div");
        div.setAttribute("id", "conditions");
        let city = document.createElement("h1");
        let cityNode = document.createTextNode(data.name);
        city.appendChild(cityNode);

        let temp = document.createElement("div");
        let tempNode = document.createTextNode("temperature | \t"+data.main.temp + " °C ");
        temp.appendChild(tempNode);

        let desc = document.createElement("div");
        let descNode = document.createTextNode("today's weather | \t   "+data.weather[0].description);
        desc.appendChild(descNode);

        let icon = document.createElement("div");
        let iconImg = document.createElement("img");
        iconImg.setAttribute("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
        icon.appendChild(iconImg);

        let rise = document.createElement("div");
        let riseNode = document.createTextNode("sunrise | \t   "+data.sys.sunrise);
        rise.appendChild(riseNode);

        let set = document.createElement("div");
        let setNode = document.createTextNode("sunset | \t   "+data.sys.sunset);
        set.appendChild(setNode);

        let speed = document.createElement("div");
        let speedNode = document.createTextNode("wind speed | \t   "+data.wind.speed);
        speed.appendChild(speedNode);

        div.appendChild(city);
        div.appendChild(temp);
        div.appendChild(desc);
        div.appendChild(icon);
        div.appendChild(rise);
        div.appendChild(set);
        div.appendChild(speed);
        div.style.display="flex";
        div.style.flexDirection="column";
        div.style.justifyContent="space-between";
        div.style.marginTop="20px";
        div.style.padding="1.5rem";
        div.style.border="none";
        div.style.width="83%"
        div.style.backgroundColor="rgb(226, 233, 238)";
        div.style.color="#555";
        div.style.boxShadow="0px 2px 5px rgba(0, 0, 0, 0.5)";
        document.querySelector("main").appendChild(div);
    }).catch(err => console.log(err))

}


document.addEventListener("DOMContentLoaded", (e) => {
    cityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if(document.querySelector("#city").value != ""){
            let conditionsDiv = document.querySelector("#conditions");
            if(conditionsDiv){
                document.querySelector("main").removeChild(conditionsDiv);
            }
            getWeatherConditions(document.getElementById("city").value);
        }else{
            console.log("You must provide a city");
        }
    })
})