async function perform(z, bundle) {
  const { model, duration, prompt, image } = bundle.inputData;

  let url = "https://api.siray.ai/v1/video/generations";

  const body = {
    duration,
    model,
    prompt,
  };

  if (image) {
    body.image = image;
  }

  const response = await z.request({
    method: "POST",
    url: url,

    body: JSON.stringify(body),
  });
  return response;
}

module.exports = {
  key: "Video Generation",
  value: "videoGeneration",
  helpText: "Generate a video from text or image input",
  operation: {
    perform,
    inputField: [
      {
        label: "Generation Type",
        key: "generationType",
        type: "options",
        choices: {
          "text-to-video": "Text to Video",
          "image-to-video": "Image to Video",
        },
        default: "text-to-video",
      },
      (z, bundle) => {
        if (bundle.inputData.generation_type === "text-to-imag") {
          return {
            label: "Prompt",
            key: "prompt",
            type: "string",
            noDataExpression: true,
            required: true,
            default: "",
            helpText: "Text prompt for generation",
          };
        } else {
          return {
            label: "Image",
            key: "image",
            type: "file",
            required: true,
            helpText:
              "Input image for generation, it can be data URL or image URL",
          };
        }
      },
      {
        label: "Duration",
        key: "duration",
        type: "number",
        default: 8,
        helpText: "Video duration in seconds. Fixed value: 8",
      },
      {
        label: "Model",
        key: "model",
        type: "string",
        required: true,
        dynamic: "list_models.id.name",
        altersDynamicFields: false,
        helpText: "Which LLM provider to use",
      },
    ],
  },
};
