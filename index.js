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
  ADD_TO_CART,
  ALERT_COUNT_TEXT,
  INPUT_COUNT_TEXT,
} from "./constants.js";

const button = document.querySelector("#addButton");
const list = document.querySelector("#list");
const inputTitle = document.querySelector("#title");
const inputDescription = document.querySelector("#description");
const inputCount = document.querySelector("#count");
const cartCount = document.querySelector(".cartCount");
const shoppingCart = document.querySelector("#shopping-cart");
const shoppingCartButton = document.getElementById("toggleButton");
const closeCartButton = document.getElementById("closeCart");
const containerOverlayCount = document.querySelector(".count");
const cartInContainer = document.querySelector(".cartInContainer");

const creation = (product, container, items) => {
  const newLi = document.createElement("li");
  newLi.className = "product";
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  const image = document.createElement("img");
  const underImg = document.createElement("div");
  const underLi = document.createElement("div");
  const btnDelete = document.createElement("button");
  const btnBoolean = document.createElement("button");
  btnBoolean.className = "favoriteButton";
  const newCount = document.createElement("input");
  newCount.type = "number";
  const plus = document.createElement("button");
  const minus = document.createElement("button");
  const addCart = document.createElement("button");
  addCart.className = "addCart";

  image.src = IMG_URL;

  plus.textContent = INPUT_PLUS_VALUE;
  minus.textContent = INPUT_MINUS_VALUE;
  addCart.textContent = ADD_TO_CART;
  newCount.placeholder = INPUT_COUNT_TEXT;
  newCount.value = 0;
  newCount.style.width = `${65}px`;

  underLi.textContent = `${product.title}, ${product.description}`;

  btnBoolean.textContent = BTN_BOOL_TEXT;
  btnDelete.textContent = BTN_DELETE_TEXT;

  container.appendChild(newLi);
  newLi.appendChild(overlay);
  newLi.appendChild(image);
  overlay.appendChild(btnDelete);
  newLi.appendChild(btnBoolean);
  newLi.appendChild(underImg);
  underImg.appendChild(underLi);
  underImg.appendChild(minus);
  underImg.appendChild(newCount);
  underImg.appendChild(plus);
  newLi.appendChild(addCart);

  if (product.count === 0) {
    addCart.disabled = true;
    plus.disabled = true;
  }

  if (newCount.value >= product.count) {
    plus.disabled = true;
  }
  plus.onclick = () => {
    btnToPlus(newCount, product, minus, plus);
  };

  if (newCount.value <= 1) {
    minus.disabled = true;
  }
  minus.onclick = () => {
    btnToMinus(newCount, minus, plus);
  };

  addCart.onclick = () => {
    const parseCartCount = parseInt(cartCount.textContent);
    const parseNewCount = parseInt(newCount.value);
    btnAddCart(newCount, product, cartCount, parseCartCount, parseNewCount);
    if (product.count === 0) {
      addCart.disabled = true;
      plus.disabled = true;
    }
  };

  btnBoolean.onclick = () => {
    btnUpdateBoolean(product, btnBoolean);
  };

  btnDelete.onclick = () => {
    btnUpdateDelete(newLi, items, product);
  };
};

const btnUpdateBoolean = (product, boolean) => {
  if (product.favorite === false) {
    product.favorite = true;
  } else {
    product.favorite = false;
  }

  if (product.favorite === true) {
    boolean.textContent = BOOL_TEXT;
  } else {
    boolean.textContent = BTN_BOOL_TEXT;
  }
};

const btnUpdateDelete = (li, items, product) => {
  li.remove();
  const itemsIndex = items.indexOf(product);
  items.splice(itemsIndex, 1);
};

const btnToPlus = (theNewCount, product, btnMinus, btnPlus) => {
  btnMinus.disabled = false;

  const newValue = parseInt(theNewCount.value) + 1;
  theNewCount.value = newValue;

  if (theNewCount.value >= product.count) {
    btnPlus.disabled = true;
  }
};

const btnToMinus = (theNewCount, btnMinus, btnPlus) => {
  btnPlus.disabled = false;

  const newValue = parseInt(theNewCount.value) - 1;
  theNewCount.value = newValue;

  if (theNewCount.value <= 1) {
    btnMinus.disabled = true;
  }
};

const btnAddCart = (
  theNewCount,
  product,
  theCartCount,
  cartCountParsed,
  newCountParsed
) => {
  // const eachCart = document.createElement("div");
  // cartInContainer.appendChild(eachCart);

  if (theNewCount.value <= 0) {
    alert(ALERT_COUNT_TEXT);
  } else if (theNewCount.value > product.count) {
    alert(ALERT_COUNT_TEXT);
  } else {
    theCartCount.textContent = cartCountParsed + newCountParsed;
    product.count = product.count - theNewCount.value;
    const shoppingCartProducts = [
      product.title,
      product.description,
      newCountParsed,
    ];
    // eachCart.textContent = `${product.title}, ${product.description} ${newCountParsed}`;
    localStorage.setItem("cartStorage", JSON.stringify(shoppingCartProducts));
  }
  theNewCount.value = 1;
};

const createUl = (items, container) => {
  items.forEach((product) => {
    creation(product, container, items);
  });
};

const add = (product, container, items) => {
  items.push(product);
  creation(product, container, items);
};

const onAdd = (
  items,
  titleOnAdd,
  descriptionOnAdd,
  container,
  toInputCount
) => {
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
};

const enterBtn = (event) => {
  if (event.key === "Enter") {
    button.click();
  }
};

// const openCart = () => {
//   shoppingCart.classList.toggle("visible");
// };

// const closeCart = (event) => {
//   if (event.key === "Escape") {
//     shoppingCart.classList.toggle("visible").remove();
//   }
// };

const init = () => {
  button.addEventListener("click", () => {
    onAdd(products, inputTitle, inputDescription, list, inputCount);
  });

  document.addEventListener("keydown", enterBtn);
  createUl(products, list);

  const cartStorageJSON = localStorage.getItem("cartStorage");
  const local = JSON.parse(cartStorageJSON);

  shoppingCartButton.addEventListener("click", () => {
    console.log(local);
  });

  // closeCartButton.addEventListener("click", openCart);
  // document.addEventListener("keydown", closeCart);
};

init();
