import getDataFunction from "./getData.js";
import patchDataFunction from "./patchData.js";
export default async function timer(){
  const Timer = document.querySelector(".timer")
  let Minutes = (await getDataFunction('http://localhost:3000/CurrentTime'))[0].Minutes
  let Seconds = (await getDataFunction('http://localhost:3000/CurrentTime'))[0].Seconds
  let products = (await getDataFunction('http://localhost:3000/PRODUCTS'))
  let allTime = (Minutes*60)+Seconds
  Timer.innerText = ((allTime - allTime % 60) / 60) + ":" + ((allTime % 60).toString().length < 2 ? "0"+(allTime % 60) : (allTime % 60)) 
  if(allTime!=0){
    --allTime
    Timer.innerText=((allTime - allTime % 60) / 60) + ":" + ((allTime % 60).toString().length < 2 ? "0"+(allTime % 60) : (allTime % 60)) 
    setTimeout(() => {
      --allTime
      Timer.innerText=((allTime - allTime % 60) / 60) + ":" + ((allTime % 60).toString().length < 2 ? "0"+(allTime % 60) : (allTime % 60)) 
    }, 1000)
  }
  if(allTime<=0){  
    clearInterval(timeinterval);
    Timer.style.display = "none"
  }  
  var timeinterval = setInterval(async function(){ 
    if(allTime!=0){
      --allTime
      Timer.innerText=((allTime - allTime % 60) / 60) + ":" + ((allTime % 60).toString().length < 2 ? "0"+(allTime % 60) : (allTime % 60)) 
      setTimeout(() => {
        --allTime
        Timer.innerText=((allTime - allTime % 60) / 60) + ":" + ((allTime % 60).toString().length < 2 ? "0"+(allTime % 60) : (allTime % 60)) 
      }, 1000)
  }
  await patchDataFunction('http://localhost:3000/CurrentTime', 1, `"Minutes":${((allTime - allTime % 60) / 60)},"Seconds":${allTime % 60}`)
    if(allTime<=0){  
     clearInterval(timeinterval);
     Timer.style.display = "none"
     products.forEach(async element => await patchDataFunction('http://localhost:3000/PRODUCTS', element.id, `"discount":${false}`));
     if(document.querySelector(".productDiscountCost") != undefined){
      document.querySelectorAll(".productDiscountCost").forEach(element => element.style.display = "none")
      document.querySelectorAll(".productCost").forEach(element => element.style.textDecoration = "none")
     }
    }  
   },2000);  

}