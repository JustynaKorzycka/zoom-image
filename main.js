let products = [];

const getProducts = async() => {
  try {
    let response = await fetch('./json-data/images.json')
    let parseRes = await response.json();
    return parseRes;
    
  } catch (e) {
    console.log(e)
  }
}

const createProducts = () => {
  const productsSec = document.querySelector('.products-section');
  products.forEach((product) => {
    const newProduct = document.createElement('div');
    newProduct.classList.add('card');
    newProduct.innerHTML = `<img src="./img${product.src}" class="card-img-top" alt="${product.title}"> 
    <div class="card-body">
      <p class="card-text">${product.desc} <span>${product.price}</span></p>
    </div> `;
    productsSec.appendChild(newProduct);
  })
}

getProducts()
  .then(res => products = res)
  .then(createProducts)