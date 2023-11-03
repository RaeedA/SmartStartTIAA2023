const { finishController } = require("../util")

function example(req, res) {
    console.log(req.body)
    var message = {
        body: [parseInt(req.body.value1)+parseInt(req.body.value2)]
    }
    // ALWAYS put a return statement after finishController
    finishController(res, message)
    return
}

module.exports = {example}