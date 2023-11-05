const { chatWithGPT } = require("../util")

async function stocks(market, headlines) {
    chatHistory = []
    chatHistory.push({
        role: "system",
        content: 'You are simulating a stock market with the following 10 categories:\n' +
        'Technology, Healthcare, Finance, Industrial, Utilities, Real Estate, Agriculture, Entertainment, Cryptocurrency, Areospace and Defence.\n' +
        'When given headlines, update the stock market to reflect changes that they might cause\n.' +
        'Make all changes at once.\n' +
        'Manify all positive changes, and significantly diminish all negative changes.'
    })
    chatHistory.push({
        role: "user",
        content: headlines
    })

    const changeStocks = {
        name: "changeStocks",
        description: "Updates the stock market.",
        parameters: {
            type: "object",
            properties: {
                stockList: {
                    type: "array",
                    description: "An array of percentage changes, in the order of Technology, Healthcare, Finance, Industrial, Utilities, Real Estate, Agriculture, Entertainment, and Cryptocurrency.",
                    items: {
                        type: "number",
                        description: "The percentage change for the given stock."
                    }
                }
            },
            required: ["stockList"]
        }
    }
    
    await chatWithGPT(chatHistory, [changeStocks], (functionCall) => {
        if(functionCall[0] == "changeStocks") {
            stockList = functionCall[1].stockList
            for(stockIndex in stockList) {
                market[stockIndex] = (market[stockIndex] * ((100 + (stockList[stockIndex]*10)) * 0.01)).toFixed(2)
            }
            return "Data saved."
        }
    })
    //finishController(res, {message: headline});
    return market;
};

module.exports = {stocks}