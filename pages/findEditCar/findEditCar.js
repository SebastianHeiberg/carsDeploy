import { API_URL} from "../../settings.js"
import { encode, handleHttpErrors, makeOptions } from "../../utils.js"


//Add id to this URL to get a single user
const URL = `${API_URL}/cars/`

export function initFindEditCar(){
  document.querySelector("#btn-fetch-car").onclick = getCar
  document.querySelector("#btn-delete-car").onclick = deleteCar
  document.querySelector("#btn-submit-edited-car").onclick = editCar
}

async function getCar () {
    const id = document.querySelector("#car-id-input").value
    const options = makeOptions("GET",null,true)
    const safeId = encode(id)
    const car = await fetch(URL+safeId,options).then(handleHttpErrors).then( car => {

        document.querySelector("#car-id").value = encode(car.id)  
        document.querySelector("#brand").value = encode(car.brand)  
        document.querySelector("#model").value = encode(car.model)
        document.querySelector("#price-pr-day").value = encode(car.pricePrDay)
        document.querySelector("#best-discount").value = encode(car.bestDiscount)
    })
}
    

    async function deleteCar(){
        const id = encode(document.querySelector("#car-id").value)
        const options = makeOptions("DELETE",null,true)
        try{
        await fetch(URL+id,options).then(handleHttpErrors)
    } catch (err) {
        document.querySelector("#car-response").innerText = err.message
    }

    document.querySelector("#car-response").innerText = "Car deleted"
    }
    

    async function editCar () {

        const id = document.querySelector("#car-id").value
        const brand = document.querySelector("#brand").value  
        const model = document.querySelector("#model").value
        const pricePrDay = document.querySelector("#price-pr-day").value
        const bestDiscount = document.querySelector("#best-discount").value

        const car = {brand: encode(brand), model: encode(model), pricePrDay: encode(pricePrDay), bestDiscount: encode(bestDiscount)}
        const options = makeOptions('PUT',car)
        try{
            await fetch(URL+id, options).then(handleHttpErrors)
        }catch (err){
            console.log(err.message)
        }


    }