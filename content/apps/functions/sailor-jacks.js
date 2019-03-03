import {google} from 'googleapis';

export function handler(event, context, callback) {
    console.log("google:" + google);
    console.log("google.auth:" + google.auth);

    const auth = new google.auth.OAuth2(
        process.env.GOOGLE_CALENDAR_CLIENT_ID,
        process.env.GOOGLE_CALENDAR_SECRET,
        ["https://oliverschmid.space/"]);

    const calendar = google.calendar({version: 'v3', auth});
    callback(null, {
        statusCode: 200,
        body: "Hello, World"
    });
}