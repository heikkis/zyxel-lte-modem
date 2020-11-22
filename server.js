const {isInternetConnectionAlive} = require("./library");
const {reboot} = require("./library");
const {sendEmailNotification, login, manualModeConnect, manualModeDisconnect, pingGoogleDNS} = require("./library");

(async () => {
    try {
        let lastFailureDates = new Array()
        while (true) {
            console.log("START " + new Date().toISOString())
            console.log("Latest failures: " + JSON.stringify(lastFailureDates))
            if (false == (await isInternetConnectionAlive())) {
                console.log("ERROR")
                if (lastFailureDates.length > 10) {
                    lastFailureDates = lastFailureDates.slice(lastFailureDates.length - 10)
                }

                lastFailureDates.push(new Date().toISOString())

                await login();
                await reboot();

                await new Promise(resolve => setTimeout(resolve, 90 * 1000));
                if (await isInternetConnectionAlive()) {
                    await sendEmailNotification("Internet connection has been restarted", JSON.stringify(lastFailureDates));
                }
            }
            console.log("END")
            console.log("")
            await new Promise(resolve => setTimeout(resolve, 15000));
        }
    } catch (e) {
        console.error(e)
        try {
            await sendEmailNotification("Internet connection monitor ERROR", JSON.stringify(e));
        } catch (e) {
            console.error(e)
        }
    }
})();