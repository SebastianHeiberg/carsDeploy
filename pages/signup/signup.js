import { API_URL} from "../../settings.js"
import { makeOptions, handleHttpErrors, encode } from "../../utils.js"


const URL = API_URL + "/members"


export function initSignup() {
document.querySelector("#btn-submit-member").onclick = addMember
}



async function addMember(evt) {
    evt.preventDefault();
  
    const form = document.querySelector('#form');
    const formData = new FormData(form);
  
    const person = {};
    formData.forEach((value, key) => person[key] = encode(value));
    console.log(person)
    const options = makeOptions('POST', person);
  
    try {
      const newMember = await fetch(URL, options).then(handleHttpErrors);
      form.reset();
      document.querySelector("#status").innerText = "SUCCESS";
    } catch (err) {
      console.log("Error:", err.message);
      document.querySelector("#status").innerText = err.message;
    }
  }
  

