let formLogin = document.getElementById("formLogin")
let logInpName = document.getElementById("logName")
let logInpPass = document.getElementById("logPass")
let logInBtn = document.getElementById("logInBtn")
let InpCheckbox = document.getElementById("InpCheckbox")

let users = []
const getData = () => {
    fetch("http://localhost:8080/users")
    .then(resp => resp.json())
    .then(data =>  {
        users.push(data)
        // users = data
    })
}
getData()
    console.log(users);
    
    const checkUser = () => {
        // formLogin.addEventListener("change", () => {
            
            // })
        }
        