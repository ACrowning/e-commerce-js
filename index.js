import products from './mock.js'
import {imgUrl, btnBoolText, btnDeleteText, boolText, alertText, inputEmptyValue, inputVoidValue} from './constants.js'

const button = document.querySelector('#addButton')
const prodUl = document.querySelector('#products')
const inputTitle = document.querySelector('#title')
const inputDescription = document.querySelector('#description')

function creation(product, container, items) {
	const newUl = document.createElement("ul")
	newUl.className = "product"
	const overlay = document.createElement("div")
	overlay.className = "overlay"
	const image = document.createElement("img")
	const newLiTitle = document.createElement("li")
	const underLi = document.createElement("div")
	const btnDelete = document.createElement("button")
	const btnBool = document.createElement("button")

	image.src = imgUrl
	
	overlay.textContent = 
	`${product.id}`
	underLi.textContent = 
	`${product.title}, ${product.description}, ${product.favorite}`
	
	btnBool.textContent = btnBoolText
	btnDelete.textContent = btnDeleteText

	container.appendChild(newUl)
	newUl.appendChild(overlay)
	newUl.appendChild(image)
	newUl.appendChild(newLiTitle)
	newUl.appendChild(btnBool)
	newLiTitle.appendChild(underLi)
	newLiTitle.appendChild(btnDelete)

	btnBool.onclick = function () {
		btnUpdateBool(product, underLi, btnBool)
	}

	btnDelete.onclick = function () {
		btnUpdateDel(newUl, items, product)
	}
}

function btnUpdateBool(product, under, bool) {
	const favBool = product.favorite === false ? product.favorite = true : product.favorite = false
	under.textContent = `${product.title}, ${product.description}, ${product.favorite = favBool}`
	product.favorite === true ? bool.textContent = boolText : bool.textContent = btnBoolText
}

function btnUpdateDel(ul, items, product) {
	ul.remove()
	const ind = items.indexOf(product)
	items.splice(ind, 1)
}


function createUl(items, container) {
	items.forEach(product => {
		creation(product, container, items)
	})
}

function add(product, container, items) {
	items.push(product)
	creation(product, container, items)
}

function onAdd(items, tit, des, container) {
	if (tit.value.length === 0) {
		return alert(alertText)
	}
	else if (des.value.length === 0) {
		des.value = inputEmptyValue
	}
	
	const newProduct = {
		id: `${items.length + 1}`,
		title: `${tit.value}`,
		description: `${des.value}`,
		favorite: false
	}

	add(newProduct, container, items)
	
	tit.value = inputVoidValue
	des.value = inputVoidValue
}

function enterBtn(event) {
	if (event.key === 'Enter') {
		button.click()
	}}

function init() {
	button.addEventListener("click", function () {
	onAdd(products, inputTitle, inputDescription, prodUl)})
	
	document.addEventListener('keydown', enterBtn)
	createUl(products, prodUl)
}

init()