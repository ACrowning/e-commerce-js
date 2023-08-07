import products from './mock.js'

const button = document.querySelector('#addButton')
const prodUl = document.querySelector('#products')
const inputTitle = document.querySelector('#title')
const inputDescription = document.querySelector('#description')

function btnUpdateBool(product, under, bool) {
	const favBool = product.favorite === false ? product.favorite = true : product.favorite = false
	under.textContent = `${product.title}, ${product.description}, ${product.favorite = favBool}`
	product.favorite === true ? bool.textContent = 'Remove from favorite' : bool.textContent = 'Add to favorite'
}

function btnUpdateDel(ul, items, product) {
	ul.remove()
	const ind = items.indexOf(product)
	items.splice(ind, 1)
}


function createUl(items, container) {
	items.forEach(product => {
		const newUl = document.createElement("ul")
		newUl.className = "product"
		const overlay = document.createElement("overlay")
		overlay.className = "overlay"
		const image = document.createElement("img")
		image.className = "image"
		const newLiTitle = document.createElement("li")
		const underLi = document.createElement("div")
		const btnDelete = document.createElement("button")
		const btnBool = document.createElement("button")

		image.src = "https://picsum.photos/200/300?random"
		
		overlay.textContent = 
		`${product.id}`
		underLi.textContent = 
		`${product.title}, ${product.description}, ${product.favorite}`
		
		btnBool.textContent = 'Add to favorite'
		btnDelete.textContent = 'Delete'

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
	})
}

function add(items, product, container) {
	items.push(product)
		
	const newUl = document.createElement("ul")
	newUl.className = "product"
	const overlay = document.createElement("overlay")
	overlay.className = "overlay"
	const image = document.createElement("img")
	image.className = "image"
	const newLiTitle = document.createElement("li")
	const underLi = document.createElement("div")
	const btnBool = document.createElement("button")
	const btnDelete = document.createElement("button")

	image.src = "https://picsum.photos/200/300?random"
	
	overlay.textContent = 
	`${product.id}`
	underLi.textContent = 
	`${product.title}, ${product.description}, ${product.favorite}`

	btnBool.textContent = 'Add to favorite'
	btnDelete.textContent = 'Delete'
			
	container.appendChild(newUl)
	newUl.appendChild(overlay)
	newUl.appendChild(newLiTitle)
	newLiTitle.appendChild(image)
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

function onAdd(items, tit, des, container) {
	if (tit.value.length === 0) {
		return alert('Void title! Enter the title, please')
	}
	else if (des.value.length === 0) {
		des.value = '-'
	}
	
	const newProduct = {
		id: `${items.length + 1}`,
		title: `${tit.value}`,
		description: `${des.value}`,
		favorite: false
	}

	add(items, newProduct, container)
	
	tit.value = ''
	des.value = '' 
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