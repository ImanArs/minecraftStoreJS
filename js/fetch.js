let quickView = document.getElementById("quickView")
let modal = document.getElementById("modal")
let products = document.querySelector(".products")
let aside = document.getElementById("aside")


// header //
let select = document.getElementById("select")
let formSearch = document.getElementById("formSearch")
let inputSearch = document.getElementById("inputSearch")
let userName = document.getElementById('userName')
let loginTools = document.getElementById('loginTools')
let login = document.getElementById('login')

// spisok pod headerSearch
let productBlock = document.getElementById("productBlock")

// cart
let cartBlock = document.getElementById("cart")
let cartWrapper = document.getElementById("cartWrapper")

// modalError
let modalError = document.getElementById("modalError")

let cart = []
let isLogin = {
    name: 'ibrahim',
    price: '200'
}

login.addEventListener("mousemove", () => {
    loginTools.innerHTML =  `
        <div class="loginTools" id="loginToolBlock">

            <p>зарегестрироваться</p>
            <a href="./Login/login.html">войти</a>
            <button>выйти</button>
            <button onclick="LoginClose()">закрыть</button>
        </div>
    `
})
const LoginClose = () => {
    loginTools.innerHTML = ""
}

const Login = () => {
    console.log("changed");

    loginTools.innerHTML =  ""
}

const getData = () => {
    fetch("http://localhost:8080/product")
        .then((resp) => resp.json())
        .then((data) => {
          let userCard = "";
          cart = data
          data.forEach(item => {
              userCard += newCard(item.title, item.desc, item.id, item.img, item.price)
          });
          products.innerHTML = userCard
        })
}

const modalFunc = (id) => {
    fetch(`http://localhost:8080/product/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
            console.log("work");
            modal.innerHTML = `
            <div id="${data.id}" class="modalItem">
            <div class="modalItem_top">
                <h2>${data.title}</h2>
                <button onclick="closingModal()">x</button>
            </div>
            <div class="modalItem_desc">
                <img src="${data.img}" alt="">
                <p>${data.desc}</p>
                <p>${data.price}$</p>
                </div>
            <div class="buyButton">
                <button onclick="setFav(${id})">в корзину</button>
            </div>
            </div>
            `
        })
}
function closingModal() {
    modal.innerHTML= ""
}
const newCard = (title, desc, id, img, price) => {
    return `
    <div class="product_Card" id="${id}">
        <div class="top_Card">
            <img src="${img}" alt="">
            <div class="quickView"><button id="quickView" onclick="modalFunc(${id})">quick view</button></div>
        </div>
        <div class="desc_Card">
            <h4>${title}</h4>
            <p>$${price}</p>
        </div>
        <div class="buyBox">
            <a href="./product/product.html" onclick="setProduct(${id})">перейти</a>
            

            <button onclick="setFav(${id})">в корзину</button>
        </div>
        
    </div>
    `
}

getData()


function inputOutPut(e) {
    e.preventDefault()
    fetch(`http://localhost:8080/product`)
      .then((resp) => resp.json())
      .then((data) => {
        const selectArr =  data.filter(item => item.type === select.value)
        const searchArr = data.filter(item => item.title.toLowerCase().includes(inputSearch.value.toLowerCase()))
        const inputArr = selectArr.filter(item => item.title.toLowerCase().includes(inputSearch.value.toLowerCase()))
        if (inputSearch !== "" && select.value !== "") {
            let prodCard = ""
            if (inputSearch.value !== "" && select.value !== "") {
                searchArr.forEach( item => {
                    prodCard += showProductBlock(item.id, item.title, item.img, item.price)
                })
                productBlock.innerHTML = prodCard;
            } else if (inputSearch.value !== "") {
                inputArr.forEach( item => {
                    prodCard += showProductBlock(item.id, item.title, item.img, item.price)
                })
                productBlock.innerHTML = prodCard
            } else if (select.value !== "") {
                selectArr.forEach( item => {
                    prodCard += showProductBlock(item.id, item.title, item.img, item.price)
                })
                productBlock.innerHTML = prodCard
            } else {
                console.log("zapolnite polya");
            }
        } else {
            console.log('zapolni');
        }

        if (selectArr.length > 0 && inputArr.length > 0 && searchArr.length > 0) {
            productBlock.style.height = "300px"
            productBlock.style.display = "flex"
        } else {    
            productBlock.style.height = "60px"
            productBlock.innerHTML = `<div>ничего не найдено</div>`
        }
    })
}

// // // // //aa

function showProductBlock(id, title, img, price) {
    return `
    <div class="cardProduct" id="${id}">
        <div><img src="${img}" alt=""></div>
        <div>${title}</div>
        <div>${price}.$</div>
    </div>
    `
}

// formSearch.addEventListener("toggle", () => {

// })
// // // // //

function setFav(id) {
    if (isLogin === true) {
        const filteredCards = cart.filter((item) => item.id === id);
        let local = localStorage.getItem("product")
        let prevLocal = local ? JSON.parse(local) : []
        let newLocal = [...prevLocal, ...filteredCards]
        localStorage.setItem("product", JSON.stringify(newLocal))
        
    } else {
        modalError.innerHTML = `
            <div class="modalError_Wrapper">
                <p>вам нужно зарегестрироваться</p>
            </div>
        `
        setTimeout(closeError, 1500);
    }
}


function getFav() {
    if (isLogin === true) {
        let cartArr = JSON.parse(localStorage.getItem('product'))
        let cartHtml = ""
        console.log(cartArr);
        cartArr.forEach( item => {
            cartHtml += showCart(item.id, item.title, item.price, item.img)
        })
        cartWrapper.innerHTML = cartHtml;
        cartBlock.classList.add("active")
        closingModal()
    } else {
        console.log(false);
        modalError.innerHTML = `
            <div class="modalError_Wrapper">
                <p>вам нужно зарегестрироваться</p>
            </div>
        `
        setTimeout(closeError, 1000);
        
    }
    
}
function closeError() {
    modalError.innerHTML=""
}
function showCart(id, title, price, img) {
    return `
        <div id="${id}" class="cartProd">
            <div>
                <img src="${img}" alt="">
            </div>
            <div>
                <h4>${title}</h4>
                <p>${price}$</p>
            </div>
        </div>
    `
}
function closeCart() {
    cartWrapper.innerHTML = ""
    cartBlock.classList.remove("active")
}

const setProduct = (id) => {
    localStorage.setItem("productId", id)
}

if (isLogin !== '') {
    userName.innerHTML = `
        <p>${isLogin.name}</p>
    `
} else {
    userName.innerHTML = `
        <p>auth</p>
    `
}
