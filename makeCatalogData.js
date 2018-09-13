const CATALOG_SIZE = 90;
const CATALOG_ITEMS = ['Electronics', 'Book', 'Food', 'Clothing'];

const chooseCatalogItem = (catalog) => CATALOG_ITEMS[Math.floor(Math.random() * catalog.length)];
const randomPrice = () => (Math.random() * 500).toFixed(2);

const createCatalog = (size) => {
  let catalog = [];

  for (let i = 1; i <= size; i++) {
    catalog.push({
      ProductId: i,
      Type: chooseCatalogItem(CATALOG_ITEMS),
      Price: randomPrice(),
    });
  }
  return catalog;
};

// console.log(createCatalog(CATALOG_SIZE));