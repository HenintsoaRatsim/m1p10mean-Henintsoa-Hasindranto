const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "ratsimhenintsoa@gmail.com",
        pass: "vverzxojmyjibjil"
    },
    tls: {
        rejectUnauthorized: false
    }
});

const SendMail = async function SendMail(AdressEmail, sujet, Message) {
    let messageAddSignature = Message + " \n\n\n--------------------------------------\n GARAGE MADA \n conact :0340000002 \n" +
        " mail: garage.mada@gg.auto";
    transporter.sendMail({
        from: "garage.mada@gg.auto",
        to: AdressEmail,
        subject: sujet,
        text: messageAddSignature
    }, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}




module.exports = {
    SendMail
}
// function SendMail(){

// }