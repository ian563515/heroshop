document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".product button").forEach(button => {
        button.addEventListener("click", function () {
            let productElement = this.closest(".product");
            let name = productElement.querySelector("h3").innerText;
            let price = parseInt(productElement.querySelector("p").innerText.replace("NT$ ", "").replace(",", ""));
            let id = name; // 這裡用名稱當作 id，確保唯一

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let existingProduct = cart.find(item => item.id === id);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${name} 已加入購物車！`);
        });
    });
});

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
