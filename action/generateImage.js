async function perform(z, bundle) {}

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
      {
        label: "Prompt",
        key: "prompt",
        type: "string",
        noDataExpression: true,
        required: true,
        default: "",
        helpText: "Text prompt for generation",
        displayOptions: {
          show: {
            generation_type: ["text-to-image"],
          },
        },
      },

      
      {
        label: "Image",
        key: "image",
        type: "file",
        required: true,
        displayOptions: {
          show: {
            generation_type: ["image-to-image"],
          },
        },
        helpText: "Input image for generation, it can be data URL or image URL",
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
