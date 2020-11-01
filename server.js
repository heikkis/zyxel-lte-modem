const {sendEmailNotification, login, manualModeConnect, manualModeDisconnect, pingGoogleDNS} = require("./library");

(async () => {
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
            await manualModeDisconnect();
            await manualModeConnect();

            await new Promise(resolve => setTimeout(resolve, 10000));
            pingres = await pingGoogleDNS();
            if (pingres.alive) {
                await sendEmailNotification();
            }
        }
        console.log("END")
        console.log("")
        await new Promise(resolve => setTimeout(resolve, 15000));
    }
})();