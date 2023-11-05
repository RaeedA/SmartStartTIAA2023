const { chatWithGPT } = require("../util");

async function generateHeadlines(previousChats = []) {
    if(previousChats.length == 0) {
        previousChats.push({
            role: 'system',
            content: 'You are a news channel for fictional world that is very similar to ours.\n' +
                'Each year, you will generate 3 news headlines that might affect multiple stock market sectors.\n' +
                'Try to localize the news to the United States area, but feel free to include other areas if relevant.\n' +
                'Do not explicitly mention stocks or the stock market.\n' +
                'Randomize the severity of the headlines.\n' +
                'Make sure at least one has positive implications.\n' +
                'Do not generate any headlines that would imply or cause major world changes.\n' +
                'You may let previous events influence future events, but it is not required.\n' +
                'Preface the list with the title "Headlines:".'
        })
    }
    previousChats.push({
        role: "user",
        content: "Generate headlines for the next year."
    })
    const headlines = await chatWithGPT(previousChats)
    previousChats.push(headlines)
    return previousChats;
}

module.exports = {generateHeadlines}