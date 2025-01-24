import getDataFunction from "./getData.js";
import postDataFunction from "./postData.js";
import patchDataFunction from "./patchData.js";
import deleteDataFunction from "./deleteData.js";
import timer from "./timer.js";

const getbutton = document.querySelector('.getButton')
const postButton = document.querySelector('.postButton')
const patchButton = document.querySelector('.patchButton')
const deleteButton = document.querySelector('.deleteButton')
const list = document.querySelector('ul')


addEventListener("DOMContentLoaded", timer);

getbutton.addEventListener("click",async () => {
    let products = await getDataFunction('http://localhost:3000/PRODUCTS')
    products.forEach(product => {
        console.log(product)
        if(product.discount){
        list.insertAdjacentHTML(
            `beforeend`,
            `<li class="listElement"><img src="${product.url}"><span class="productName">${product.name}</span> <span class="productCost">${product.cost}$</span> <span class="productDiscountCost">${Number(product.cost)*0.75}$</span><span class="productQuantity">Количество: ${product.quantity}</span></li>`
        )
    }
    else{
        list.insertAdjacentHTML(
            `beforeend`,
            `<li class="listElement"><img src="${product.url}"><span class="productName">${product.name}</span> <span class="productEndCost">${product.cost}$</span><span class="productQuantity">Количество: ${product.quantity}</span></li>`
        )
    }
    })
})

// отправка пользователя
postButton.addEventListener("click",async () => {
    let products = await getDataFunction('http://localhost:3000/PRODUCTS')
    let urlimg = prompt("Введите URL фото товара")
    let productName = prompt("Введите название товара")
    let productCost = prompt("Введите цену товара")
    let productQuantity = prompt("Введите количество товара")
    let discount = prompt("Введите true или false для скидки")
    let obj = { id: products.length+1, urlimg: urlimg,name: productName,cost: productCost,quantity: productQuantity,discount: discount}
    await postDataFunction('http://localhost:3000/PRODUCTS', obj)
})

patchButton.addEventListener("click",async () => {
    let id = prompt("Введите id товара который вы хотите изменить")
    let par = prompt('Введите параметр товара который хотите изменить')
    let val = prompt("Введите значение параметра")
    let parval = `"${par}" : "${val}"`
    await patchDataFunction('http://localhost:3000/PRODUCTS', id, parval)
})

deleteButton.addEventListener("click",async () => {
    let id = prompt("Введите id товара который вы хотите удалить")
    await deleteDataFunction('http://localhost:3000/PRODUCTS', id)
})