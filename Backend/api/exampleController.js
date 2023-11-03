const { finishController } = require("../util")

// Example adder function, these should all be functions
function example(req, res) {
    // Add the numbers and save them to an object
    var message = {
        body: [parseInt(req.body.value1)+parseInt(req.body.value2)]
    }
    // ALWAYS put a return statement after finishController
    finishController(res, message)
    return
}

module.exports = {example}