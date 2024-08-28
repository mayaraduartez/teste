document.addEventListener('DOMContentLoaded', function () {
  // Elementos de seleção
  const coberturaCheckboxes = document.querySelectorAll('input[name="cobertura"]');
  const recheioCheckboxes = document.querySelectorAll('input[name="recheio"]');
  const quantityInput = document.querySelector('.quantity-create');
  const totalPriceSpan = document.querySelector('#totalPrice');
  const addToCartButton = document.querySelector('.btn-form');
  const cartSidebar = document.querySelector('.cart-sidebar .items-list');
  const emptyCartMessage = document.querySelector('.empty-cart-message');
  const cartContainer = document.querySelector('.cart-sidebar');

  const decrementButton = document.querySelector('.btn-decrement-create');
  const incrementButton = document.querySelector('.btn-increment-create');

  function updateEmptyCartMessage() {
    const hasItems = cartSidebar.querySelector('.cart-items');
    emptyCartMessage.style.display = hasItems ? 'none' : 'block';
  }

  function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  
  function updateTotalPrice() {
    let basePrice = 5; // Preço base para 1 cobertura e 1 recheio
    let price = basePrice;

    // Adiciona preço extra para coberturas adicionais (acima de 1)
    const selectedCoberturas = Array.from(coberturaCheckboxes).filter(checkbox => checkbox.checked);
    if (selectedCoberturas.length > 1) {
      price += (selectedCoberturas.length - 1) * 1; // R$ 1 para cada cobertura extra
    }

    // Adiciona preço extra para recheios adicionais (acima de 1)
    const selectedRecheios = Array.from(recheioCheckboxes).filter(checkbox => checkbox.checked);
    if (selectedRecheios.length > 1) {
      price += (selectedRecheios.length - 1) * 2; // R$ 2 para cada recheio extra
    }

    // Multiplica pelo valor da quantidade
    price *= parseInt(quantityInput.value, 10);

    // Atualiza a exibição do preço total
    totalPriceSpan.textContent = `R$ ${price.toFixed(2)}`;
  }

  // Event listener para o botão de decremento no formulário
  decrementButton.addEventListener('click', () => {
    let currentQuantity = parseInt(quantityInput.value, 10);
    if (currentQuantity > 1) {
      quantityInput.value = currentQuantity - 1;
      updateTotalPrice();
    }
  });

  // Event listener para o botão de incremento no formulário
  incrementButton.addEventListener('click', () => {
    let currentQuantity = parseInt(quantityInput.value, 10);
    quantityInput.value = currentQuantity + 1;
    updateTotalPrice();
  });

  // Inicializar o preço total na primeira vez
  updateTotalPrice();

  // Adicionar os event listeners para atualizar o preço total conforme as seleções
  coberturaCheckboxes.forEach(checkbox => checkbox.addEventListener('change', updateTotalPrice));
  recheioCheckboxes.forEach(checkbox => checkbox.addEventListener('change', updateTotalPrice));
  quantityInput.addEventListener('input', updateTotalPrice);

  // Função para adicionar o donut personalizado ao carrinho
  function addToCart(event) {
    event.preventDefault();

    // Validação: verificar se ao menos uma cobertura e um recheio foram selecionados
    const coberturaSelected = Array.from(coberturaCheckboxes).some(checkbox => checkbox.checked);
    const recheioSelected = Array.from(recheioCheckboxes).some(checkbox => checkbox.checked);

    if (!coberturaSelected || !recheioSelected) {
      alert('Por favor, selecione pelo menos uma cobertura e um recheio.');
      return;
    }

    // Coleta as seleções de cobertura, recheio e quantidade
    const selectedCobertura = Array.from(coberturaCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value)
      .join(', ');
    const selectedRecheio = Array.from(recheioCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value)
      .join(', ');
    const quantity = parseInt(quantityInput.value, 10);

    // Define as informações do item
    const itemName = 'Donut Personalizado';
    const itemDescription = `Cobertura: ${selectedCobertura} | Recheio: ${selectedRecheio}`;
    const itemPrice = totalPriceSpan.textContent;
    const itemId = generateUniqueId();
    const itemImg = 'img/donut-form.png';

    // Adiciona o item ao HTML do carrinho
    const cartItemHTML = `
      <div class="cart-items" data-name="${itemName}" data-price="${itemPrice}" data-id="${itemId}">
        <div>
          <img class="img-item" src="${itemImg}" alt="${itemName}" />
        </div>
        <div class="info-item">
          <h4 class="info-title">${itemName}</h4>
          <p class="info-description">${itemDescription}</p>
          <div class="donut-quantity">
            <div class="quantity-controls">
              <button class="btn-quantity btn-decrement">-</button>
              <input type="text" class="quantity" value="${quantity}" readonly />
              <button class="btn-quantity btn-increment">+</button>
            </div>
            <h4 class="info-title-preco">R$: ${itemPrice}</h4>
          </div>
        </div>
      </div>
    `;

    // Insere o novo item no carrinho
    cartSidebar.insertAdjacentHTML('beforeend', cartItemHTML);

    // Atualiza o carrinho e adiciona os event listeners para os botões de incremento e decremento
    const newCartItem = cartSidebar.querySelector(`.cart-items[data-id="${itemId}"]`);
    const decrementButton = newCartItem.querySelector('.btn-decrement');
    const incrementButton = newCartItem.querySelector('.btn-increment');

    if (decrementButton && incrementButton) {
      decrementButton.addEventListener('click', () => decrementQuantity(newCartItem));
      incrementButton.addEventListener('click', () => incrementQuantity(newCartItem));
    }

    // Exibe o carrinho apenas se for o primeiro item adicionado
    if (cartSidebar.querySelectorAll('.cart-items').length === 1) {
      cartContainer.style.display = 'block'; // Ajuste o estilo de exibição
    }

    updateEmptyCartMessage();
    updateTotal();
  }

  // Função para incrementar a quantidade no carrinho
  function incrementQuantity(cartItem) {
    const quantityInput = cartItem.querySelector('.quantity');
    let quantity = parseInt(quantityInput.value, 10);
    quantityInput.value = quantity + 1;
    updateTotal();
  }

  // Função para decrementar a quantidade no carrinho
  function decrementQuantity(cartItem) {
    const quantityInput = cartItem.querySelector('.quantity');
    let quantity = parseInt(quantityInput.value, 10);
    if (quantity > 1) {
      quantityInput.value = quantity - 1;
    } else {
      cartItem.remove();
      updateEmptyCartMessage();
    }
    updateTotal();
  }

  // Event listener para o botão "Adicionar no carrinho"
  addToCartButton.addEventListener('click', addToCart);

  // Inicializar o preço total e a mensagem de carrinho vazio
  updateTotalPrice();
  updateEmptyCartMessage();
});
