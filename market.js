document.addEventListener('DOMContentLoaded', function() {
  const marketForm = document.getElementById('marketForm');
  const marketContainer = document.getElementById('marketContainer');
  let products = JSON.parse(localStorage.getItem('marketProducts')) || [];

  function displayProducts() {
    marketContainer.innerHTML = '';
    products.forEach(prod => {
      const prodDiv = document.createElement('div');
      prodDiv.className = 'product';
      prodDiv.innerHTML = `
        <img src="${prod.image}" alt="Produto">
        <h3>${prod.name}</h3>
        <p>Preço: ${prod.price}</p>
        <p>Pagamento: ${prod.paymentMethod === 'pix' ? 'Chave Pix' : 'Pagamento no local'}</p>
      `;
      marketContainer.appendChild(prodDiv);
    });
  }
  displayProducts();

  if (marketForm) {
    marketForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const imageInput = document.getElementById('productImage');
      const name = document.getElementById('productName').value;
      const price = document.getElementById('productPrice').value;
      const paymentMethod = document.getElementById('paymentMethod').value;
      const file = imageInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          const imageData = evt.target.result;
          const newProduct = {
            image: imageData,
            name,
            price,
            paymentMethod
          };
          products.push(newProduct);
          localStorage.setItem('marketProducts', JSON.stringify(products));
          displayProducts();
          marketForm.reset();
        }
        reader.readAsDataURL(file);
      }
    });
  }
});
