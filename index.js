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
const inputCount = document.querySelector("#count");
const cartCount = document.querySelector(".cartCount");

function creation(product, container, items) {
  const newLi = document.createElement("li");
  newLi.className = "product";
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  const image = document.createElement("img");
  const underImg = document.createElement("div");
  const underLi = document.createElement("div");
  const btnDelete = document.createElement("button");
  const btnBool = document.createElement("button");
  const newCount = document.createElement("input");
  newCount.type = "number";
  const plus = document.createElement("button");
  const minus = document.createElement("button");
  const addCart = document.createElement("button");
  addCart.className = "addCart";

  image.src = IMG_URL;

  plus.textContent = "+";
  minus.textContent = "-";
  addCart.textContent = "Add to cart";
  newCount.placeholder = 0;

  overlay.textContent = `${product.id} count:${product.count}`;
  underLi.textContent = `${product.title}, ${product.description}, ${product.favorite}`;

  btnBool.textContent = BTN_BOOL_TEXT;
  btnDelete.textContent = BTN_DELETE_TEXT;

  container.appendChild(newLi);
  newLi.appendChild(overlay);
  newLi.appendChild(image);
  newLi.appendChild(underImg);
  underImg.appendChild(minus);
  underImg.appendChild(newCount);
  underImg.appendChild(plus);
  underImg.appendChild(addCart);
  newLi.appendChild(underLi);
  newLi.appendChild(btnBool);
  newLi.appendChild(btnDelete);

  btnDis(newCount, product, minus, plus);

  addCart.onclick = function () {
    btnAddCart(newCount, product, cartCount, overlay);
  };

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

function btnDis(newCnt, product, mn, pl) {
  let num = 1;
  pl.onclick = function () {
    newCnt.value > product.count
      ? (pl.disabled = true)
      : (newCnt.value = num++);
    newCnt.value > 0 ? (mn.disabled = false) : (newCnt.value = num++);
  };

  mn.onclick = function () {
    newCnt.value < 0 ? (mn.disabled = true) : (newCnt.value = num--);
    newCnt.value < product.count
      ? (pl.disabled = false)
      : (newCnt.value = num--);
  };
}

function btnAddCart(newCnt, product, cartCnt, over) {
  if (newCnt.value <= 0) {
    alert("Wrong count!");
  } else if (newCnt.value > product.count) {
    alert("Wrong count!");
  } else {
    cartCnt.textContent = newCnt.value;
    over.textContent = `${product.id} count:${(product.count =
      product.count - newCnt.value)}`;
  }
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

function onAdd(items, tit, des, container, cnt) {
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
    count: `${cnt.value}`,
  };

  add(newProduct, container, items);

  tit.value = INPUT_VOID_VALUE;
  des.value = INPUT_VOID_VALUE;
  cnt.value = INPUT_VOID_VALUE;
}

function enterBtn(event) {
  if (event.key === "Enter") {
    button.click();
  }
}

function init() {
  button.addEventListener("click", function () {
    onAdd(products, inputTitle, inputDescription, list, inputCount);
  });

  document.addEventListener("keydown", enterBtn);
  createUl(products, list);
}

init();
