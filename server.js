const {reboot} = require("./library");
const {sendEmailNotification, login, manualModeConnect, manualModeDisconnect, pingGoogleDNS} = require("./library");

(async () => {
    try {
        let lastFailureDates = new Array()
        while (true) {
            console.log("START " + new Date().toISOString())
            console.log("Latest failures: " + JSON.stringify(lastFailureDates))

            let pingres = await pingGoogleDNS();
            if (!pingres.alive) {
                console.log("ERROR: " + JSON.stringify(pingres))
                if (lastFailureDates.length > 10) {
                    lastFailureDates = lastFailureDates.slice(lastFailureDates.length - 10)
                }

                lastFailureDates.push(new Date().toISOString())

                await login();
                await reboot();

                await new Promise(resolve => setTimeout(resolve, 60000));
                pingres = await pingGoogleDNS();
                if (pingres.alive) {
                    await sendEmailNotification(JSON.stringify(lastFailureDates));
                }
            }
            console.log("END")
            console.log("")
            await new Promise(resolve => setTimeout(resolve, 15000));
        }
    } catch(e) {
        await sendEmailNotification(JSON.stringify(e));
        throw e
    }
})();