function handleCredentialResponse(response) {
    let data = jwt_decode(response.credential);
    console.log("使用者資訊：", data);

    // 把用戶資訊存入 localStorage
    localStorage.setItem("user", JSON.stringify({
        name: data.name,
        email: data.email,
        picture: data.picture
    }));

    alert(`歡迎, ${data.name}！`);
    window.location.href = "home.html"; // 登入成功後跳轉
}

// Google API 需要解碼 JWT
function loadGoogleLogin() {
    let script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jwt-decode/3.1.2/jwt-decode.min.js";
    document.head.appendChild(script);
}
loadGoogleLogin();
