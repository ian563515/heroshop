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
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        document.getElementById("user-name").innerText = `歡迎, ${user.name}`;
        document.getElementById("logout").style.display = "block";
    }

    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("user");
        alert("已登出");
        window.location.reload();
    });
});
