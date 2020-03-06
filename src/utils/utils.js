const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json({
        status,
        content
    });
};

const sendErrorResponse = (res, status, message) => {
    res.status(status);
    res.json({
        status,
        message
    });
};

module.exports = {
    sendJSONresponse, sendErrorResponse
};
