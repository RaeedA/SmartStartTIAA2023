// Helper function that submits a json response with default 200 status
function finishController(res, message, status = 200) {
    res.status(status).json(message);
}

module.exports = {finishController}