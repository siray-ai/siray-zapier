async function getAdvanceOperation(_z, bundle) {
  if (bundle.inputData.show_advance === true)
    return [
      {
        label: "frequency_penalty",
        key: "frequency_penalty",
        type: "number",
        typeOptions: {
          minValue: -2,
          maxValue: 2,
        },
        default: "0",
        helpText: "Penalty for frequent tokens. Required range: -2 <= x <= 2",
      },
      {
        label: "max_tokens",
        key: "max_tokens",
        type: "number",
        typeOptions: {
          minValue: 1,
          maxValue: 32768,
        },
        default: "32768",
        helpText:
          "Maximum number of tokens to generate. Required range: 1 <= x <= 32768",
      },
      {
        label: "presence_penalty",
        key: "presence_penalty",
        type: "number",
        typeOptions: {
          minValue: -2,
          maxValue: 2,
        },
        default: "0",
        helpText: "Penalty for new topics. Required range: -2 <= x <= 2",
      },
      {
        label: "stream",
        key: "stream",
        type: "boolean",
        default: "false",
        helpText: "Enable streaming response.",
      },
      {
        label: "temperature",
        key: "temperature",
        type: "number",
        typeOptions: {
          minValue: 0,
          maxValue: 2,
        },
        default: "1",
        helpText:
          "Controls randomness in output (higher = more random). Required range: 0 <= x <= 2",
      },
      {
        label: "top_p",
        key: "top_p",
        type: "number",
        typeOptions: {
          minValue: 0,
          maxValue: 1,
        },
        default: "1",
        helpText:
          "Nucleus sampling parameter (controls diversity). Required range: 0 <= x <= 1",
      },
    ];
}

async function perform(z, bundle) {
  const { message, temperature, model, filter, max_tokens } = bundle.inputData;
  const response = z.request({
    url: "https://api.siray.ai/v1/chat/completions",
    method: "POST",
    body: JSON.stringify({
      model,
      messages: [
        {
          role: filter,
          content: message,
        },
      ],
      temperature,
      max_tokens,
    }),
  });
  return response
}

module.exports = {
  key: "chat_completion",
  noun: "Chat",
  display: {
    label: "Chat Completion",
    description: "Create a chat completion",
  },
  operation: {
    perform,
    inputFields: [
      {
        label: "message",
        key: "message",
        type: "string",
        noDataExpression: true,
        required: true,
        default: "",
      },
      {
        label: "Filters",
        key: "filter",
        type: "string",
        required: true,
        default: "system",
        choices: [
          {
            assistance: "assistance",
            user: "user",
            system: "system",
          },
        ],
      },
      {
        key: "generation_type",
        label: "Generation Type",
        type: "string",
        default: "chat",
        required: true,
        choices: {
          chat: "Chat",
        },
        altersDynamicFields: true,
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
      {
        key: "show_advance",
        label: "Shoe Advance Option",
        type: "boolean",
        default: "false",
        altersDynamicFields: true,
      },
      getAdvanceOperation,
    ],
  },
};
