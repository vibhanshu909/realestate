import { Properties } from '../connectors/properties';
import Property from '../models/Property';
import unirest from 'unirest';
import AWS from 'aws-sdk';

export function stripString(str) {
    return str.replace(/\s\s+/g, ' ');
}
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

    req.end(function(res) {
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

    req.end(function(res) {
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
    AWS.config.update({ region: 'ap-southeast-1' });
    const sns = new AWS.SNS();

    const params = {
        Message: msg, /* required */
        PhoneNumber: "+91" + to,
    };
    sns.setSMSAttributes({
        attributes: {
            // request aws to first increase your sns limit use any other value the 1
            'MonthlySpendLimit': '1',

            'DefaultSenderID': 'CODMTR',
            'DefaultSMSType': 'Transactional'
        }
    }, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });
    sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });
}
export default async function() {
    let result = await Properties.all({
        query: {
            nextDueDate: new Date((function() {
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
    for (const e of result) {
        if (e.toObject().balance === 0) {            
            continue;
        }
        const admin = {
            to: "",
            msg: "",
            name: ""
        };
        const owner = (await Property.populate(e, "owner")).toObject().owner;
        admin.to = owner.contact;
        admin.name = owner.username;
        const msg = stripString(`
        Your payment is due for-
        Property name: ${e.name}.
        Price: Rs. ${e.price}
        Owner: ${admin.name}
        Owner's contact: ${admin.to}
        Total Paid Amount: Rs. ${e.totalReceivedAmount}
        Balance: Rs. ${e.price - e.totalReceivedAmount}
        ${e.note.length ? `Note: ${e.note}` : ""}
        `);
        // awsSns({ to: e.buyerNumber, msg });

        admin.msg += stripString(`                
        Property name: ${e.name}.
        Price: Rs.${e.price}
        Buyer's name: ${e.buyer}.
        Buyer's contact: ${e.buyerNumber}
        Total Received Amount: Rs. ${e.totalReceivedAmount}
        Balance: Rs. ${e.price - e.totalReceivedAmount}
        ${e.note.length ? `Note: ${e.note}` : ""}
        `);
        // awsSns(admin);
    };
    return true;
}