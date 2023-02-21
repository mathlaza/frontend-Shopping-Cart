const saveCartItems = (saved) => localStorage.setItem('cartItem', saved);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
