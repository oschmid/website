exports.handler = function(event, context, callback) {
    callback(null, {
        statusCode: 200,
        body: "Hello, World\n\nevent:" + JSON.stringify(event) +
            "\n\ncontext:" + JSON.stringify(context)
    });
}