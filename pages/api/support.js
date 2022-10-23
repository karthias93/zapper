import { apiHandler } from "../../utils/helpers/api";
import nodemailer from "nodemailer";

const support = async (req, res) => {
    const { email, subject, message } = req.body;
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: process.env.mailUsername,
            pass: process.env.mailPassword,
        },
        secure: true,
    });
    const mailData = {
        from: email,
        to: process.env.mailUsername,
        subject: subject,
        text: message,
        html: `<div>
                <p>From: ${email}</p>
                <p>${message}</p>
        </div>`
    };
    transporter.sendMail(mailData, function (err, info) {
        if(err) {
            console.log(err)
            throw 'Something went wrong';
        } else {
            console.log(info)
            res.status(200).end();
        }
    });
};

export default apiHandler({
    post: support
});
