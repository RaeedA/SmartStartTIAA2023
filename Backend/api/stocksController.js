const { finishController, chatWithGPT } = require("../util")

async function stocks(market) {
    const headline = await chatWithGPT([{
        role: "user",
        content: "Generate 3 news headlines that might affect multiple stock market sectors without explicitly mentioning stocks, the stock market. Randomize the severity of the headlines. Make sure at least one has positive implications. Do not write any headlines that have major world changes."
    }])
    systemCommand = "You are simulating a stock market with the following 10 categories: Technology, Healthcare, Finance, Industrial, Utilities, Real Estate, Agriculture, Entertainment, Cryptocurrency, Areospace and Defence. When given headlines, update the stock market to reflect changes that they might cause. Manify all positive changes, and significantly diminish all negative changes."
    chatHistory = [
        {role: "user", content: headline.content},
        {role: "system", content: systemCommand}
    ]
    const change_stocks = {
        name: "change_stocks",
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
    await chatWithGPT(chatHistory, [change_stocks], (functionCall) => {
        if(functionCall[0] == "change_stocks") {
            return changeStocks(functionCall[1].stockList, market)
        }
    })
    //finishController(res, {message: headline});
    return headline;
};

function changeStocks(stockList, market) {
    for(stockIndex in stockList) {
        market[stockIndex] = (market[stockIndex] * ((100 + (stockList[stockIndex]*10)) * 0.01)).toFixed(2)
    }
}

module.exports = {stocks}