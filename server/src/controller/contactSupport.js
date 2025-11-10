import config from '../config/config.js';
import {handleError, handleSuccess} from '../helper/response_handler.js';
import nodemailer from 'nodemailer';

const addContactFormFn = async (req, res) => {
    const {status_code_config: statusCode, en_message_config: en} = config;
    try {
        const reqData = req.body;
        const store_client_id = res?.locals?.store_client_id;

        let data = {
            store_client_id: store_client_id || '',
            email: reqData?.email,
            phone: reqData?.phone,
            message: reqData?.message
        }
        sendSuccessMail(reqData)
        handleSuccess(statusCode.OK, en.DATA_SAVED_SUCCESSFULLY, '', res);
    } catch (error) {
        console.log('error========generate_token===========>', error);
        handleError(statusCode.BAD_REQUEST, en.ERROR_SOMETHING_WRONG, res);
    }


}

async function sendSuccessMail({message = '', email = '', phone = ''}) {
    const html = prepareEmailContent(message, email, phone);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mg12connect@gmail.com",
            pass: "oflz cmeh jepx tatr",
        },
    });
    var maillist = ["mg12connect@gmail.com"];

    const mailOptions = {
        from: "mg12connect@gmail.com",
        to: maillist,
        subject: `Client Query`,
        html: html,
    };
    transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            console.log(`Error in Sending Email: Customer`, error);
        } else {
            console.log(`Email is sent Successfully`);
        }
    });
}

const prepareEmailContent = (message, email, phone) => {
    let html;
    html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>MG PRO</title>
                <style>
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                        font-size: 16px;
                        text-align: left;
                    }
                    th, td {
                        padding: 10px;
                        border: 1px solid #ddd;
                    }
                    th {
                        background-color: #f4f4f4;
                    }
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                </style>
            </head>
            <body>
                <table>
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Email</td>
                            <td>${email}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>${phone}</td>
                        </tr>
                        <tr>
                            <td>Message</td>
                            <td>${message}</td>
                        </tr>
                    </tbody>
                </table>
            </body>
            </html>
`;
    return html
}

export {addContactFormFn};


