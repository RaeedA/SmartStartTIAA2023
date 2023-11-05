//age, balance, job, educational status, income, cost, IRA, stocks, real estate, experience, debt, loans

const { chatWithGPT } = require("../util")
const { stocks } = require("./stocksController")
const { generateHeadlines } = require("./headlinesController")
const { generateEvents } = require("./eventsController")
const { eventResult } = require("./eventResultController")

function main() {
    player = {
        name: "Rae",
        age: 19,
        balance: 2000,
        income: 0,
        cost: 0,
        IRA: 0,
        stocks: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        houseType: "home",
        realEstate: [],
        experience: {
            college: "current",
            jobs: [],
            focus: "Computer Science",
        }
    }

    generateHeadlines(headlineHistory).then((response) => {
        chatHistory = response
        recentHeadlines = response[response.length-1].content
        console.log(response)
    }).then(() => {
        generateEvents(recentHeadlines, player, eventHistory).then((res) => {
            console.log(res)
        })
    })

    // eventResult("Rae decides to take the opportunity.", eventHistory).then((response) => {
    //    console.log(response)
    // })
}

function incrementYear() {
    // Subtract costs from balance
    // Add stocks to balance
    // Add real estate money to balance
    // Increase IRA money
    // Stock market changes, update player bank accordingly
    // Increase job time
    // Random event
}

main()