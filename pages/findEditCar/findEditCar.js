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
    const safeId = encode(id)
    const car = await fetch(URL+id).then(handleHttpErrors).then( car => {

        document.querySelector("#car-id").value = car.id  
        document.querySelector("#brand").value = car.brand  
        document.querySelector("#model").value = car.model
        document.querySelector("#price-pr-day").value = car.pricePrDay
        document.querySelector("#best-discount").value = car.bestDiscount
    })
}
    

    async function deleteCar(){
        const id = document.querySelector("#car-id").value
        const options = makeOptions("DELETE")
        try{
        await fetch(URL+id,options).then(handleHttpErrors)
    } catch (err) {

        document.querySelector("#car-response").innerText = err.message
        // console.log(err.message)

    }

    document.querySelector("#car-response").innerText = "Car deleted"
    }
    

    async function editCar () {

        const id = document.querySelector("#car-id").value
        const brand = document.querySelector("#brand").value  
        const model = document.querySelector("#model").value
        const pricePrDay = document.querySelector("#price-pr-day").value
        const bestDiscount = document.querySelector("#best-discount").value

        const car = {brand: brand, model: model, pricePrDay: pricePrDay, bestDiscount: bestDiscount}
        const options = makeOptions('PUT',car)
        try{
            await fetch(URL+id, options).then(handleHttpErrors)
        }catch (err){
            console.log(err.message)
        }


    }