import { API_URL } from "../../settings.js"
import { handleHttpErrors, makeOptions, sanitizeStringWithTableRows } from "../../utils.js"

 const URL = API_URL + "/cars"


export async function initCars() {
    loadAllCars()
}

async function loadAllCars() {

const options = makeOptions("GET",null,true)

const cars = await fetch(URL,options).then(handleHttpErrors)

const tablerows = cars.map(car => `
<tr>
    <td>${car.id}</td>
    <td>${car.brand}</td>
    <td>${car.model}</td>
    <td>${car.pricePrDay}</td>
    <td>${car.bestDiscount}</td>
</tr>`).join("")

document.querySelector("#table-rows").innerHTML = sanitizeStringWithTableRows(tablerows)

}
