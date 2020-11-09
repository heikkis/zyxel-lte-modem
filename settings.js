const zyxelUrl = "https://" + process.env.ZYXEL_IP_ADDRESS;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const smtpserver = process.env.SMTP_SERVER;
const smtpserverport = process.env.SMTP_SERVER_PORT || "25";
const emailRecipient = process.env.EMAIL_RECIPIENT;

const testConnectionUrls = process.env.TEST_CONNECTION_URLS_STRING || "https://yle.fi https://www.microsoft.com https://google.com https://aws.amazon.com"

console.log(
    `
zyxelUrl: ${zyxelUrl}
username: ${username}
password: ${password}
smtpserver: ${smtpserver}
smtpserverport: ${smtpserverport}
emailRecipient: ${emailRecipient}
testConnectionUrls: ${testConnectionUrls}
`);

module.exports = {
    password,
    username,
    zyxelUrl,
    smtpserver,
    smtpserverport,
    emailRecipient,
    testConnectionUrls
}