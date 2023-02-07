// console.log("Hello there!! JavaScript is running successfully!!");
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationShow = document.querySelector(".location");
const forecastShow = document.querySelector('.forecast')
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  fetch("http://localhost:3000/weather?address=" + location)
  .then(res=>res.json())
  .then(data=>{
     if(data.error){
          forecastShow.innerHTML=data.error;
     }
     else{
          forecastShow.innerHTML=data.forecast;
          locationShow.innerHTML=data.location;
     }
     
  })
});
