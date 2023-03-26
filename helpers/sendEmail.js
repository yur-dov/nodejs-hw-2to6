const sgMail = require('@sendgrid/mail');
const { SYSTEM_GHOST_API } = process.env;

sgMail.setApiKey(SYSTEM_GHOST_API);

const sendEmail = async (data) => {
    const mail = { ...data, from: 'rapacta@gmail.com' };
    await sgMail.send(mail)
        .then(() => console.log('email send uraaaa'))
        .catch(error => console.log(error.message))

    return true;
}

module.exports = sendEmail;