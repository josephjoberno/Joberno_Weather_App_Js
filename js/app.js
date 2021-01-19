let firstElement=document.querySelector('#firstElement ');
let segondElement=document.querySelector('#segondElement');
let thirdElement=document.querySelector('#thirdElement');
let fourthElement=document.querySelector('#fourthElement');
let icon=document.querySelector('#icon')
let input=document.querySelector('input[type="text"');
let submit=document.querySelector('form')
let description=document.querySelector('#description')
let not_found=document.querySelector("#not_found");

let main=document.querySelector('main');
let jsonImages='[{"filename":"image-1.jpg"},{"filename":"image-2.jpg"},{"filename":"image-3.jpg"},{"filename":"image-4.jpg"},{"filename":"image-5.jpg"},{"filename":"image-6.jpg"},{"filename":"image-7.jpg"},{"filename":"image-8.jpg"},{"filename":"image-9.jpg"},{"filename":"milot.jpg"}]'
let images=JSON.parse(jsonImages)




setInterval(()=>
{
    let jsRandomImage=images[Math.floor(Math.random()*images.length)].filename;
    main.style.backgroundImage=`url(images/${jsRandomImage})`
},10000)

submit.addEventListener('submit',(e)=>
{
    e.preventDefault();
    city=input.value;
    weatherApp(city)
},false)


if(!(submit.onclick)) 
{
fetch(`https://ipapi.co/json/`)//detection de l'adresse Ip user automatique
.then(response=>response.json())
.then(adressIp=>{
 weatherApp(adressIp.city)
 console.log(adressIp);
})
}

function weatherApp(data)
{
let city=data
let apiKey='36d0b60a9fac8737c869e11a389d1129'
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=fr&units=metric`)
.then(response=>response.json())
.then(data=>
    {
        const {weather,main,name}=data
        
        let url=`https://openweathermap.org/img/w/${weather[0].icon}.png`
        icon.src=url
        segondElement.textContent=`${main.temp} °C`
        description.textContent=weather[0].description
        thirdElement.textContent=`${Math.round(main.humidity)}%`
        firstElement.textContent=name
                                    
        not_found.style.display='none';
    
    }).catch(()=>
        {
            not_found.style.display='block';
        })
}



