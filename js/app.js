let input=document.getElementById('input');
let News=document.getElementById('NewsDisplay')
input.addEventListener('keyup',function(){
    getData(this.value);
})
async function getData(a){
    let data=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3`);
    if (data.ok && 400 != data.status) {
        let x=await data.json();
        displayCurrent(x.location, x.current)
        displayAnather(x.forecast.forecastday)
    }
    
}
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function displayCurrent(a,t){
    var e = new Date(t.last_updated.replace(" ", "T"));
    let design=`
    <div class="card-items-head w-100 " style="background-color: rgba(0, 0, 0, 0.3)">
                        <div class="d-flex justify-content-between align-items-center" style="height:40px; padding-top:10px">
                            <p id="first-day">${days[e.getDay()]}</p>
                            <p id="date">${e.getDate()+" "+monthNames[e.getMonth()]}</p>
                        </div>
                    </div>
                    <div >
                        <p style="padding-left:10px" id="city">${a.name}</p>
                        <div class="d-flex justify-content-between w-75 my-4">
                            <div class="degree mx-3" style="font-size:50px; font-weight:600;">
                                <span id="first-temp">${t.temp_c}</span><sup>o</sup>C
                            </div>
                            <img id="condition-icon" src="${t.condition.icon}" style="width:70px;height:70px;margin-top:15px">
                        </div>
                        <span class="mx-3 text-info my-2 " id="first-text">${t.condition.text}</span>
                        <div class="mx-3 my-4">
                            <span class="mx-2 ">
                                <img src="../img/img/icon-umberella.png">
                                <span class="text-muted">20%</span>
                            </span>
                            <span class="mx-2 ">
                                <img src="../img/img/icon-wind (1).png">
                                <span class="text-muted">18km/h</span>
                            </span>
                            <span class="mx-2 ">
                                <img src="../img/img/icon-compass.png">
                                <span class="text-muted">East</span>
                            </span>
                        </div>
                        
                    </div>
    
    `
document.getElementById('first-child').innerHTML=design
}
function displayAnather(a){
    let desgn2='';
    for(var i=1;i<a.length;i++){
        desgn2+=`
        <div class="card-items bg-specail text-white" style="width:50%" >
                            <div class="card-items-head " style="background-color: rgba(0, 0, 0, 0.3)">
                                <div class="text-center" style="height:40px; padding:0px 10px; padding-top:10px">
                                    <p id="second-day">${days[new Date(a[i].date.replace(" ", "T")).getDay()]}</p>
                                </div>
                            </div>
                            <div class="text-center py-5">
                                <img id="second-image" src="${a[i].day.condition.icon}" style="width:50px; heigth:50px;">
                                <div class="degree mx-3 my-2" style="font-size:25px; font-weight:600;">
                                    <span >${a[i].day.maxtemp_c}</span><sup>o</sup>C
                                </div>
                                <span>
                                    <span >${a[i].day.mintemp_c}</span><sup>o</sup>
                                </span>
                                <p class="text-info my-3">${a[i].day.condition.text}</p>
                            </div>
                        </div>
        `
    }
    document.getElementById('second-child').innerHTML=desgn2
     
}
getData('cairo')

var nav_link=document.querySelectorAll('.nav-item')
nav_link.forEach(x=>{
    x.addEventListener('click',()=>{
        restStyle();
        x.classList.add('active-link');
    })
})

function restStyle(){
    nav_link.forEach(x=>{
        x.classList.remove('active-link')
    })
}


async function getDataNews(){
    // let data=await fetch('https://newsapi.org/v2/everything?q=tesla&from=2023-07-31&sortBy=publishedAt&apiKey=5501da28c7bd42de90a863f9565c65f9');
    // data=data.json()
    // console.log(data);
  await  fetch('https://newsapi.org/v2/everything?q=apple&from=2023-11-28&to=2023-11-28&sortBy=popularity&apiKey=5501da28c7bd42de90a863f9565c65f9')
.then(res => res.json())
.then(out =>{
    displayNews(out.articles.slice(0,12));
  console.log('Checkout this JSON! ', out.articles.slice(0,20))})
  console.log("sdjnksjsjkfbdsfsdbfsfb")
.catch(err => { throw err });
    
}
function displayNews(arr){
    let container="";
    for(let i=0;i<arr.length;i++){
        container+=`
        <div class="col-md-3">
                        <div class="Card" >
                            <img alt="news-image" style="height:200px" src=${arr[i].urlToImage} class="card-img-top" alt="...">
                            <div class="card-body">
                                <h6 class="text-muted">${arr[i].publishedAt}</h6>
                                <h6>Author. ${arr[i].author}</h6>
                                <h5 class="card-title">Title. ${arr[i].title.slice(0,25)}</h5>
                                <p class="card-text">${arr[i].description.slice(0,85)}</p>
                                <a href=${arr[i].url} class="btn btn-primary">View Source</a>
                            </div>
                        </div>
                    </div>
        `
    }
    News.innerHTML=container;
}
getDataNews();