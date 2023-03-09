
import { API_URL } from "../../settings.js"
import { handleHttpErrors, makeOptions, sanitizeStringWithTableRows } from "../../utils.js"
const URL = API_URL + "/reservations"

export async function initReservation() {
loadAllCars()
document.querySelector("#table-rows").onclick = setupReservationModal
document.querySelector("#btn-reservation").onclick = makeReservation

}


async function loadAllCars() {

    const cars = await fetch(API_URL+"/cars").then(handleHttpErrors)
    
    const tablerows = cars.map(car => `
    <tr>
        <td>${car.id}</td>
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${car.pricePrDay}</td>
        <td><button id="row-btn_${car.id}" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#reservation-modal">Reserve</button></td></tr>`
        ).join("")
    
    document.querySelector("#table-rows").innerHTML = sanitizeStringWithTableRows(tablerows)
    
    }


async function setupReservationModal(evt) {
    const target = evt.target
    const parts = target.id.split("_");
    const id = parts[1]
    document.querySelector("#car-id").value = id
}

async function makeReservation(evt){
    const username = document.querySelector("#user-name").value
    const carId = document.querySelector("#car-id").value
    const date = document.querySelector("#reservation-date").value
    const reservation = {rentalDate: date, carId: carId, username:username}
    const options = makeOptions("POST",reservation)

    try{ 
        const newReservation = await fetch(URL, options).then(handleHttpErrors)
        document.querySelector("#status").innerText = "Reservation made"
    }catch(err){
        document.querySelector("#status").innerText = err.message
    }


}

