let cart = [];

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const clearCartButton = document.getElementById('clear-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');

        addToCart(productName, productPrice);
    });
});

function addToCart(name, price) {
    const existingProduct = cart.find(item => item.name === name);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    updateCart();
}

function updateCart() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} (x${item.quantity}) - $${item.price * item.quantity}</p>
                <button class="remove-item" data-name="${item.name}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                removeFromCart(button.getAttribute('data-name'));
            });
        });
    }

    cartCount.textContent = cart.length;
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

clearCartButton.addEventListener('click', () => {
    cart = [];
    updateCart();
});
