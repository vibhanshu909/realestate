import { Properties } from '../connectors/properties';
import Property from '../models/property';
import unirest from 'unirest';
import AWS from 'aws-sdk';

export function fastSend(args) {
    const { to, msg } = args;
    const req = unirest("POST", "https://www.fast2sms.com/dev/bulk");
    const apiKey = "1JQtv3gGWPHIYo97qDi6MLyj0c5EpSOsz4KknTrV8aFw2RhxUf3E2TZhJjdBw4i10rD7lWfYFyuqPSM5";
    req.headers({
        "authorization": apiKey
    });
    req.form({
        "sender_id": "FSTSMS",
        "message": msg,
        "language": "unicode",
        "route": "p",
        "numbers": to,
        // "flash": "1"
    });

    req.end(function (res) {
        if (res.error) {
            console.log(res.body, res.error);
        }
        else if (res.body == undefined) {
            return fastSend(args);
        }
        console.log(res.body);
    });
}

export function way2sms(args) {
    const { to, msg } = args;
    console.log(args);
    const req = unirest("POST", "https://smsapi.engineeringtgr.com/send/");
    const userid = "9984432113";
    const password = "@Iamvsquare909";
    const apiKey = "vsquakm8ZxrJGnPeQbHvMq9o";

    req.query({
        Mobile: userid,
        Password: password,
        Message: msg,
        To: to,
        Key: apiKey
    });

    req.end(function (res) {
        if (res.error) {
            // console.log(res.body, res.error);
        }
        else if (!res.body) {
            return way2sms(args);
        }
        console.log("res.body", res.body);
    });
}

export function awsSns(args) {
    console.log(args);
    const { to, msg } = args;
    AWS.config.update({region: 'ap-southeast-1'});
    const sns = new AWS.SNS();

    const params = {
        Message: msg, /* required */
        PhoneNumber: "+91" + to,
    };
    sns.setSMSAttributes({
        MonthlySpendLimit: 3,        
        DefaultSenderID: "codmtr",
        DefaultSMSType: "Transactional"
    }, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });
    sns.publish(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });
}
export default async function () {
    let result = await Properties.all({
        query: {
            nextDueDate: new Date((function () {
                const now = new Date();
                const y = now.getFullYear();
                const m = now.getMonth() + 1;
                const d = now.getDate();
                return y + "-" +
                    (m < 10 ? "0" + m : m) + "-" +
                    (d < 10 ? "0" + d : d);
            })())
        }
    });
    console.log("Due Documents: ", result.length);
    let admin = {
        to: "",
        msg: ""
    }
    for (const e of result) {
        // console.log(e);
        if (!admin.to) {
            const owner = (await Property.populate(e, "owner")).toObject().owner;
            admin.to = owner.contact;
        }
        const to = e.buyerNumber;
        const msg = `
        Payment is due from ${e.buyer}.
        Property name: ${e.name}.
        Price: ${e.price}
        Total Received Amount: ${e.totalReceivedAmount}
        Balance: ${e.price - e.totalReceivedAmount}
        Note: ${e.note}
        `;
        admin.msg += `
        ${msg}
        `;
        way2sms({ to, msg });
    };
    way2sms(admin);
    return true;
}