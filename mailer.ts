import nodemailer from 'nodemailer';
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, //PAra seguridad utilizamos el puerto 465
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'francomorinaa@gmail.com', // generated ethereal user
        pass: 'yvuphiqlthbupwwr', // generated ethereal password
    },
});
transporter.verify().then(()=>{
    console.log('Listo para enviar mails');    
})