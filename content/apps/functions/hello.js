const {google} = require('googleapis');

exports.handler = function(event, context, callback) {
    callback(null, {
        statusCode: 200,
        body: "Hello, World\n\nprocess.env.TEST_VAR:" + process.env.TEST_VAR +
            "\n\ngoogle:" + JSON.stringify(google)
    });
}