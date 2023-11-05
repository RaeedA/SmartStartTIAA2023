const { finishController } =  require("../util")
const  { generateEvents } = require("./eventsController")
const { generateHeadlines } = require("./headlinesController")
//const { stocks } = require("./stocksController")

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
            //stocks(body.stocks, recentHeadlines).then((response) => {
            //    body.stocks = response
                if(body.age == 22) {
                    body.education = "complete"
                    body.job - "Entry Level"
                    body.income = 30000
                }
                finishController(res, body)
                return
            //})
        })
    })
}

module.exports = {newYear}