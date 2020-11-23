var longitude;
var latitude;
const tomorrow = moment().add(1,'days').format("MMMM Do YYYY");
const twoDays = moment().add(2,'days').format("MMMM Do YYYY");
const threeDays = moment().add(3,'days').format("MMMM Do YYYY");
const fourDays = moment().add(4,'days').format("MMMM Do YYYY");
const fiveDays = moment().add(5,'days').format("MMMM Do YYYY");


$("#buttonSearch").click(function (){
    
    var saveCity = document.getElementById("citySearch").value;
      
    localStorage.setItem('setCity', saveCity); 

    location.reload();
    
  
  });



function fetch(){
  
    var getCity = localStorage.getItem('setCity');
    

    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q="+getCity+"&appid=bfd5d34b3f82ed288e438c8d3bb85013&units=imperial",
        type: "GET",
        success:function(data){
            document.getElementById("city").innerHTML = (data.name);
            document.getElementById("temp").innerHTML = "Temperature: " + (data.main.temp) + " °F";
            document.getElementById("humidity").innerHTML = "Humidity: " + (data.main.humidity) + "%";
            document.getElementById("windSpeed").innerHTML = "Wind Speed: " + (data.wind.speed) + " MPH";
            longitude = (data.coord.lon).toString();
            latitude = (data.coord.lat).toString();

            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/uvi?appid=bfd5d34b3f82ed288e438c8d3bb85013&lat="+latitude+"&lon="+longitude,
                type: "GET",
                success:function(data){
                    document.getElementById("uv").innerHTML = "UV: " + (data.value);
                    if(data.value <= 2){
                        $("#uv").addClass("good");
                    }

                    else if(data.value >= 2 && data.value <= 5){
                        $("#uv").addClass("moderate");
                           
                    }

                    else if(data.value >= 5 && data.value <= 7){
                        $("#uv").addClass("high");
                           
                    }

                    else if(data.value >= 7 && data.value <= 13){
                        $("#uv").addClass("bad");
                           
                    }
                }  
                            
            });

            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/forecast?q="+getCity+"&appid=bfd5d34b3f82ed288e438c8d3bb85013&units=imperial",
                type: "GET",
                success:function(data){
                    document.getElementById("date1").innerHTML = "" + tomorrow;
                    document.getElementById("date2").innerHTML = "" + twoDays;
                    document.getElementById("date3").innerHTML = "" + threeDays;
                    document.getElementById("date4").innerHTML = "" + fourDays;
                    document.getElementById("date5").innerHTML = "" + fiveDays;
                    document.getElementById("temp1").innerHTML = "Temp: " + (data.list[0].main.temp);
                    document.getElementById("temp2").innerHTML = "Temp: " + (data.list[8].main.temp);
                    document.getElementById("temp3").innerHTML = "Temp: " + (data.list[16].main.temp);
                    document.getElementById("temp4").innerHTML = "Temp: " + (data.list[24].main.temp);
                    document.getElementById("temp5").innerHTML = "Temp: " + (data.list[32].main.temp);
                    document.getElementById("description1").innerHTML = "Skies: " + (data.list[0].weather[0].description);
                    document.getElementById("description2").innerHTML = "Skies: " + (data.list[8].weather[0].description);
                    document.getElementById("description3").innerHTML = "Skies: " + (data.list[16].weather[0].description);
                    document.getElementById("description4").innerHTML = "Skies: " + (data.list[24].weather[0].description);
                    document.getElementById("description5").innerHTML = "Skies: " + (data.list[32].weather[0].description);
                    document.getElementById("humidity1").innerHTML = "Humidity: " + (data.list[0].main.humidity);
                    document.getElementById("humidity2").innerHTML = "Humidity: " + (data.list[8].main.humidity);
                    document.getElementById("humidity3").innerHTML = "Humidity: " + (data.list[16].main.humidity);
                    document.getElementById("humidity4").innerHTML = "Humidity: " + (data.list[24].main.humidity);
                    document.getElementById("humidity5").innerHTML = "Humidity: " + (data.list[32].main.humidity);
                    console.log(data);

                           
                    }
                            
            });


            
        },
        error: function () {
            alert("City not found. Please try again!");
        }

        
    });
}

fetch();

$(document).ready(function(){ 
    document.getElementById("city1").innerHTML = localStorage.getItem('setSearch1');
    
    });







