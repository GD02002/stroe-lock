import crypto from 'crypto';
import config from '../config/config.js';
import common from 'common-utils';
import {clientStoresSchema} from "../database/clientStores.js";

const getEncryptDecryptData = (action, string) => {
    try {
        let output = false;
        let encrypt_method = "aes-256-cbc";
        let secret_key = 'CHECKOUT_@%$&@*#_SECRETKEY';
        let secret_iv = 'CHECKOUT_$%&@*#^@_SECRETIV';

        let password_iv = crypto.createHash('sha256').update(secret_iv).digest('hex');
        let password_hash = crypto.createHash('sha256').update(secret_key, 'utf8').digest('hex');
        /* hash */
        let key = hex2bin(password_hash);
        /* iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warnin */
        let iv = hex2bin(password_iv)
        password_iv = Buffer.alloc(16, iv, "binary");
        password_hash = Buffer.alloc(32, key, "binary");
        if (action === config.ACTION_ENCRYPT) {
            let cipher = crypto.createCipheriv(encrypt_method, password_hash, password_iv);
            return Buffer.from(cipher.update(string, 'utf8', 'base64') + cipher.final('base64')).toString('base64');
        } else if (action === config.ACTION_DECRYPT) {
            string = Buffer.from(string, 'base64').toString('utf8')
            let decipher = crypto.createDecipheriv('aes-256-cbc', password_hash, password_iv);
            return decipher.update(string, 'base64', 'utf8') + decipher.final('utf8')
        }
        return output;
    } catch (error) {
        return false;
    }
}

const hex2bin = (hex) => {
    let bytes = [];let i = 0; let len=hex.length - 1;
    for (; i < len; i += 2)
        bytes.push(parseInt(hex.substr(i, 2), 16));
    return String.fromCharCode.apply(String, bytes);
}


const getStoreData = (shop) => {
    try {
        const where = {
            status : '1',
            store_name : common.mysql_real_escape_string(shop)
        };
        const common_field = {token : 1, money_format : 1, iana_timezone : 1, store_name : 1, store_client_id : 1, currency : 1,
            shop_name : 1, app_status : 1, _id : 0};
        return clientStoresSchema.findOne(where ,common_field);
    } catch (error) {
        const error_log = common.error_log_message(0, '0', error, shop, "db_functions.js", "getUserData");
        createLogDb('error_common_else_cht_file', error_log);
        return false;
    }
}

const escapeHtml = (unsafe) => {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function unescapeHTML(escapedStr) {
    return escapedStr.replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, "&");
}


export {
    getEncryptDecryptData,getStoreData,escapeHtml,unescapeHTML
}
