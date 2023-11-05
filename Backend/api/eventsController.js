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
                'Use third person.\n' +
                'Do not specifically list options, leave the question open ended.\n' +
                'Each year, the user will tell you the player\'s current status.\n' +
                'The system will also give you a set of 3 headlines between each year, which will give you more information about the world.\n' +
                'Try to not directly mention the headlines.\n' +
                'You are also allowed to make events that are not related to the headlines at all.\n' +
                'Generate a variety of events.\n' +
                'After stating an event, the player will give you their response, after which point you tell the player the outcomes of their decision.\n' +
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
    if(player.experience.jobs.length > 0) {
        const currentJob = player.experience.jobs[player.experience.jobs.length-1]
        content += 'has been holding a job as a ' + currentJob.role + ' for ' + currentJob.time + ' years, making $' + player.income + ' a year.'
    } else {
        content += 'is currently unemployed.'
    }
    if(player.experience.college == "current") {
        content += ' They are currently attending college.'
    }
    if(player.houseType == 'apartment') {
        content += ' They currently live in an apartment.'
    } else if(player.houseType == 'house') {
        content += ' They currently live in a house.'
    } else {
        content += ' They are currently homeless.'
    }
    content += ' They currently have $' + player.balance + ' in their bank account. They own '
    content +=  player.realEstate.length + ' rental properties giving them $' + 0 + ' a year.'
    return content
}

module.exports = {generateEvents}