import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import 'dotenv/config';

// Workers 的网络是跑在 Cloudflare 边缘，部署时不需要本地 HTTP 代理。
// import { setGlobalDispatcher, ProxyAgent } from 'undici';
// setGlobalDispatcher(new ProxyAgent('http://127.0.0.1:7890'));

const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
const gasTrackerUrl = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${etherscanApiKey}`;

export const gasTool = createTool({
  id: 'getGasPrice',
  description: 'Get current gas price for Ethereum LastBlock',
  inputSchema: z.object({}),
  outputSchema: z.object({
    status: z.literal("1"),
    message: z.string(),
    result: z.object({
      LastBlock: z.string(),
      SafeGasPrice: z.string(),
      ProposeGasPrice: z.string(),
      FastGasPrice: z.string(),
      suggestBaseFee: z.string(),
      gasUsedRatio: z.string(),
    }).strict(),
  }).strict(),

  execute: async (_ctx: any) => {
    return await getGasPrice();
  },
});

const getGasPrice = async () => {
  return fetch(gasTrackerUrl, {
    method: 'GET',
    // headers: { 'Accept': 'application/json' }, // 可选
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return await res.json();
    })
    .then((data) => {
      return {
        status: "1" as const,
        message: String(data.message),
        result: {
          LastBlock: String(data.result.LastBlock),
          SafeGasPrice: String(data.result.SafeGasPrice),
          ProposeGasPrice: String(data.result.ProposeGasPrice),
          FastGasPrice: String(data.result.FastGasPrice),
          suggestBaseFee: String(data.result.suggestBaseFee),
          gasUsedRatio: String(data.result.gasUsedRatio),
        }
      };
    })
    .catch((error) => {
      console.error('Error fetching gas price:', error);
      throw new Error('Failed to fetch gas price');
    });
};