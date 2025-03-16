document.addEventListener("DOMContentLoaded", function () {
    const orderDetailsContainer = document.getElementById("order-details");
    const payNowButton = document.getElementById("pay-now");
    
    let order = JSON.parse(localStorage.getItem("order"));
    
    if (!order || order.items.length === 0) {
        orderDetailsContainer.innerHTML = "<p>您的購物車是空的。</p>";
        payNowButton.style.display = "none";
        return;
    }
    
    let orderHTML = "<ul>";
    order.items.forEach(item => {
        orderHTML += `<li>${item.name} - $${item.price} x ${item.quantity}</li>`;
    });
    orderHTML += `</ul><h3>總計: ${order.total}</h3>`;
    orderDetailsContainer.innerHTML = orderHTML;
    
    payNowButton.addEventListener("click", function () {
        fetch("https://api.sumpay.com/pay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                order: order,
                callback_url: "https://yourwebsite.com/payment-success"
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.payment_url) {
                window.location.href = data.payment_url;
            } else {
                alert("支付失敗，請重試！");
            }
        })
        .catch(error => {
            console.error("錯誤:", error);
            alert("支付請求發生錯誤！");
        });
    });
});
