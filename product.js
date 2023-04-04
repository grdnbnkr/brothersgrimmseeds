const productId = new URLSearchParams(window.location.search).get("id");
const productContainer = document.getElementById("product");

fetch("products.csv")
  .then((response) => response.text())
  .then((csvData) => {
    const products = parseCSV(csvData);
    const product = products.find((item) => item.id === productId);

    if (product) {
      productContainer.innerHTML = `
        <div class="product-details">
          <img src="${product.image_path}" alt="${product.name}" />
          <h1>${product.name}</h1>
          <p>${product.description}</p>
          <button class="add-to-cart" data-product-id="${product.id}">Add to cart</button>
        </div>
      `;
    } else {
      productContainer.innerHTML = "<p>Product not found.</p>";
    }
  });

function parseCSV(csvData) {
  const rows = csvData.trim().split("\n");
  const header = rows[0].split(",");
  const products = [];

  for (let i = 1; i < rows.length; i++) {
    const rowData = rows[i].split(",");
    const product = {};

    for (let j = 0; j < rowData.length; j++) {
      product[header[j]] = rowData[j];
    }

    products.push(product);
  }

  return products;
}
