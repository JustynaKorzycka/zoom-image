export class Products{
  constructor(src) {
    this.src = src;
    this.ifZoom = false;
    this.productsData;
  }

  async getProducts() {
    try {
      let response = await fetch(this.src);
      let parseRes = await response.json();
      this.productsData = await parseRes;
    } catch (e) {
      console.log(e)
    }
  }

  createProducts() {
    const productsSec = document.querySelector('.products-section');
    this.productsData.forEach(product => {
      const newProduct = document.createElement('div');
      newProduct.classList.add('card');
      newProduct.innerHTML = `<div class='card-img-top'><div class='box-image' style='background-image:url("./img${product.src}")'></div></div>
      <div class="card-body">
        <p class="card-text">${product.desc} <span>${product.price}</span></p>
      </div> `;
      productsSec.appendChild(newProduct);
    })
  }
  
  clickOnImage(e) {
    this.ifZoom = !this.ifZoom;
    e.target.classList.toggle('zoom');
    if (!this.ifZoom) {
       e.target.style.backgroundPosition = `50% 50%`;
    }
  }

  changePositionOfImage(e) {
    if (this.ifZoom) {
      let x = e.offsetX;
      let y = e.offsetY;
      this.style.backgroundPositionX = `${-x}px`;
      this.style.backgroundPositionX = `${-y}px`;


    }
  }
  exitFromZoom(e) {
    e.target.classList.remove('zoom');
    this.ifZoom = false;
    e.target.style.backgroundPosition = `0px 0px`;
  }
  addZoom() {
    const images = [...document.querySelectorAll('.box-image')];
    images.forEach(image => {
      image.addEventListener('click', this.clickOnImage);
      image.addEventListener('mousemove', this.changePositionOfImage);
      image.addEventListener('mouseout', this.exitFromZoom);
    })
  }



  generateProducts() {
    this.getProducts()
      .then(() => this.createProducts())
      .then(()=>this.addZoom())
  }
}