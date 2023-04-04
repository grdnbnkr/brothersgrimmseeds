// Function to create a product card
function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('product-card');

  const img = document.createElement('img');
  img.src = product.image_path;
  img.alt = product.name;

  const title = document.createElement('h2');
  title.textContent = product.name;

  const description = document.createElement('p');
  description.textContent = product.description;

  const addToCartButton = document.createElement('button');
  addToCartButton.classList.add('add-to-cart');
  addToCartButton.dataset.productId = product.id;
  addToCartButton.textContent = 'Add to Cart';

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(addToCartButton);

  return card;
}

// Function to load products from the CSV file
async function loadProducts() {
  const response = await fetch('data/products.csv');

  if (!response.ok || !response.headers.get('content-type').includes('text/csv')) {
    console.error('Error: CSV file not found or not in the correct format.');
    return [];
  }

  const csvData = await response.text();
  const products = [];

  const lines = csvData.split('\n');
  lines.shift(); // Remove header line

  for (const line of lines) {
    if (!line.trim()) continue;

    const [id, name, description, image_path] = line.split(',');
    products.push({ id, name, description, image_path });
  }

  return products;
}


document.addEventListener('DOMContentLoaded', async () => {
  const productsGrid = document.querySelector('.products-grid');

  try {
    const products = await loadProducts();

    for (const product of products) {
      const productCard = createProductCard(product);
      productsGrid.appendChild(productCard);
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const productId = event.target.dataset.productId;
        // Your Shopify add-to-cart logic goes here
        console.log(`Add to cart clicked for product ID: ${productId}`);
      });
    });
  } catch (error) {
    console.error(error.message);
  }
});
