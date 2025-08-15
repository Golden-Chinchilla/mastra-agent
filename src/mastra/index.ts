import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
// import { LibSQLStore } from '@mastra/libsql';
import { cryptoAgent } from './agents/gasAgent';
import { CloudflareDeployer } from "@mastra/deployer-cloudflare";
// import 'dotenv/config';

export const mastra = new Mastra({
  agents: { cryptoAgent },
  // storage: new LibSQLStore({
  //   url: ":memory:",
  // }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  deployer: new CloudflareDeployer({
    projectName: "hello-mastra",
  })
});