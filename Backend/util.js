require("dotenv").config(); 
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");


// Helper function that submits a json response with default 200 status
function finishController(res, message, status = 200) {
    res.status(status).json(message);
}

async function chatWithGPT(messageList, functions = [], callback = null) {
    const openai = new OpenAIClient("https://tiaa-openai-azure-sweden.openai.azure.com/", new AzureKeyCredential("be9bdecc8bf64e85bde69c04b2ad56f8"))
    try {
        var options = {
            temperature: 0.4
        };
        if(functions.length > 0) {
            options.functions = functions
            options.functionCall = "auto"
        }
        const GPTOutput = await openai.getChatCompletions("tiaa-gpt-4", messageList, options)
        //console.log(GPTOutput.choices[0])
        const choice = GPTOutput.choices[0]
        if(choice.finishReason == "function_call") {
            functionCall = choice.message.functionCall
            messageList.push({
                role: "function",
                name: functionCall.name,
                content: callback([functionCall.name, JSON.parse(functionCall.arguments)])
            })
            //chatWithGPT();
        } else {
            return GPTOutput.choices[0].message
        }

    }  catch (error) {
        if (error.response) {
            console.log(error.response);
        } else {
            console.log(error);
        }
    }
};

module.exports = {finishController, chatWithGPT}