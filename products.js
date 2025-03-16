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