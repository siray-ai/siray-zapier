const authentication = require("./authentication");
const { befores, afters } = require("./middleware");

const chatCompletion = require("./action/chatCompletion");
const generateImage = require("./action/generateImage");
const generateVideo = require("./action/generateVideo");
const getTaskStatus = require("./action/getTaskStatus");

const modelList = require("./search/modelList");

const videoGenerationCompleted = require("./trigger/videoGenerationCompleted");
const imageGenerationCompleted = require("./trigger/imageGenerationCompleted");

module.exports = {
  version: require("./package.json").version,
  platformVersion: require("zapier-platform-core").version,

  authentication,

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
};
