import products from "./mock.js";
import {
  IMG_URL,
  BTN_BOOL_TEXT,
  BTN_DELETE_TEXT,
  BOOL_TEXT,
  ALERT_TEXT,
  INPUT_MINUS_VALUE,
  INPUT_PLUS_VALUE,
  INPUT_VOID_VALUE,
  BTN_CART_TEXT,
  ALERT_COUNT_TEXT,
  INPUT_COUNT_TEXT,
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
  const btnBoolean = document.createElement("button");
  const newCount = document.createElement("input");
  newCount.type = "number";
  const plus = document.createElement("button");
  const minus = document.createElement("button");
  const addCart = document.createElement("button");
  addCart.className = "addCart";

  image.src = IMG_URL;

  plus.textContent = INPUT_PLUS_VALUE;
  plus.disabled = true;
  minus.textContent = INPUT_MINUS_VALUE;
  minus.disabled = true;
  addCart.textContent = BTN_CART_TEXT;
  newCount.placeholder = INPUT_COUNT_TEXT;
  newCount.value = 1;

  overlay.textContent = `${product.id} count: ${product.count}`;
  underLi.textContent = `${product.title}, ${product.description}, ${product.favorite}`;

  btnBoolean.textContent = BTN_BOOL_TEXT;
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
  newLi.appendChild(btnBoolean);
  newLi.appendChild(btnDelete);

  btnPlusMinus(newCount, product, minus, plus);

  addCart.onclick = function () {
    const parseCartCount = Number(cartCount.textContent);
    const parseNewCount = Number(newCount.value);
    btnAddCart(
      newCount,
      product,
      cartCount,
      overlay,
      parseCartCount,
      parseNewCount
    );
  };

  btnBoolean.onclick = function () {
    btnUpdateBoolean(product, underLi, btnBoolean);
  };

  btnDelete.onclick = function () {
    btnUpdateDelete(newLi, items, product);
  };
}

function btnUpdateBoolean(product, under, boolean) {
  if (product.favorite === false) {
    under.textContent = `${product.title}, ${
      product.description
    }, ${(product.favorite = true)}`;
  } else {
    under.textContent = `${product.title}, ${
      product.description
    }, ${(product.favorite = false)}`;
  }

  if (product.favorite === true) {
    boolean.textContent = BOOL_TEXT;
  } else {
    boolean.textContent = BTN_BOOL_TEXT;
  }
}

function btnUpdateDelete(li, items, product) {
  li.remove();
  const itemsIndex = items.indexOf(product);
  items.splice(itemsIndex, 1);
}

function btnPlusMinus(theNewCount, product, btnMinus, btnPlus) {
  btnPlus.onclick = function () {
    if (+theNewCount.value >= product.count) {
      btnPlus.disabled = true;
    } else {
      Number(theNewCount.value++);
    }
    if (+theNewCount.value > 0) {
      btnMinus.disabled = false;
    }
  };

  btnMinus.onclick = function () {
    if (+theNewCount.value <= 0) {
      btnMinus.disabled = true;
    } else {
      Number(theNewCount.value--);
    }
    if (+theNewCount.value < product.count) {
      btnPlus.disabled = false;
    }
  };
}

function btnAddCart(
  theNewCount,
  product,
  theCartCount,
  over,
  cartCountParsed,
  newCountParsed
) {
  if (theNewCount.value <= 0) {
    alert(ALERT_COUNT_TEXT);
  } else if (theNewCount.value > product.count) {
    alert(ALERT_COUNT_TEXT);
  } else {
    theCartCount.textContent = cartCountParsed + newCountParsed;
    over.textContent = `${product.id} count: ${(product.count =
      product.count - theNewCount.value)}`;
  }
  theNewCount.value = INPUT_VOID_VALUE;
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

function onAdd(items, titleOnAdd, descriptionOnAdd, container, toInputCount) {
  if (titleOnAdd.value.length === 0) {
    return alert(ALERT_TEXT);
  } else if (descriptionOnAdd.value.length === 0) {
    descriptionOnAdd.value = INPUT_MINUS_VALUE;
  }
  if (Number(toInputCount.value) <= 0) {
    return alert(ALERT_COUNT_TEXT);
  }

  const newProduct = {
    id: `${items.length + 1}`,
    title: `${titleOnAdd.value}`,
    description: `${descriptionOnAdd.value}`,
    favorite: false,
    count: Number(toInputCount.value),
  };

  add(newProduct, container, items);

  titleOnAdd.value = INPUT_VOID_VALUE;
  descriptionOnAdd.value = INPUT_VOID_VALUE;
  toInputCount.value = INPUT_VOID_VALUE;
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
