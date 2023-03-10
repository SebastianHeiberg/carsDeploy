
import { API_URL,FETCH_NO_API_ERROR } from "../../settings.js"
import { handleHttpErrors, makeOptions, encode } from "../../utils.js"

//Add id to this URL to get a single user
const URL = `${API_URL}/cars`

export async function initAddCar(match) {
 document.querySelector("#btn-submit-car").onclick = addCar 
}

async function addCar(evt){
    evt.preventDefault()
    const brand = document.querySelector("#brand").value  
    const model = document.querySelector("#model").value
    const pricePrDay = document.querySelector("#price-pr-day").value
    const bestDiscount = document.querySelector("#best-discount").value
    const car = {brand: encode(brand), model: encode(model), pricePrDay: encode(pricePrDay), bestDiscount: encode(bestDiscount)}
    const options = makeOptions('POST',car)
   
    try{
    await fetch(URL,options).then(handleHttpErrors)
    } catch (err){
        document.querySelector("#status").innerText = err.message
    }
    
    document.querySelector("#form").reset()
    document.querySelector("#status").innerText = "New car added"
}
