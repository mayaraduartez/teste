document.addEventListener('DOMContentLoaded', function () {
  const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
  const cartSidebar = document.querySelector('.cart-sidebar');
  const cartToSidebar = document.querySelector('.cart-sidebar .items-list');
  const emptyCartMessage = document.querySelector('.empty-cart-message');
  
  // Função para verificar se o carrinho está vazio
  function updateEmptyCartMessage() {
    const hasItems = cartToSidebar.querySelector('.cart-items');
    if (!hasItems) {
      emptyCartMessage.style.display = 'block';
    } else {
      emptyCartMessage.style.display = 'none';
    }
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
      updateEmptyCartMessage();
      updateTotal();
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


//rola para footer
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
  const scrollLinks = document.querySelectorAll('.scroll-to-cardapio');
  const cardapioDiv = document.querySelector('.cardapio');

  function scrollToCardapio(event) {
    event.preventDefault(); 
    cardapioDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  scrollLinks.forEach(function (link) {
    link.addEventListener('click', scrollToCardapio);
  });
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


//filtro do menu
document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-options li');
  const cards = document.querySelectorAll('.donut-card');

  menuItems.forEach(function(menuItem) {
    menuItem.addEventListener('click', function() {
      const selectedCategory = this.getAttribute('data-category');

 
      menuItems.forEach(function(item) {
        item.classList.remove('active');
      });


      this.classList.add('active');


      cards.forEach(function(card) {
        if (selectedCategory === 'all' || card.classList.contains(selectedCategory)) {
          card.classList.remove('hidden'); 
        } else {
          card.classList.add('hidden'); 
        }
      });
    });
  });
});

//img perfil
function loadFile(event) {
  const image = document.getElementById('profileImage');
  image.src = URL.createObjectURL(event.target.files[0]);
}