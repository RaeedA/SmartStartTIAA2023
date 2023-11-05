const { chatWithGPT } = require("../util");

async function eventResult(playerResponse, previousChats) {
    previousChats.push({
        role: "user",
        content: playerResponse
    })
    const response = await chatWithGPT(previousChats)
    previousChats.push(response)
    return previousChats;
}

module.exports = {eventResult}