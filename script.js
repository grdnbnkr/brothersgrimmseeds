document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const productId = event.target.dataset.productId;
        // Your Shopify add-to-cart logic goes here
        console.log(`Add to cart clicked for product ID: ${productId}`);
      });
    });
  });
  