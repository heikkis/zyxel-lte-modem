const {password, username} = require("./settings");

const nodeFetch = require('node-fetch');
const fetch = require('fetch-cookie')(nodeFetch);
const ping = require('ping');
const {zyxelUrl} = require("./settings");

const nodemailer = require("nodemailer");
const {emailRecipient} = require("./settings");
const {smtpserverport} = require("./settings");
const {smtpserver} = require("./settings");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function getRequestHeaders() {
    return {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "fi-FI,fi;q=0.9",
        "cache-control": "no-cache",
        "content-type": "json",
        "pragma": "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "LangConfig=en"
    };
}

async function login() {
    const body = "{\"action\":\"set_system_user_login\",\"args\":{\"name\":\"" + username + "\",\"password\":\"" + password + "\"}}";
    const responseField = "set_system_user_login";

    await makeReqAndCheckResult(body, responseField)
}
async function reboot() {
    const body = "{\"action\":\"set_system_reboot\"}";
    const responseField = "set_system_reboot";

    await makeReqAndCheckResult(body, responseField)
}

async function makeReqAndCheckResult(body, responseField) {
    const res = await fetch(zyxelUrl + "/cgi-bin/gui.cgi", {
        "headers": getRequestHeaders(),
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors",
    });
    const output = await res.json()
    if (output[responseField]["errno"] != 0) {
        console.error("ERROR: " + JSON.stringify(output)+ JSON.stringify(res))
    } else {
        console.log("OK: " + JSON.stringify(output) + JSON.stringify(res))
    }
}

async function manualModeConnect() {
    const body = "{\"action\":\"set_network_connection_mode\",\"args\":{\"manual_mode\":2}}";
    const responseField = "set_network_connection_mode";
    await makeReqAndCheckResult(body, responseField)
}

async function manualModeDisconnect() {
    const body = "{\"action\":\"set_network_connection_mode\",\"args\":{\"manual_mode\":0}}";
    const responseField = "set_network_connection_mode";
    await makeReqAndCheckResult(body, responseField)
}

async function pingGoogleDNS() {
    return ping.promise.probe("8.8.8.8", {
        timeout: 3, // Timeout in seconds for each ping request
        extra: [
            '-o', // Exit successfully after receiving one reply packet.
            '-c', '5', // Number of tries.
            '-i', '2']  // Wait seconds between sending each packet.
    })
}

const transporter = nodemailer.createTransport({
    host: smtpserver,
    port: smtpserverport,
    secure: false
});

async function sendEmailNotification(message) {
    let info = await transporter.sendMail({
        from: emailRecipient,
        to: emailRecipient,
        subject: "Zyxel restarted",
        text: message
    });

}
module.exports = {login, manualModeConnect, manualModeDisconnect, pingGoogleDNS, sendEmailNotification, reboot}