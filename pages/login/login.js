import {API_URL} from "../../settings.js"
import {handleHttpErrors} from "../../utils.js"

const URL = API_URL + "/auth/login"

export function initLogin() {
document.querySelector("#btn-login").onclick = login
}

export function logout () {
    document.querySelector("#login-id").style.display="block"
    document.querySelector("#logout-id").style.display="none"
    document.querySelector("#for-admin-cars").style.display="none"
    document.querySelector("#for-admin-reservations").style.display="none"
    document.querySelector("#for-admin-members").style.display="none"
    document.querySelector("#for-members").style.display="none"
    
    localStorage.clear()
}


async function login(evt) {

    localStorage.clear()
    document.querySelector("#error").innerText = ""


    const username = document.querySelector("#username").value
    const password = document.querySelector("#password").value

    const userDTO = {username, password}

    const options = {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json'
				},
        body: JSON.stringify(userDTO)
    } 

    try{
    const response = await fetch(URL,options).then(res => handleHttpErrors(res))
    localStorage.setItem("user", response.username)
    localStorage.setItem("token", response.token)
    localStorage.setItem("roles", response.roles)
    window.router.navigate("")

    document.querySelector("#login-id").style.display="none"
    document.querySelector("#logout-id").style.display="block"
    
    if(response.roles.includes("ADMIN")){
        document.querySelector("#for-admin-cars").style.display="block"
        document.querySelector("#for-admin-reservations").style.display="block"
        document.querySelector("#for-admin-members").style.display="block"
}

if(response.roles.includes("USER")){
    document.querySelector("#for-members").style.display="block"
}

document.querySelector("#username").value = ''
document.querySelector("#password").value = ''

    
} catch (err){

    document.querySelector("#error").innerhtml = err.message
}

}