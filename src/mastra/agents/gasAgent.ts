import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
// import { Memory } from '@mastra/memory';
// import { LibSQLStore } from '@mastra/libsql';
import { gasTool } from '../tools/gasTool.ts';

export const cryptoAgent = new Agent({
  name: 'Gas Agent',
  instructions: `
      你是一个专注于加密货币研究的Agent。
`,
  model: openai('gpt-4o-mini'),
  tools: { gasTool },
});
