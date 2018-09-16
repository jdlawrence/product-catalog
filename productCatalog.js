document.addEventListener("DOMContentLoaded", function() {
  // this function runs when the DOM is ready, i.e. when the document has been parsed
  const allDataTableElem = document.querySelector('.pc__all-data-table');
  const examinedProduct = document.querySelector('.pc__examined-product-details');
  const productIdInput = document.querySelector('.pc__input-form');
  const similarProductsTableElem = document.querySelector('.pc__similar-products-table');

  productIdInput.addEventListener('submit', (e) => {
    e.preventDefault();
    displaySingleProduct(e.target[0].value);
  });

  const displaySingleProduct = (id) => {
    id = parseInt(id);
    displayExaminedProduct(id);

    api.searchProductsById(id).then(product => {
      Promise.all([
        api.searchProductsByPrice(product.price, 30),
        api.searchProductsByType(product.type),
      ]).then(result => {
        let sameTypeSimilarPrice = api.getIntersectionById(result[0], result[1]);

        // Remove the original result from the similar results
        sameTypeSimilarPrice = sameTypeSimilarPrice.filter(item => item.productId !== id);

        displaySimilarProducts(sameTypeSimilarPrice);
      });
    });
  };

  api.searchAllProducts().then(allProducts => {
    displayAllProducts(allProducts);
  });

  const appendProductsToTable = (tableElement, products) => {
    tableElement.innerHTML = `
    <th class="pc__table-item">ProductId</th>
    <th class="pc__table-item">Type</th>
    <th class="pc__table-item">Price</th>
    <th class="pc__table-item">Examine</th>
    `;
    products.forEach((datum) => {
      // Create a row
      let row = document.createElement('tr');

      // Create table data cells for the productId, type, and Price
      let productId = document.createElement('td');
      productId.classList.add('pc__table-item');
      productId.innerHTML = datum.productId;
      let type = document.createElement('td');
      type.classList.add('pc__table-item');
      type.innerHTML = datum.type;
      let price = document.createElement('td');
      price.classList.add('pc__table-item');
      price.innerHTML = datum.price;

      // Create a button, and attach data attributes and a listener on it
      let examineButton = document.createElement('button');
      examineButton.innerHTML = 'Examine';
      examineButton.setAttribute('data-prod-id', datum.productId);
      examineButton.addEventListener('click', (e) => {
        displaySingleProduct(e.target.dataset.prodId);
      });
      let examineButtonDiv = document.createElement('div');
      examineButtonDiv.classList.add('pc__examine-button');
      examineButtonDiv.appendChild(examineButton);

      row.appendChild(productId);
      row.appendChild(type);
      row.appendChild(price);
      row.appendChild(examineButtonDiv);

      tableElement.appendChild(row);
    });
  };

  const displayAllProducts = (productCatalog) => {
    appendProductsToTable(allDataTableElem, productCatalog);
  };

  // Display a product that has been clicked on
  const displayExaminedProduct = (productId) => {
    api.searchProductsById(productId).then(item => {
      examinedProduct.innerHTML = `
      <p class="pc__examined-product-detail">Product Id: ${item.productId}</p>
      <p class="pc__examined-product-detail">Price: ${item.price}</p>
      <p class="pc__examined-product-detail">Type: ${item.type}</p>
    `;
    });
  };

  const displaySimilarProducts = (similarProductsArr) => {
    appendProductsToTable(similarProductsTableElem, similarProductsArr);
  };
});
