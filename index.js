const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const port = 3010

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 25,
    auth: {
        user: "gorelovapoll@gmail.com", // generated ethereal user
        pass: "fegtdidxthvrdgen", // generated ethereal password
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
})