import {calendar_v3} from 'googleapis';

export function handler(event, context, callback) {
    callback(null, {
        statusCode: 200,
        body: "Hello, World\n\nprocess.env.TEST_VAR:" + process.env.TEST_VAR +
            "\n\ngoogle:" + JSON.stringify(calendar_v3)
    });
}