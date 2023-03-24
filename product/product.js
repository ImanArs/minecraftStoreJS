let productPage = document.getElementById("productBlock")
let id = localStorage.getItem("productId")

let productArr = []

const getData = (id) => {
    fetch(`http://localhost:8080/product/${id}`)
        .then( resp => resp.json())
        .then( data => {
            productArr = data;
            let page = productHTML(productArr)
            productPage.innerHTML = page
            

        })
}
getData(id)

const productHTML = (arr) => {
    return `
        <section class="prodPage">
            <div>
                <img src="${arr.img}">
            </div>
            <div>
                <h2>${arr.title}</h2>
                <div class="price">
                    ${ arr.oldPrice ? `<del>$ ${arr.price}</del>` : ""}
                    <del>$ ${arr.price}</del>
                    <span>$ ${arr.price}</span>
                </div>
            </div>
        </section>
    `
}