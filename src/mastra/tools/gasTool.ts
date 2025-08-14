import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import 'dotenv/config';

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
    }).strict(), // result 里不能多字段
  }).strict(),   // 顶层也不能多字段

  execute: async (_ctx: any) => {
    return await getGasPrice();
  },
});

const getGasPrice = async () => {
  return fetch(gasTrackerUrl)
    .then(response => response.json())
    .then(data => {
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
      }
    })
    .catch(error => {
      console.error('Error fetching gas price:', error);
      throw new Error('Failed to fetch gas price');
    }
    );
}
