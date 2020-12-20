module.exports = (res, err) => {
    res.status(500).json({
        text: "Error occured",
        message: err.message ? err.message : err
    })
}