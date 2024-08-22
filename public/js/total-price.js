document.addEventListener('DOMContentLoaded', function(){
    const totalDisplay = document.querySelector('.cart-footer h4:last-child');
  
    // Função para atualizar o total
    function updateTotal() {
      let total = 0;
      const cartItems = document.querySelectorAll('.cart-sidebar .cart-items');
  
      cartItems.forEach(item => {
        const price = parseFloat(item.getAttribute('data-price').replace('R$', '').replace(',', '.'));
        const quantity = parseInt(item.querySelector('.quantity').value, 10);
        total += price * quantity;
      });
  
      totalDisplay.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
  
    // Torna a função disponível globalmente
    window.updateTotal = updateTotal;
  
    // Chama a função inicialmente para calcular o total no carregamento da página
    updateTotal();
  });
  