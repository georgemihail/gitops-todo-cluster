
function stopExceededLength(req, res, next) {
    if (req.body.text && req.body.text.length > 140) {
        console.log("The todo text exceed the length of 140 characters")
        return res.end()
    }
    next()
}

module.exports = {
    stopExceededLength
}