const CATALOG_SIZE = 90;
const CATALOG_ITEMS = ['Electronics', 'Book', 'Food', 'Clothing'];
const MAX_PRICE = 500;

const chooseCatalogItem = (catalog) => catalog[Math.floor(Math.random() * catalog.length)];
const randomPrice = (maxPrice) => (Math.random() * maxPrice).toFixed(2);

const createRandomObject = (items, maxPrice) => ({
  type: chooseCatalogItem(items),
  price: randomPrice(maxPrice),
});

const createRandomCatalog = (size) => {
  let catalog = [];

  for (let i = 1; i <= size; i++) {
    let typeAndPriceObj = createRandomObject(CATALOG_ITEMS, MAX_PRICE);
    catalog.push({
      ...typeAndPriceObj,
      productId: i,
    });
  }
  return catalog;
};

const catalogData = createRandomCatalog(CATALOG_SIZE);

const api = {
  searchAllProducts() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(catalogData);
      }, Math.random() * 250);
    });
  },
  searchProductsById(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(catalogData[id - 1]);
      }, Math.random() * 250);
    });
  },
  searchProductsByType(type) {
    return new Promise(resolve => {
      setTimeout(() => {
        let result = catalogData.filter(datum => datum.type.toLowerCase() === type.toLowerCase());
        resolve(result);
      }, Math.random() * 250);
    });
  },
  searchProductsByPrice(singlePrice, percentDiff) {
    return new Promise(resolve => {
      setTimeout(() => {
        let result = catalogData.filter(datum =>
          Math.abs((singlePrice - parseInt(datum.price)) / singlePrice) * 100 < percentDiff);
        resolve(result);
      }, Math.random() * 250);
    });
  },
  getIntersectionById(list1, list2) {
    let list2Obj = list2.reduce((accum, nextProduct) => {
      let item = { [nextProduct.productId]: nextProduct.productId };
      return {...accum, ...item };
    }, {});

    return list1.filter(item => list2Obj[item.productId]);
  }
};