const { finishController } =  require("../util")
const { eventResult } = require("./eventResultController")

function eventFinish(req, res) {
    chatHistory = req.body.history

    eventResult(req.body.message, chatHistory).then((response) => {
        chatHistory = response
    }).then(() => {
        finishController(res, {history: chatHistory})
    })
}

module.exports = {eventFinish}