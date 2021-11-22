import { Products } from "./products.js";

const src = './json-data/images.json';
const newProducts = new Products(src);

newProducts.generateProducts();