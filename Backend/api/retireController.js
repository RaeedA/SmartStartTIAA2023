const { chatWithGPT, finishController } = require("../util");

function retirement(req, res) {
    user = req.body.user
    previousChats = [];
    previousChats.push({
        role: 'system',
        content: 'You are the game master for an investment and retiring game.\n' +
        'The user will tell you about them, and you will tell them how their retirement pans out.\n' +
        'Be descriptive, and put an emphasis on how the money in their RothIRA affects their retirement life.'
    })
    
    previousChats.push({
        role: "user",
        content: generateUserProfile(user)
    })

    chatWithGPT(previousChats).then((response) => {
        console.log(response)
        finishController(res, response.content)
        return;
    })
}

function generateUserProfile(player) {
    var content = player.name + ' is now ' + player.age + ' years old, and '
    if(player.job != 'NONE') {
        content += 'has been holding a job as a ' + player.job + ' making $' + player.income + ' a year.'
    } else {
        content += 'is currently unemployed.'
    }
    if(player.education == "temporary") {
        content += ' They are currently attending college.'
    }
    if(player.houseType == 'house') {
        content += ' They currently live in a house.'
    } else {
        content += ' They are currently living at their parent\'s house.'
    }
    content += ' They currently have $' + player.balance + ' in their bank account. They own '
    content += player.realEstate.length + ' rental properties giving them $' + player.realEstateIncome + ' a year.'
    content += ' They currently have $' + player.inRothIRA + ' in their RothIRA.'
    return content
}

module.exports = {retirement}