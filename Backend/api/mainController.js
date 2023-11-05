//age, balance, job, educational status, income, cost, IRA, stocks, real estate, experience, debt, loans

const { chatWithGPT } = require("../util")
const { stocks } = require("./stocksController")
const { generateHeadlines } = require("./headlinesController")

function main() {
    // var stockMarket = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    // stocks(stockMarket).then((response) => {
    //     console.log(response.content)
    //     console.log(stockMarket)
    // // })

    // const history = [{
    //     role: "system",
    //     content:
    //     `You are the game master for an investment and retiring game.
    //      Each year, you will create a random scenario with long-term consequences for a user based off their curent age and financial status.
    //      The event may have good or bad results on the player's status.
    //      Only create one event.
    //      Do not assume anything about the player's motivations or goals.
    //      Use third person.
    //      Do not specifically list options, leave the question open ended.
    //      Each year, the user will tell you the player's current status.
    //      The system will also give you a set of 3 headlines between each year, which will give you more information about the world.
    //      Try to not directly mention the headlines. 
    //      You are also allowed to make events that are not related to the headlines at all.
    //      The game starts with the following headlines:
    //         1. "Federal Reserve Announces Unexpected Interest Rate Cut, Boosting Economic Optimism"
    //         2. "Major Tech Giants Face Antitrust Investigations, Raising Concerns Over Market Dominance"
    //         3. "Breakthrough in Renewable Energy Technology Promises Lower Costs, Greater Efficiency"
    //      If relevant, include previous events or their outcomes in the decision making process.
    //      After stating an event, the player will give you their response, after which point you tell the player the outcomes of their decision.
    //      The player's name is Rae.`
    // }, {
    //     role: "user",
    //     content: "Rae is now 38 years old, holds a job as a Computer Science Teacher, and has $3000000 in their bank account. They also own 3 rental properties giving them $3600 a year."
    // }, {
    //     role: 'assistant',
    //     content: "In this year, Rae receives a lucrative offer from a major tech company to join their team as a lead educator in a new initiative aimed at teaching advanced computer science skills to underprivileged students. The position comes with a significant pay increase, but it would require Rae to leave their current job and relocate to the company's headquarters. On the other hand, the tech company is currently under investigation which could potentially impact its stability and future prospects. This decision could have a significant impact on Rae's financial status and lifestyle."
    // }, {
    //     role: "user",
    //     content: "Move to the new job."
    // }, {
    //     role: 'assistant',
    //     content: "Rae decides to take the leap and accepts the offer from the tech company. They relocate to the company's headquarters and begin their new role as a lead educator. The transition is smooth and the pay increase significantly boosts their annual income. However, the ongoing antitrust investigations create an air of uncertainty around the company's future. Over the course of the year, the company's stock fluctuates wildly, but Rae's position remains secure for now. Their rental properties continue to provide a steady income, and their overall financial status improves due to the increased salary."
    // }, {
    //     role: "system",
    //     content:
    //     `Headlines:
    //         1. "Federal Reserve Announces Unexpected Interest Rate Cut to Boost Economy"
    //         2. "Major Tech Companies Unveil Groundbreaking Innovations at Annual Conference"
    //         3."Severe Weather Conditions Threaten Agricultural and Construction Industries"`
    // }, {
    //     role: "user",
    //     content: "Rae is now 39 years old, holds a job as a Computer Science Executive, and has $3000000 in their bank account. They also own 3 rental properties giving them $3600 a year."
    // }]
    // chatWithGPT(history).then((response) => {
    //     console.log(response)
    // })

    const chatHistory = []
    generateHeadlines(chatHistory).then((response) => {
        console.log(response)
    })
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




player = {
    name: "rae",
    age: 19,
    balance: 1000000,
    income: 10000,
    cost: 5000,
    IRA: 100000,
    stocks: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    houseType: "apartment",
    realEstate: ["medium house", "small house", "big house"],
    experience: {
        college: "current",
        jobs: [{
                role: "Computer Science Teacher",
                time: 1
            },
            {
                role: "Coder",
                time: 10
            }
        ],
        focus: "Computer Science",
    }
}