const products = [
	{id: 1, title: 'title1', description: 'description1'},
	{id: 2, title: 'title2', description: 'description2'},
	{id: 3, title: 'title3', description: 'description3'},
]
const button = document.querySelector('#addButton')
const prodUl = document.querySelector('#products')
const inputTitle = document.querySelector('#title')
const inputDescription = document.querySelector('#description')

function createUl(items, container) {
	items.forEach(product => {
		const newUl = document.createElement("ul")
		const newLiTitle = document.createElement("li")
			
		newUl.textContent = 
		`${product.id}`
		newLiTitle.textContent = 
		`${product.title}, ${product.description}`
				
		container.appendChild(newUl)
		newUl.appendChild(newLiTitle)	
	})
}

function add(items, prod, container) {
	items.push(prod)
		
	const newUl = document.createElement("ul")
	const newLiTitle = document.createElement("li")
	
	newUl.textContent = 
	`${prod.id}`
	newLiTitle.textContent = 
	`${prod.title}, ${prod.description}`
			
	container.appendChild(newUl)
	newUl.appendChild(newLiTitle)
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
		description: `${des.value}`
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