const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express()

let port = process.env.PORT || 3010
let smtp_login = process.env.LOGIN || "---"
let smtp_password = process.env.PASSWORD || "---"

console.log(smtp_login)

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 25,
    auth: {
        user: smtp_login,
        pass: smtp_password,
    }, tls: {
        rejectUnauthorized: false
    }
});


app.post('/sendMessage', async (req, res) => {

    let {name, email, subject, message} = req.body

    let info = await transporter.sendMail({
        from: 'My portfolio page',
        to: "gorelic2000p@gmail.com",
        subject: "Message from your PORTFOLIO",
        html: `<div> name: ${name} </div>
<div>email: ${email}</div>
 <div>subject: ${subject}</div> 
 <div>message: ${message}</div>   `,
    });

    res.send("working fine")
})

app.get('/sendMessage', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})