async function perform(z, bundle) {
  const { task_type, task_id } = bundle.inputData;

  const endpointByType = {
    image: "https://api.siray.ai/v1/images/generations/async",
    video: "https://api.siray.ai/v1/video/generations",
  };

  const baseUrl = endpointByType[task_type] || endpointByType.image;

  const response = await z.request({
    url: `${baseUrl}/${task_id}`,
    method: "GET",
  });

  return {
    task_id: response.task_id,
    action: response.action,
    status: response.status,
    fail_reason: response.fail_reason,
    outputs: response.outputs,
    submit_time: response.submit_time,
    start_time: response.start_time,
    finish_time: response.finish_time,
    progress: response.progress,
    data: response.data
  };
}

module.exports = {
  key: "getTaskStatus",
  noun: "Task Status",
  display: {
    label: "Get Task Status",
    description: "Poll video/image task status by ID",
  },
  operation: {
    perform,
    inputFields: [
      {
        key: "task_type",
        label: "Task Type",
        type: "string",
        required: true,
        choices: {
          video: "Video",
          image: "Image",
        },
        default: "image",
        helpText: "Choose the task type created earlier.",
      },
      {
        key: "task_id",
        label: "Task ID",
        type: "string",
        required: true,
        helpText: "The task ID returned by image/video generation.",
      },
    ],
  },
  outputFields: [
    { key: "task_id", label: "Task ID" },
    { key: "action", label: "Action" },
    { key: "status", label: "Status" },
    { key: "fail_reason", label: "Fail Reason" },
    { key: "outputs", label: "Outputs" },
    { key: "submit_time", label: "Submit Time" },
    { key: "start_time", label: "Start Time" },
    { key: "finish_time", label: "Finish Time" },
    { key: "progress", label: "Progresse" },
    { key: "data", label: "Data" },
  ],
};
