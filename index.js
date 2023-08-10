import products from "./mock.js";
import {
  IMG_URL,
  BTN_BOOL_TEXT,
  BTN_DELETE_TEXT,
  BOOL_TEXT,
  ALERT_TEXT,
  INPUT_EMPTY_VALUE,
  INPUT_VOID_VALUE,
} from "./constants.js";

const button = document.querySelector("#addButton");
const list = document.querySelector("#list");
const inputTitle = document.querySelector("#title");
const inputDescription = document.querySelector("#description");

function creation(product, container, items) {
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  const image = document.createElement("img");
  const newLi = document.createElement("li");
  newLi.className = "product";
  const underLi = document.createElement("div");
  const btnDelete = document.createElement("button");
  const btnBool = document.createElement("button");

  image.src = IMG_URL;

  overlay.textContent = `${product.id}`;
  underLi.textContent = `${product.title}, ${product.description}, ${product.favorite}`;

  btnBool.textContent = BTN_BOOL_TEXT;
  btnDelete.textContent = BTN_DELETE_TEXT;

  container.appendChild(newLi);
  newLi.appendChild(overlay);
  newLi.appendChild(image);
  newLi.appendChild(underLi);
  newLi.appendChild(btnBool);
  newLi.appendChild(btnDelete);

  btnBool.onclick = function () {
    btnUpdateBool(product, underLi, btnBool);
  };

  btnDelete.onclick = function () {
    btnUpdateDel(newLi, items, product);
  };
}

function btnUpdateBool(product, under, bool) {
  const favBool =
    product.favorite === false
      ? (product.favorite = true)
      : (product.favorite = false);
  under.textContent = `${product.title}, ${
    product.description
  }, ${(product.favorite = favBool)}`;
  product.favorite === true
    ? (bool.textContent = BOOL_TEXT)
    : (bool.textContent = BTN_BOOL_TEXT);
}

function btnUpdateDel(ul, items, product) {
  ul.remove();
  const ind = items.indexOf(product);
  items.splice(ind, 1);
}

function createUl(items, container) {
  items.forEach((product) => {
    creation(product, container, items);
  });
}

function add(product, container, items) {
  items.push(product);
  creation(product, container, items);
}

function onAdd(items, tit, des, container) {
  if (tit.value.length === 0) {
    return alert(ALERT_TEXT);
  } else if (des.value.length === 0) {
    des.value = INPUT_EMPTY_VALUE;
  }

  const newProduct = {
    id: `${items.length + 1}`,
    title: `${tit.value}`,
    description: `${des.value}`,
    favorite: false,
  };

  add(newProduct, container, items);

  tit.value = INPUT_VOID_VALUE;
  des.value = INPUT_VOID_VALUE;
}

function enterBtn(event) {
  if (event.key === "Enter") {
    button.click();
  }
}

function init() {
  button.addEventListener("click", function () {
    onAdd(products, inputTitle, inputDescription, list);
  });

  document.addEventListener("keydown", enterBtn);
  createUl(products, list);
}

init();
