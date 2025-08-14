import axios from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';

// 如果有账号密码：'socks5h://user:pass@127.0.0.1:1080'
const agent = new SocksProxyAgent('socks5h://127.0.0.1:1080');

axios.get(
    'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=KS5NWXTFQXV3WNGXSIPZHPS163VJIWUDMM',
    {
        httpAgent: agent,
        httpsAgent: agent,
        proxy: false,                 // 禁用 axios 的 env 代理推断，避免冲突
        timeout: 20000,
        transitional: { clarifyTimeoutError: true },
    }
).then(r => {
    console.log(r.data);
}).catch(e => {
    console.error('axios error:', e.code, e.message);
    if (e.cause) console.error('cause:', e.cause.code || e.cause.message);
});
