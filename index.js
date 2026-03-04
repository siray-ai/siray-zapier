import zapier, { defineApp } from "zapier-platform-core";

import packageJson from "../package.json" with { type: "json" };

import authentication from "./authentication.ss";
import { befores, afters } from "./middleware.js";
import chatCompletion from './action/chatCompletion.js'
import generateImage from './action/generateImage.js'
import generateVideo from './action/generateVideo.js'


export default defineApp({
  version: packageJson.version,
  platformVersion: zapier.version,

  authentication: authentication,

  beforeRequest: [...befores],
  afterResponse: [...afters],

  triggers: {
    [videoGenerationCompleted.key]: videoGenerationCompleted,
    [imageGenerationCompleted.key]: imageGenerationCompleted,
  },

  creates: {
    [chatCompletion.key]: chatCompletion,
    [generateVideo.key]: generateVideo,
    [generateImage.key]: generateImage,
    [getTaskStatus.key]: getTaskStatus,
  },

  searches: {
    [modelList.key]: modelList,
  },
});
