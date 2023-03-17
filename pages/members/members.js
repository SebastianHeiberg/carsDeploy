import { API_URL} from "../../settings.js"
import { handleHttpErrors, sanitizeStringWithTableRows, makeOptions, encode} from "../../utils.js"
const URL = API_URL + "/members"

export function initMembers(){
loadAllMembers()
document.querySelector("#tbl-body").onclick = showUserDetails
}

async function loadAllMembers() {

    const options = makeOptions("GET",null, true)
    
    const members = await fetch(URL,options).then(handleHttpErrors)
    
    const tablerows = members.map(member => `
    <tr>
        <td>${member.username}</td>
        <td>${member.email}</td>
        <td>${member.firstName}</td>
        <td>${member.ranking}</td>
        <td><button id="row-btn_details_${member.username}" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#member-details-modal">Details</button></td>
        <td><button id="row-btn_delete_${member.username}" type="button"  class="btn btn-sm btn-primary">Delete</button></td>
    </tr>`).join("")
    
    document.querySelector("#tbl-body").innerHTML = sanitizeStringWithTableRows(tablerows)
    
    }

    async function showUserDetails(evt) {
        const target = evt.target
        if (!target.id.startsWith("row-btn_")) {
          return
        }
        
        const parts = target.id.split("_");
        const id = parts[2]

       
        const btnAction = parts[1]
          if (btnAction === "details") {
            const options = makeOptions("GET",null,true)
            const member = await fetch(`${URL}/${id}`,options).then(handleHttpErrors)
            document.querySelector("#modal-title").innerText = "hello"
            document.querySelector("#user-name").innerText = encode(member.username)
            document.querySelector("#email").innerText = encode(member.email)
            document.querySelector("#first-name").innerText = encode(member.firstName)
            document.querySelector("#last-name").innerText = encode(member.lastName)
            document.querySelector("#street").innerText = encode(member.street)
            document.querySelector("#city").innerText = encode(member.city)
            document.querySelector("#zip").innerText = encode(member.zip)
            document.querySelector("#created").innerText = encode(member.created)
            document.querySelector("#edited").innerText = encode(member.edited)
            document.querySelector("#ranking").innerText = encode(member.ranking)
          } else if (btnAction === "delete") {
            const options = makeOptions("DELETE")
            try{
            await fetch(`${URL}/${id}`,options).then(handleHttpErrors)
          } catch(err) {
            console.log(err)
          }
          loadAllMembers()
          }
      }

