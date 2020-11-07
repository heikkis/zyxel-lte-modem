const zyxelUrl = "https://" + process.env.ZYXEL_IP_ADDRESS;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const smtpserver = process.env.SMTP_SERVER;
const smtpserverport = process.env.SMTP_SERVER_PORT || "25";
const emailRecipient = process.env.EMAIL_RECIPIENT;

const pingMaxTrycount = process.env.PING_MAX_TRY_COUNT || "20";
const pingTryTimeoutSeconds = process.env.PING_TRY_TIMEOUT_SECONDS || "2.0";
const pingWaitBetweenTriesSeconds = process.env.PING_WAIT_BETWEEN_TRIES_SECONDS || "0.1";

const pingHostsString = process.env.PING_HOSTS_STRING || "8.8.8.8 8.8.4.4 ping.funet.fi ns.funet.fi"

console.log(
    `
zyxelUrl: ${zyxelUrl}
username: ${username}
password: ${password}
smtpserver: ${smtpserver}
smtpserverport: ${smtpserverport}
emailRecipient: ${emailRecipient}
pingMaxTrycount: ${pingMaxTrycount}
pingTryTimeoutSeconds: ${pingTryTimeoutSeconds}
pingWaitBetweenTriesSeconds: ${pingWaitBetweenTriesSeconds}
pingHostsString: ${pingHostsString}
`);

module.exports = {
    password,
    username,
    zyxelUrl,
    smtpserver,
    smtpserverport,
    emailRecipient,
    pingMaxTrycount,
    pingTryTimeoutSeconds,
    pingWaitBetweenTriesSeconds,
    pingHostsString
}