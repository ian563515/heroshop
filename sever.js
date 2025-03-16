const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('1091100120384-p0vh7fa5o3e9adppgn2ogvcmmqi8g57u.apps.googleusercontent.com');

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '1091100120384-p0vh7fa5o3e9adppgn2ogvcmmqi8g57u.apps.googleusercontent.com',
    });
    const payload = ticket.getPayload();
    console.log(payload); // 這裡可以顯示用戶資料
    return payload; // 可以根據資料進行登入操作
}

app.post('/google-login', (req, res) => {
    const { token } = req.body;

    verify(token)
        .then(user => {
            // 在這裡處理用戶登入，生成 session 或 JWT token
            res.json({ message: '登入成功', user: user });
        })
        .catch((error) => {
            res.status(400).json({ error: '驗證失敗' });
        });
});
