async function perform(z, bundle) {
  const { model, prompt, image } = bundle.inputData;
  const body = { model, prompt };

  if (image) {
    body.image = image;
  }

  const response = await z.request({
    url: "https://api.siray.ai/v1/images/generations/async",
    method: "POST",
    body: JSON.stringify(body),
  });

  return response;
}

module.exports = {
  key: "imageGeneration",
  display: {
    label: "Image Generation",
    description: "Generate an image from text or image input",
  },
  operation: {
    perform,
    inputFields: [
      {
        label: "Generation Type",
        key: "generation_type",
        type: "string",
        choices: {
          "text-to-image": "Text to Image",
          "image-to-image": "Image to Image",
        },
        default: "text-to-image",
        required: true,
        altersDynamicFields: true,
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
