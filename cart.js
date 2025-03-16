document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout");
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            let itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <p>${item.name} - $${item.price} x ${item.quantity}</p>
                <button class="remove" data-index="${index}">移除</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });
        
        totalPriceElement.textContent = `$${total}`;
    }

    cartItemsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove")) {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        }
    });

    checkoutButton.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("購物車是空的！");
            return;
        }
        
        let orderData = { items: cart, total: totalPriceElement.textContent };
        localStorage.setItem("order", JSON.stringify(orderData));
        window.location.href = "checkout.html";
    });
    
    updateCartDisplay();
});
