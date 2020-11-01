const zyxelUrl = "https://" + process.env.ZYXEL_IP_ADDRESS;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const smtpserver = process.env.SMTP_SERVER;
const smtpserverport = process.env.SMTP_SERVER_PORT || "25";
const emailRecipient = process.env.EMAIL_RECIPIENT;

module.exports = {password, username, zyxelUrl, smtpserver, smtpserverport, emailRecipient}