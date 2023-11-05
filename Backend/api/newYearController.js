const { finishController } =  require("../util")
const  { generateEvents } = require("./eventsController")
const { generateHeadlines } = require("./headlinesController")

function newYear(req, res) {
    var body = req.body
    body.balance += body.income + body.realEstateIncome
    body.balance -= body.expenses
    var recentHeadlines

    generateHeadlines(body.headlineHistory).then((headlines) => {
        body.headlineHistory = headlines
        recentHeadlines = headlines[headlines.length-1].content
    }).then(() => {
        generateEvents(recentHeadlines, body, body.eventsHistory).then((events) => {
            body.eventsHistory = events
        }).then(() => {
            finishController(res, body)
            return
        })
    })
}

module.exports = {newYear}