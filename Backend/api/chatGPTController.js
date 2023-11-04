const { finishController } = require("../util")
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");


async function chatGPTRequest(req, res) {
    // Setting up initial values
    chatHistory = req.body.chatHistory
    systemCommand = req.body.systemCommand
    user_input = req.body.userInput
    messageList = [];
    messageList.push({role: "system", content: systemCommand})
    for(const element of chatHistory) {
        messageList.push({role: "user", content: element[0]})
        messageList.push({role: "assistant", content: element[1]})
    }
    messageList.push({ role: "user", content: user_input });
    //Create chat instance
    const openai = new OpenAIClient(process.env.OPENAI_ENDPOINT, new AzureKeyCredential(process.env.OPENAI_KEY))

    try { 
        const GPTOutput = await openai.getChatCompletions("tiaa-gpt-4", messageList, {maxTokens: 128})

        console.log(GPTOutput.choices[0].message)

        chatHistory.push([user_input, GPTOutput.choices[0].message]);
        finishController(res, {"chatHistory": chatHistory});
        return;

    }  catch (error) {
        if (error.response) {
            console.log(error.response.status); // e.g. 401
            console.log(error.response.data.message); // e.g. The authentication token you passed was invalid...
            console.log(error.response.data.code); // e.g. 'invalid_api_key'
            console.log(error.response.data.type); // e.g. 'invalid_request_error'
        } else {
            console.log(error);
        }
    }
};

module.exports = {chatGPTRequest}