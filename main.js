const time =  document.querySelector('.time');
const dayMoment = document.querySelector('.dayMoment');
const greeting = document.querySelector('.greeting'),
name = document.querySelector('.name'),
focus = document.querySelector('.focus');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');
const btn1 = document.querySelector('.btn1');
let pseudohour, flag=false;

const showAmPm = true;

function showTime() {
    let today= new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds();
      day = today.getDay(),
      month = today.getMonth(),
      date = today.getDate();
  switch (day) {
    case 1: day='Monday, '; break;
    case 2: day='Tuesday, '; break;
    case 3: day='Wednesday, '; break;
    case 4: day='Thursday, '; break;
    case 5: day='Friday, '; break;
    case 6: day='Saturday, '; break;
    case 0: day='Sunday, '; break;
  }
  switch (month) {
    case 0: month=' January'; break;
    case 1: month=' February'; break;
    case 2: month=' March'; break;
    case 3: month=' April'; break;
    case 4: month=' May'; break;
    case 5: month=' June'; break;
    case 6: month=' July'; break;
    case 7: month=' August'; break;
    case 8: month=' September'; break;
    case 9: month=' October'; break;
    case 10: month=' November'; break;
    case 11: month=' December'; break;
  }
    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    dayMoment.innerHTML = `${day}${date}${month}`;

    if (min==0 && sec==0) {
      flag=false;
    }
    if (hour !== pseudohour && flag===false) {
      setBgGreet();
    }

    setTimeout(showTime, 1000);
}

// add zero

function addZero(n){
    return (parseInt(n, 10) < 10 ? '0' : '') +n;
}


let url_bg=[];
let ind = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

for (let i=0; i<ind.length; i++) {
  let j=Math.floor(Math.random() * (i + 1)); 
  [ind[i], ind[j]] = [ind[j], ind[i]];
}
let timeOfDay=1, srtingOfDay;
while (url_bg.length<24) {
  switch (timeOfDay) {
   case 1: srtingOfDay='night'; break; 
   case 2: srtingOfDay='morning'; break;
   case 3: srtingOfDay='day'; break;
   case 4: srtingOfDay='evening'; break;
  }
  for (let i=0; i<6; i++){
    url_bg.push('assets/images/' + srtingOfDay + '/' + addZero(ind[i]) + '.jpg')
  }
  timeOfDay++;
}

let in_pic=document.querySelector('.in_pic'),
    out_pic=document.querySelector('.out_pic');


    function changeBG(){
      btn1.disabled=true;
      flag=true;
      pseudohour++;
      if (pseudohour==24) {
        pseudohour=0;
      }  
      const source = url_bg[pseudohour];
      const image = document.createElement('img');
      image.src = source;
      image.onload = () => {
        out_pic.style.backgroundImage = `url${source}`;
        deleteIn_Pic();
        setTimeout(add = () => {
          btn1.disabled=false;
          in_pic.style.backgroundImage = 'url(' + url_bg[pseudohour] + ')';
        }, 2000);
        appearOut_Pic();
      }
    }
    
    function deleteIn_Pic() {
      in_pic.animate([{opacity: 1}, {opacity: 0}], {duration: 2000})
    }
    function appearOut_Pic() {
      in_pic.animate([{opacity: 0}, {opacity: 1}], {duration: 2000})
    }
    function appearIn_Pic() {
      in_pic.animate([{opacity: 0}, {opacity: 1}], {duration: 2000})
    }
    

//background and greeting

function setBgGreet(){
    let today = new Date(),
    hour = today.getHours();
    pseudohour=hour;

    if (hour < 12 && hour> 6.00){
        preload(hour);
        // document.body.style.background = "url('pic/morning.jpg')";
        greeting.textContent = "Good Morning";
    }
    else if (hour<18){
        preload(hour);
        // document.body.style.background = "url('pic/afternoon.jpg')";
        greeting.textContent = "Good Afternoon";
    }
    else if (hour<24.00){
        preload(hour);
        // document.body.style.background = "url('pic/evening.jpg')";
        greeting.textContent = "Good Evening";
        document.body.style.color = 'white';
    }
    else{
        preload(hour);
        // document.body.style.background = "url('pic/evening.jpg')";
        greeting.textContent = "Good Night";
        document.body.style.color = 'white';
    }
}

function preload (hour) {
  const source = url_bg[hour],
        img = document.createElement('img');
  img.src = source;
  img.onload = () => {
    in_pic.style.backgroundImage = 'url(' + url_bg[hour] + ')';
    appearIn_Pic();
  }
}

//get name

function getName(){
    if (localStorage.getItem('name') === null){
        name.textContent = '[Enter Your Name]';
    } else{
        name.textContent = localStorage.getItem('name');
    }

}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
      // Make sure enter is pressed
      if (e.which == 13 || e.keyCode == 13) {
        localStorage.setItem('name', e.target.innerText);
        name.blur();
      }
    } else {
      localStorage.setItem('name', e.target.innerText);
    }
  }


  function getFocus(){
    if (localStorage.getItem('focus') === null){
        focus.textContent = '[Enter Your Focus]';
    } else{
        focus.textContent = localStorage.getItem('focus');
    }

}

// Set Focus
function setFocus(e) {
    if (e.type === 'keypress') {
      // Make sure enter is pressed
      if (e.which == 13 || e.keyCode == 13) {
        localStorage.setItem('focus', e.target.innerText);
        focus.blur();
      }
    } else {
      localStorage.setItem('focus', e.target.innerText);
    }
  }


  async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
    console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    weatherIcon.className = 'weather-icon owf';
  }

  function setCity(event) {
    if (event.code === 'Enter') {
      getWeather();
      city.blur();
    }
  }

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
btn1.addEventListener('click', changeBG);

showTime();
setBgGreet();
getName();
getFocus();
getWeather()




async function getQuote() {  
  // btn.disabled=true
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);


