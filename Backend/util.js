function finishController(res, message, status = 200) {
    res.status(status).json(message);
}

module.exports = {finishController}