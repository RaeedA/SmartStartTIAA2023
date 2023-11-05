const { chatWithGPT } = require("../util");

async function generateEvents(headlines, user, previousChats = []) {
    if(previousChats.length == 0) {
        previousChats.push({
            role: 'system',
            content: 'You are the game master for an investment and retiring game.\n' +
                'Each year, you will create a random scenario for a user based off their curent age and financial status.\n' +
                'The event may have good or bad results on the player\'s status.\n' +
                'Only create one event.\n' +
                'Do not assume anything about the player\'s motivations or goals.\n' +
                'Assume the player is generally average at everything.\n' +
                'Use third person, and they/them pronouns.\n' +
                'Do not specifically list options, leave the question open ended.\n' +
                'Each year, the user will tell you the player\'s current status.\n' +
                'The system will also give you a set of 3 headlines between each year, which will give you more information about the world.\n' +
                'Try to not directly mention the headlines.\n' +
                'You are also allowed to make events that are not related to the headlines at all.\n' +
                'Generate a variety of events.\n' +
                'Try to not focus on job or internship or housing related events.\n' +
                'Whenever using numbers, limit them to two decimal places.\n' +
                'Only generate events that will directly affect the player\'s balance, instead of through stocks or jobs.\n' +
                'Keep the length short, about a couple of sentences, and end with a call to action.\n' +
                'After stating an event, the player will give you their response, after which point you tell the player the outcomes of their decision.\n' +
                'Do not give any follow up questions when stating the results.\n' +
                'In addition to stating the results of the action here, mention any continuing effects from previous decisions if applicable.\n' +
                'The player\'s name is '+ user.name + '.\n' +
                'The game starts with the following headlines:\n' + headlines
        })
    } else {
        previousChats.push({
            role: 'system',
            content: headlines
        })
    }
    previousChats.push({
        role: "user",
        content: generateUserProfile(user)
    })
    const event = await chatWithGPT(previousChats)
    previousChats.push(event)
    return previousChats;
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
    content +=  player.realEstate.length + ' rental properties giving them $' + player.realEstateIncome + ' a year.'
    return content
}

module.exports = {generateEvents}