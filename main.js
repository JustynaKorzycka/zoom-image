let products = [];
let ifZoom = false;
let mouseX;
let mouseY;

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
    newProduct.innerHTML = `<div class='card-img-top'><div class='box-image' style='background-image:url("./img${product.src}")'></div></div>
    <div class="card-body">
      <p class="card-text">${product.desc} <span>${product.price}</span></p>
    </div> `;
    productsSec.appendChild(newProduct);
  })
}

const clickOnImage = (e) => {
  ifZoom = !ifZoom;
  e.target.classList.toggle('zoom');
  if (ifZoom) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  }
}
const changePositionOfImage = (e) => {
  if (ifZoom) {
    imgX = (e.clientX/2 - e.offsetX);
    imgY = (e.clientY/2 - e.offsetY);

    imgX < 0 ? imgX = 0 : imgX;
    imgY < 0 ? imgY = 0 : imgY;

    imgX > e.target.clientWidth/2  ? imgX = e.target.clientWidth/2 : imgX;
    imgY > e.target.clientHeight ? imgY = e.target.clientHeight : imgY;

     e.target.style.backgroundPosition = `${imgX}px ${imgY}px`;
  }

}
const exitFromZoom = (e) => {
  e.target.classList.remove('zoom');
  ifZoom = false;
  e.target.style.backgroundPosition = `50% 50%`;
}

const addZoom = () => {
  const images = [...document.querySelectorAll('.box-image')];
  images.forEach(image => {
    image.addEventListener('click', clickOnImage);
    image.addEventListener('mousemove', changePositionOfImage);
    image.addEventListener('mouseout', exitFromZoom)
  })
}

getProducts()
  .then(res => products = res)
  .then(createProducts)
  .then(addZoom)