const products = [
	{id: 1, title: 'title1', description: 'description1', favorite: false},
	{id: 2, title: 'title2', description: 'description2', favorite: false},
	{id: 3, title: 'title3', description: 'description3', favorite: false},
]
const button = document.querySelector('#addButton')
const prodUl = document.querySelector('#products')
const inputTitle = document.querySelector('#title')
const inputDescription = document.querySelector('#description')

function createUl(items, container) {
	items.forEach(product => {
		const newUl = document.createElement("ul")
		newUl.id = "ulId"
		const newLiTitle = document.createElement("li")
		const btnDelete = document.createElement("button")
		const btnBool = document.createElement("button")
		
		newUl.textContent = 
		`${product.id}`
		newLiTitle.textContent = 
		`${product.title}, ${product.description}, ${product.favorite}`
		
		btnBool.textContent = 'Add to favorite'
		btnDelete.textContent = 'Delete'
				
		container.appendChild(newUl)
		newUl.appendChild(newLiTitle)
		newUl.appendChild(btnBool)
		newLiTitle.appendChild(btnDelete)

		btnBool.onclick = function () {
			const favBool = product.favorite === false ? product.favorite = true : product.favorite = false
			newLiTitle.textContent = `${product.title}, ${product.description}, ${product.favorite = favBool}`
			newLiTitle.appendChild(btnDelete)
		}

		btnDelete.onclick = function () {
			newUl.remove()
			const ind = items.indexOf(product)
			items.splice(ind, 1)
		}
	})
}

function add(items, product, container) {
	items.push(product)
		
	const newUl = document.createElement("ul")
	newUl.id = "ulId"
	const newLiTitle = document.createElement("li")
	const btnBool = document.createElement("button")
	const btnDelete = document.createElement("button")
	
	newUl.textContent = 
	`${product.id}`
	newLiTitle.textContent = 
	`${product.title}, ${product.description}, ${product.favorite}`
	btnBool.textContent = 'Add to favorite'
	btnDelete.textContent = 'Delete'
			
	container.appendChild(newUl)
	newUl.appendChild(newLiTitle)
	newUl.appendChild(btnBool)
	newLiTitle.appendChild(btnDelete)

	btnBool.onclick = function () {
		const favBool = product.favorite === false ? product.favorite = true : product.favorite = false
		newLiTitle.textContent = `${product.title}, ${product.description}, ${product.favorite = favBool}`
		newLiTitle.appendChild(btnDelete)
	}

	btnDelete.onclick = function () {
		newUl.remove()
		const ind = items.indexOf(product)
		items.splice(ind, 1)
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