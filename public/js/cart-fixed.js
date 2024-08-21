document.addEventListener('DOMContentLoaded', function () {
  const cartSidebar = document.querySelector('.cart-sidebar');
  const bagDiv = document.querySelector('.bag-div');
  
  // Função para alternar a visibilidade da sidebar do carrinho
  function toggleCartSidebar() {
    cartSidebar.style.display = cartSidebar.style.display === 'block' ? 'none' : 'block';
  }
  
  // Função para ajustar a posição do cart-sidebar e bag-div
  function adjustPosition() {
    const cardapioDiv = document.querySelector('.cardapio');
    const cardapioRect = cardapioDiv.getBoundingClientRect();
    
    // Ajusta a posição do cart-sidebar
    if (cardapioRect.top > 0) {
      cartSidebar.style.top = `${cardapioRect.top}px`;
    } else if (cardapioRect.bottom < window.innerHeight) {
      cartSidebar.style.top = `${cardapioRect.bottom - cartSidebar.offsetHeight}px`;
    } else {
      cartSidebar.style.top = `0px`;
    }
    
    // Ajusta a posição da bag-div
    if (cardapioRect.top > 0) {
      bagDiv.style.top = `${cardapioRect.top}px`;
    } else if (cardapioRect.bottom < window.innerHeight) {
      bagDiv.style.top = `${cardapioRect.bottom - bagDiv.offsetHeight}px`;
    } else {
      bagDiv.style.top = `0px`;
    }
  }

  // Adiciona a função ao escopo global
  window.toggleCartSidebar = toggleCartSidebar;

  // Ajusta a posição ao carregar a página e ao rolar
  window.addEventListener('scroll', adjustPosition);
  window.addEventListener('resize', adjustPosition); // Ajusta também no redimensionamento da janela
  adjustPosition(); // Chama a função para definir a posição inicial
});
