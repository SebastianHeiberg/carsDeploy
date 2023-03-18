import { API_URL} from "../../settings.js"
import { handleHttpErrors, makeOptions } from "../../utils.js"
import { sanitizeStringWithTableRows } from "../../utils.js"

const URL = API_URL + "/reservations"

export async function initListReservationsAll() {
    loadReservations()
}


async function loadReservations(){
    const options = makeOptions("GET",null,true)
    const reservations = await fetch(URL,options).then(handleHttpErrors)
    const cars = await fetch(API_URL+"/cars/admin",options).then(handleHttpErrors)   

    const tablerows = await reservations.map(reservation => {
    const car = cars.find((car) => car.id === reservation.carId)
    return `  
    <tr>
        <td>${reservation.carId}</td>
        <td>${reservation.username}</td>
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${reservation.rentalDate}</td>
        <td>${car.pricePrDay}</td>
    </tr>` })
    
    document.querySelector("#tablerows").innerHTML = sanitizeStringWithTableRows(tablerows.join(""))
        
    
    }
    


