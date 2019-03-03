import {calendar_v3} from 'googleapis';

function getMethods(obj) {
  var result = [];
  for (var id in obj) {
    try {
      if (typeof(obj[id]) == "function") {
        result.push(id + ": " + obj[id].toString());
      }
    } catch (err) {
      result.push(id + ": inaccessible");
    }
  }
  return result;
}

export function handler(event, context, callback) {
    callback(null, {
        statusCode: 200,
        body: "Hello, World\n\nprocess.env.TEST_VAR:" + process.env.TEST_VAR +
            "\n\ncalendar_v3.methods:" + getMethods(calendar_v3).join(',')
    });
}