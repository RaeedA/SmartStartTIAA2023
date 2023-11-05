const { chatWithGPT } = require("../util");

async function eventResult(playerResponse, previousChats, balanceCallback) {
    previousChats.push({
        role: "user",
        content: playerResponse
    })
    const updateBalance = {
        name: "updateBalance",
        description: "Updates the user's balance.",
        parameters: {
            type: "object",
            properties: {
                newBalance: {
                    type: "number",
                    description: "The user's new balance.",
                }
            },
            required: ["newBalance"]
        }
    }
    const response = await chatWithGPT(previousChats, [updateBalance], balanceCallback)
    previousChats.push(response)
    return previousChats;
}

module.exports = {eventResult}