const { finishController } =  require("../util")
const { eventResult } = require("./eventResultController")

function eventFinish(req, res) {
    chatHistory = req.body.history
    bal = req.body.balance

    eventResult(req.body.message, chatHistory, (updatedBal) => {
        bal = updatedBal[1].newBalance
        return "Updated Balance!"
    }).then((response) => {
        chatHistory = response
    }).then(() => {
        finishController(res, {balance: bal, history: chatHistory})
    })
}

module.exports = {eventFinish}