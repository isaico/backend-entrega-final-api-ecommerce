import { createTransport } from 'nodemailer';

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.NODEMAILER_GMAIL_ADRESS,
        pass: process.env.NODEMAILER_GMAIL_PASS,
    },
});

export const sendMailGmail = async (mailOptions) => {
    try {
        const response = await transporter.sendMail(mailOptions);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
/* --------------------------- MAILOPTIONS EXAMPLE -------------------------- */
// const mailOptions = {
//     from: process.env.USER,
//     to: [process.env.GMAIL, process.env.EMAIL],
//     subject: "Titulo del correo",
//     // text: "Este es el texto del email",
//     html: "<h1>Texto enviado desde nodemailer </h1>",
//     // attachments: [
//     //   {
//     //     path: "debug.log",
//     //     filename: "loggers-debug",
//     //   },
//     // ],
//   };
