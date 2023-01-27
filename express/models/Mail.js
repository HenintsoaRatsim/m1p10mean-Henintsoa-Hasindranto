const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "ratsimhenintsoa@gmail.com",
        pass: "xlsclgwihipvlcrl"
    },
    tls: {
        rejectUnauthorized: false
    }
});

const options = {
    from: "ratsimhenintsoa@gmail.com",
    to: "ratsimhenintsoa@gmail.com",
    subject: "efa vita reparation ilay fiara azafady",
    text: "alaivo aaaaah"
}

const SendMail = async function SendMail(AdressEmail, sujet, Message) {
    let messageAddSignature = Message + " \n--------------------------------------\n Garage mada \n conact :0380312356 \n" +
        "mail: gara.mada@gara.auto";
    transporter.sendMail({
        from: "garagemada@gg.auto",
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