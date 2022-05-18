import CryptoJS from 'crypto-js';

// import node-fetch
const _importDynamic = new Function("modulePath", "return import(modulePath)");

async function fetch(...args) {
    const { default: fetch } = await _importDynamic("node-fetch");
    return fetch(...args);
}

const parseParams = (uri: string, params: object) => {
    const paramsArray: String[] = []
    Object.keys(params).forEach(key => params[key] && paramsArray.push(`${key}=${params[key]}`))
    if (uri.search(/\?/) === -1) {
        uri += `?${paramsArray.join('&')}`
    } else {
        uri += `&${paramsArray.join('&')}`
    }
    return uri
}

function truncate(q: string) {
    var len = q.length;
    if (len <= 20) return q;
    return q.substring(0, 10) + len + q.substring(len - 10, len);
}

export default async function translateWords(query: string) {
    const APP_KEY = '7d27cdf0d4d07141';
    const KEY = 'n8OA7HPkgPN1ArlK7usl1B2ZtmqsO8dP';
    let salt = (new Date).getTime();
    let curtime = Math.round(new Date().getTime() / 1000);
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    let from = 'en';
    let to = 'zh-CHS';
    let str1 = APP_KEY + truncate(query) + salt + curtime + KEY;
    let vocabId = '您的用户词表ID';

    let sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);

    let requestData = {
        q: query,
        appKey: APP_KEY,
        salt: salt,
        from: from,
        to: to,
        sign: sign,
        signType: "v3",
        curtime: curtime,
        vocabId: vocabId,
    }
    const response = await fetch(parseParams('https://openapi.youdao.com/api', requestData))

    return await response.json();
}