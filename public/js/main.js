

  document.addEventListener("DOMContentLoaded", function () {
    const cardapioLink = document.querySelector(".ul");
    cardapioLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior
      scrollToDonutCards();
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

  //criar donut
  const coberturaCheckboxes = document.querySelectorAll('input[name="cobertura"]');
  const recheioCheckboxes = document.querySelectorAll('input[name="recheio"]');
  const quantityInput = document.querySelector('.quantity');
  const totalPriceSpan = document.getElementById('totalPrice');

  coberturaCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateTotalPrice);
  });

  recheioCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateTotalPrice);
  });

  quantityInput.addEventListener('input', updateTotalPrice);

  
  function updateTotalPrice() {
    let price = 5; // Base price for 1 cobertura and 1 recheio

    // Count selected checkboxes for cobertura and recheio
    const selectedCoberturas = Array.from(coberturaCheckboxes).filter(checkbox => checkbox.checked).length;
    const selectedRecheios = Array.from(recheioCheckboxes).filter(checkbox => checkbox.checked).length;

    // Add extra price for additional coberturas and recheios
    if (selectedCoberturas > 1) {
      price += (selectedCoberturas - 1) * 2.5;
    }

    if (selectedRecheios > 1) {
      price += (selectedRecheios - 1) * 2.5;
    }

    // Update total price display
    totalPriceSpan.textContent = price.toFixed(2);
  }

  //cart
  window.addEventListener('scroll', function () {
  const cartSidebar = document.querySelector('.cart-sidebar');
  const cardapioDiv = document.querySelector('.cardapio');
  const cardapioRect = cardapioDiv.getBoundingClientRect();
  
  if (cardapioRect.top > 0) {
    cartSidebar.style.top = `${cardapioRect.top}px`;
  } else if (cardapioRect.bottom < window.innerHeight) {
    cartSidebar.style.top = `${cardapioRect.bottom - cartSidebar.offsetHeight}px`;
  } else {
    cartSidebar.style.top = `0px`;
  }
});

//rolar p cart
function scrollToCart() {
  const footerSection = document.querySelector('.cart-sidebar'); 
  footerSection.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {
  const phoneIcon = document.querySelector('.icon-carrinho');
  phoneIcon.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToFooter();
  });
});

//rolar p cardapio
function scrollToDonutCards() {
  const footerSection = document.querySelector('.cardapio'); 
  footerSection.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {
  const phoneIcon = document.querySelector('');
  phoneIcon.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToFooter();
  });
});



//brir carrinho




// Seleciona todos os botões de adicionar ao carrinho no cardápio
const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
const cartToSidebar = document.querySelector('.cart-sidebar .items-list');
const emptyCartMessage = document.querySelector('.empty-cart-message');

// Função para adicionar o item ao carrinho
function addToCart(event) {
  // Remove a mensagem de carrinho vazio, se existir
  if (emptyCartMessage) {
    emptyCartMessage.style.display = 'none';
  }

  const button = event.currentTarget;

  // Captura os dados do item (nome, preço, imagem)
  const itemName = button.getAttribute('data-name');
  const itemPrice = button.getAttribute('data-price');
  const itemImg = button.getAttribute('data-img');

  // Verifica se o item já existe no carrinho
  const existingCartItem = cartToSidebar.querySelector(`.cart-items[data-name="${itemName}"]`);

  if (existingCartItem) {
    // Se o item já existe, aumenta a quantidade
    const quantityInput = existingCartItem.querySelector('.quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
  } else {
    // Se o item não existe, cria um novo
    const cartItemHTML = `
      <div class="cart-items" data-name="${itemName}">
        <div>
          <img class="img-item" src="${itemImg}" alt="${itemName}" />
        </div>
        <div class="info-item">
          <h4 class="info-title">${itemName}</h4>
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

    // Adiciona o novo item ao final da lista de itens no carrinho
    cartToSidebar.insertAdjacentHTML('beforeend', cartItemHTML);

    // Adiciona eventos de clique para os botões de incrementar/decrementar
    const newCartItem = cartToSidebar.querySelector(`.cart-items[data-name="${itemName}"]`);
    newCartItem.querySelector('.btn-decrement').addEventListener('click', () => handleQuantityChange(newCartItem, -1));
    newCartItem.querySelector('.btn-increment').addEventListener('click', () => handleQuantityChange(newCartItem, 1));
  }
}

// Adiciona o evento de clique em todos os botões "Adicionar ao Carrinho"
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// Função para manipular a mudança de quantidade
function handleQuantityChange(cartItem, change) {
  const quantityInput = cartItem.querySelector('.quantity');
  let quantity = parseInt(quantityInput.value, 10);

  quantity += change;

  if (quantity <= 0) {
    // Remove o item do carrinho se a quantidade for menor ou igual a 0
    cartItem.remove();
  } else {
    quantityInput.value = quantity;
  }

  // Verifica se o carrinho está vazio e exibe a mensagem se necessário
  updateEmptyCartMessage();
}

// Função para atualizar a mensagem de carrinho vazio
function updateEmptyCartMessage() {
  if (cartToSidebar.children.length === 0) {
    emptyCartMessage.style.display = 'block';
  } else {
    emptyCartMessage.style.display = 'none';
  }
}

