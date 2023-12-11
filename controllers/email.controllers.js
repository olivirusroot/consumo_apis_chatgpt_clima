import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import dotenv from 'dotenv'
dotenv.config();

const emailDomain = process.env.DOMAIN
const emailApi = process.env.API_KEY

const auth = {
    auth: {    
        api_key: emailApi,
        domain: emailDomain
      }
}
const transporter = nodemailer.createTransport(mg(auth));

export const sendMail = async (request, response) => {

  // Obtener datos del body
  const {from, to, subject, text} = request.body;

  // Opciones de email
  const mailOptions = {
    from,
    to,
    subject,    
    text
  };

  try {
    // Enviar email
    await transporter.sendMail(mailOptions);

    // Responder éxito    
    response.json({
      message: 'Email enviado'
    });

  } catch (error) {
    // Responder error
    response.status(500).json({
      error: error.message
    }); 
  }

};