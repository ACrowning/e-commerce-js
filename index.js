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
const inputPrice = document.querySelector("#price");
const inputCount = document.querySelector("#count");
const cartCount = document.querySelector(".cartCount");
const shoppingCartButton = document.getElementById("toggleButton");
const btnAscending = document.getElementById("ascending");
const btnDescending = document.getElementById("descending");

const creation = ({ product, container, products, storedProducts }) => {
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

  underLi.textContent = `${product.title}, ${product.description}, ${product.price}`;

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
    btnToPlus({ newCount, product, minus, plus });
  };

  if (newCount.value <= 1) {
    minus.disabled = true;
  }
  minus.onclick = () => {
    btnToMinus({ newCount, minus, plus });
  };

  addCart.onclick = () => {
    const parseCartCount = parseInt(cartCount.textContent);
    const parseNewCount = parseInt(newCount.value);
    btnAddCart({
      newCount,
      product,
      cartCount,
      parseCartCount,
      parseNewCount,
      storedProducts,
    });
    if (product.count === 0) {
      addCart.disabled = true;
      plus.disabled = true;
    }
  };

  btnBoolean.onclick = () => {
    btnUpdateBoolean({ product, btnBoolean });
  };

  btnDelete.onclick = () => {
    btnUpdateDelete({ newLi, products, product });
  };
};

const btnUpdateBoolean = ({ product, btnBoolean }) => {
  if (product.favorite === false) {
    product.favorite = true;
  } else {
    product.favorite = false;
  }

  if (product.favorite === true) {
    btnBoolean.textContent = BOOL_TEXT;
  } else {
    btnBoolean.textContent = BTN_BOOL_TEXT;
  }
};

const btnUpdateDelete = ({ newLi, products, product }) => {
  newLi.remove();
  const itemsIndex = products.indexOf(product);
  products.splice(itemsIndex, 1);
};

const btnToPlus = ({ newCount, product, minus, plus }) => {
  minus.disabled = false;

  const newValue = parseInt(newCount.value) + 1;
  newCount.value = newValue;

  if (newCount.value >= product.count) {
    plus.disabled = true;
  }
};

const btnToMinus = ({ newCount, minus, plus }) => {
  plus.disabled = false;

  const newValue = parseInt(newCount.value) - 1;
  newCount.value = newValue;

  if (newCount.value <= 1) {
    minus.disabled = true;
  }
};

const btnAddCart = ({
  newCount,
  product,
  cartCount,
  parseCartCount,
  parseNewCount,
  storedProducts,
}) => {
  if (newCount.value <= 0) {
    alert(ALERT_COUNT_TEXT);
  } else if (newCount.value > product.count) {
    alert(ALERT_COUNT_TEXT);
  } else {
    cartCount.textContent = parseCartCount + parseNewCount;
    product.count = product.count - newCount.value;
    for (let index = 0; index < parseNewCount; index++) {
      storedProducts.push(product);
    }

    localStorage.setItem("cartStorage", JSON.stringify(storedProducts));
  }

  newCount.value = 1;
};

const createUl = ({ products, container, storedProducts }) => {
  const result = document.getElementById("list");
  result.innerHTML = "";
  products.forEach((product) => {
    creation({ product, container, products, storedProducts });
  });
};

const add = ({ product, container, products, storedProducts }) => {
  products.push(product);
  creation({ product, container, products, storedProducts });
};

const onAdd = ({
  products,
  inputTitle,
  inputDescription,
  inputPrice,
  container,
  inputCount,
  storedProducts,
}) => {
  if (inputTitle.value.length === 0) {
    return alert(ALERT_TEXT);
  } else if (inputDescription.value.length === 0) {
    inputDescription.value = INPUT_MINUS_VALUE;
  }
  if (parseInt(inputCount.value) <= 0) {
    return alert(ALERT_COUNT_TEXT);
  }

  const newProduct = {
    id: `${products.length + 1}`,
    title: `${inputTitle.value}`,
    description: `${inputDescription.value}`,
    price: parseInt(inputPrice.value),
    favorite: false,
    count: parseInt(inputCount.value),
  };

  add({ product: newProduct, container, products, storedProducts });

  inputTitle.value = INPUT_VOID_VALUE;
  inputDescription.value = INPUT_VOID_VALUE;
  inputPrice.value = INPUT_VOID_VALUE;
  inputCount.value = INPUT_VOID_VALUE;
};

const sortDescending = ({ storedProducts }) => {
  const sortedArray = [...products];
  sortedArray.sort(
    (productLow, productHigh) => productHigh.price - productLow.price
  );
  createUl({
    products: sortedArray,
    container: list,
    storedProducts,
  });
};

const sortAscending = ({ storedProducts }) => {
  const sortedArray = [...products];
  sortedArray.sort(
    (productLow, productHigh) => productLow.price - productHigh.price
  );
  createUl({
    products: sortedArray,
    container: list,
    storedProducts,
  });
};

const enterBtn = (event) => {
  if (event.key === "Enter") {
    button.click();
  }
};

const initCart = ({ cartCount, storedProducts }) => {
  cartCount.textContent = storedProducts.length;
};

const init = () => {
  const storedProducts = JSON.parse(localStorage.getItem("cartStorage")) ?? [];

  initCart({ cartCount, storedProducts });

  shoppingCartButton.addEventListener("click", () => {
    console.log("local", storedProducts);
  });

  button.addEventListener("click", () => {
    onAdd({
      products,
      inputTitle,
      inputDescription,
      inputPrice,
      container: list,
      inputCount,
      storedProducts,
    });
  });

  document.addEventListener("keydown", enterBtn);
  createUl({ products, container: list, storedProducts });

  btnAscending.addEventListener("click", () => {
    sortAscending({ storedProducts });
  });

  btnDescending.addEventListener("click", () => {
    sortDescending({ storedProducts });
  });
};

init();
