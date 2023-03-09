import { API_URL} from "../../settings.js"
import { makeOptions, handleHttpErrors } from "../../utils.js"


const URL = API_URL + "/members"


export function initSignup() {
document.querySelector("#btn-submit-member").onclick = addMember
}


async function addMember (evt) {
evt.preventDefault()

const username = document.querySelector("#input-username").value
const email = document.querySelector("#input-email").value
const password = document.querySelector("#input-password").value
const firstName = document.querySelector("#input-firstname").value
const lastName = document.querySelector("#input-lastname").value
const street = document.querySelector("#input-street").value
const city = document.querySelector("#input-city").value
const zip = document.querySelector("#input-zip").value

const person = {username: username, email: email, password: password, firstName: firstName, lastName: lastName, street: street, city: city, zip:zip}
const options = makeOptions("POST",person)
try{
   const newmember = await fetch(URL,options).then(handleHttpErrors)
   document.querySelector("#response").innerText = "SUCCES"
   document.querySelector("#input-username").value = ""
    document.querySelector("#input-email").value = ""
    document.querySelector("#input-password").value = ""
    document.querySelector("#input-firstname").value = ""
    document.querySelector("#input-lastname").value = ""
    document.querySelector("#input-street").value = ""
    document.querySelector("#input-city").value = ""
    document.querySelector("#input-zip").value = ""


} catch (err){
    console.log("sgset", err.message)
    document.querySelector("#response").innerText = err.message
}

document.querySelector("#input-username").value = ""
document.querySelector("#input-email").value = ""
document.querySelector("#input-password").value = ""
document.querySelector("#input-firstname").value = ""
document.querySelector("#input-lastname").value = ""
document.querySelector("#input-street").value = ""
document.querySelector("#input-city").value = ""
document.querySelector("#input-zip").value = ""


}

