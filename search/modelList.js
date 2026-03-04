function getModelsUrlByTag(tag) {
  const imageTags = ["text-to-image", "image-to-image"];
  const videoTags = ["text-to-video", "video-to-video", "image-to-video"];

  if (tag === "chat") {
    return "https://api.siray.ai/v1/chat/completions";
  }
  if (imageTags.has(tag)) {
    return "https://api.siray.ai/v1/images/generations/async";
  }
  if (videoTags.has(tag)) {
    return "https://api.siray.ai/v1/video/generations";
  }

  return "https://api.siray.ai/v1/models";
}

async function perform(z, bundle) {
  const selectedTag = bundle.inputData.generation_type;
  const response = await z.request({ url: getModelsUrlByTag(selectedTag) });
  const models = response.data || [];

  const allowedTags = new Set([
    "chat",
    "text-to-image",
    "image-to-image",
    "text-to-video",
    "video-to-video",
    "image-to-video",
  ]);

  return models
    .filter((model) => {
      /* 
       TODO: remove allowed tag after handling ['mult-model','embeddings']
       by adding and using those in a new zap feature
      */
       if (!allowedTags.has(model.tag)) return false;
      if (!selectedTag) return true;
      return model.tag === selectedTag;
    })
    .map((model) => ({
      id: model.id,
      name: model.name || model.model_name || String(model.id),
    }));
}



module.exports = {
  key: "list_models",
  noun: "Model",
  display: {
    label: "List of Models",
    description:
      "This is a hidden trigger, and is used in a Dynamic Dropdown of another trigger.",
    hidden: true,
  },
  operation: {
    inputFields: [
      {
        key: "generation_type",
        required: false,
      },
      {
        key: "tag",
        required: false,
      },
    ],
    perform,
    // The folowing is a "hint" to the Zap Editor that this trigger returns data
    // "in pages", and that the UI should display an option to "load more" to
    // the human.
    canPaginate: true, // TODO: Remove incase issue with model list pagination
  },
};
