import { API_URL} from "../../settings.js"
import { handleHttpErrors, makeOptions } from "../../utils.js"
import { sanitizeStringWithTableRows } from "../../utils.js"

const URL = API_URL + "/reservations"

export async function initListReservationsAll() {
    loadReservations()
}


async function loadReservations(){

    const reservations = await fetch(URL).then(handleHttpErrors)
    
    const tablerows = await Promise.all(reservations.map(async reservation => {
    
    const car = await fetch(API_URL+"/cars/"+reservation.carId).then(handleHttpErrors)   
    return `  
    <tr>
        <td>${reservation.carId}</td>
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${reservation.rentalDate}</td>
        <td>${car.pricePrDay}</td>
    </tr>` }))
    
    document.querySelector("#tablerows").innerHTML = sanitizeStringWithTableRows(tablerows.join(""))
        
    
    }
    


