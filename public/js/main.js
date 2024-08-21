document.addEventListener('DOMContentLoaded', function () {
  const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
  const cartSidebar = document.querySelector('.cart-sidebar');
  const cartToSidebar = document.querySelector('.cart-sidebar .items-list');
  const emptyCartMessage = document.querySelector('.empty-cart-message');
  const totalDisplay = document.querySelector('.cart-footer h4:last-child');
  
  // Função para verificar se o carrinho está vazio
  function updateEmptyCartMessage() {
    const hasItems = cartToSidebar.querySelector('.cart-items');
    if (!hasItems) {
      emptyCartMessage.style.display = 'block';
    } else {
      emptyCartMessage.style.display = 'none';
    }
  }

  // Função para atualizar o total
  function updateTotal() {
    let total = 0;
    const cartItems = cartToSidebar.querySelectorAll('.cart-items');
    
    cartItems.forEach(item => {
      const price = parseFloat(item.getAttribute('data-price'));
      const quantity = parseInt(item.querySelector('.quantity').value, 10);
      total += price * quantity;
    });
    
    totalDisplay.textContent = `R$ ${total.toFixed(2)}`;
  }

  // Função para incrementar a quantidade
  function incrementQuantity(cartItem) {
    const quantityInput = cartItem.querySelector('.quantity');
    if (quantityInput) {
      let quantity = parseInt(quantityInput.value, 10);
      quantityInput.value = quantity + 1;
      updateTotal();
    }
  }

  // Função para decrementar a quantidade
  function decrementQuantity(cartItem) {
    const quantityInput = cartItem.querySelector('.quantity');
    if (quantityInput) {
      let quantity = parseInt(quantityInput.value, 10);
      quantity -= 1;

      if (quantity <= 0) {
        cartItem.remove();
        const itemName = cartItem.getAttribute('data-name');
        const itemId = cartItem.getAttribute('data-id');
        removeAddedMessage(itemId);
      } else {
        quantityInput.value = quantity;
      }

      updateTotal();
      updateEmptyCartMessage();
    }
  }

  // Função para adicionar o item ao carrinho
  function addToCart(event) {
    const button = event.currentTarget;
    const itemId = button.getAttribute('data-id');
    const itemName = button.getAttribute('data-name');
    const itemPrice = button.getAttribute('data-price');
    const itemImg = button.getAttribute('data-img');
    const itemDescription = button.getAttribute('data-description');
    const donutCard = button.closest('.donut-card');
    const addedMessage = donutCard.querySelector('.added-message');

    const existingCartItem = cartToSidebar.querySelector(`.cart-items[data-name="${itemName}"]`);

    if (existingCartItem) {
      incrementQuantity(existingCartItem);
    } else {
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
                <input type="text" class="quantity" value="1" readonly />
                <button class="btn-quantity btn-increment">+</button>
              </div>
              <h4 class="info-title-preco">R$: ${itemPrice}</h4>
            </div>
          </div>
        </div>
      `;

      cartToSidebar.insertAdjacentHTML('beforeend', cartItemHTML);

      const newCartItem = cartToSidebar.querySelector(`.cart-items[data-name="${itemName}"]`);
      const decrementButton = newCartItem.querySelector('.btn-decrement');
      const incrementButton = newCartItem.querySelector('.btn-increment');

      if (decrementButton && incrementButton) {
        decrementButton.addEventListener('click', () => decrementQuantity(newCartItem));
        incrementButton.addEventListener('click', () => incrementQuantity(newCartItem));
      }

      // Exibe o carrinho apenas se for o primeiro item adicionado
      if (cartToSidebar.querySelectorAll('.cart-items').length === 1) {
        cartSidebar.style.display = 'block';
      }
    }

    // Exibe a mensagem "Item adicionado ao carrinho"
    if (addedMessage) {
      addedMessage.style.display = 'block';
    }

    updateEmptyCartMessage();
    updateTotal();
  }

  // Função para remover a mensagem "Item adicionado ao carrinho"
  function removeAddedMessage(itemId) {
    const donutCard = document.querySelector(`.donut-card[data-id="${itemId}"]`);
    const addedMessage = donutCard ? donutCard.querySelector('.added-message') : null;
    if (addedMessage) {
      addedMessage.style.display = 'none';
    }
  }

  // Adiciona os event listeners aos botões de adicionar ao carrinho
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });

  // Verifica se o carrinho está vazio ao carregar a página
  updateEmptyCartMessage();
});



function scrollToFooter() {
  const footerSection = document.querySelector('footer');
  footerSection.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {
  const phoneIcon = document.querySelector('.icon-phone');
  phoneIcon.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToFooter();
  });
});

 //// Selecionar o elemento do rodapé
 function scrollToFooter() {
  const footerSection = document.querySelector('footer'); 
  footerSection.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {
  const phoneIcon = document.querySelector('.icon-phone');
  phoneIcon.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToFooter();
  });
});

//rolar para a bag
function scrollToCart() {
  const footerSection = document.querySelector('.bag'); 
  footerSection.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {
  const phoneIcon = document.querySelector('.icon-carrinho');
  phoneIcon.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToFooter();
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const phoneIcon = document.querySelector('.icon-carrinho');
  phoneIcon.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToFooter();
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const scrollLink = document.getElementById('scroll-to-cardapio');
  const cardapioDiv = document.querySelector('.cardapio');

  // Função para rolar até a div cardapio
  function scrollToCardapio(event) {
    event.preventDefault(); // Impede o comportamento padrão do link
    cardapioDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Adiciona o evento de clique ao link
  scrollLink.addEventListener('click', scrollToCardapio);
});

document.addEventListener('DOMContentLoaded', function () {
  const scrollLink = document.getElementById('scroll-to-create-donut');
  const cardapioDiv = document.querySelector('.form');

  // Função para rolar até a div cardapio
  function scrollToCardapio(event) {
    event.preventDefault(); // Impede o comportamento padrão do link
    cardapioDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Adiciona o evento de clique ao link
  scrollLink.addEventListener('click', scrollToCardapio);
});

