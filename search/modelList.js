async function perform(z, bundle) {
  const selectedTag = bundle.inputData.generation_type;
  const response = await z.request({ url: "https://api.siray.ai/v1/models"});
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
      name:  model.model_name 
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

    perform,
    // The folowing is a "hint" to the Zap Editor that this trigger returns data
    // "in pages", and that the UI should display an option to "load more" to
    // the human.
    canPaginate: true, // TODO: Remove incase issue with model list pagination
  },
};
