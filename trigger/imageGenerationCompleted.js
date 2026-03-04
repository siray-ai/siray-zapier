const TERMINAL_STATUSES = [
  "SUCCESS",
  "SUCCEEDED",
  "COMPLETED",
  "FAILED",
  "FAILURE",
  "CANCELLED",
  "ERROR",
];

const isDone = (status, progress) => {
  const normalizedStatus = String(status || "").toUpperCase();
  return (
    TERMINAL_STATUSES.includes(normalizedStatus) ||
    progress === "100%" ||
    progress === 100
  );
};

const perform = async (z, bundle) => {
  const { task_id } = bundle.inputData;

  const response = await z.request({
    url: `https://api.siray.ai/v1/images/generations/async/${task_id}`,
    method: "GET",
  });

  const result = {
    id: response.task_id,
    task_id: response.task_id,
    action: response.action,
    status: response.status,
    progress: response.progress,
    fail_reason: response.fail_reason,
    outputs: response.outputs,
    submit_time: response.submit_time,
    start_time: response.start_time,
    finish_time: response.finish_time,
    data: response.data,
  };

  return isDone(result.status, result.progress) ? [result] : [];
};

module.exports = {
  key: "imageGenerationCompleted",
  noun: "Image Task",
  display: {
    label: "Image Generation Completed",
    description: "Fires when an async image task finishes.",
  },
  operation: {
    perform,
    inputFields: [
      {
        key: "task_id",
        label: "Task ID",
        type: "string",
        required: true,
        helpText: "Task ID returned by async image generation.",
      },
    ],
    outputFields: [
      { key: "task_id", label: "Task ID" },
      { key: "action", label: "Action" },
      { key: "status", label: "Status" },
      { key: "progress", label: "Progress" },
      { key: "fail_reason", label: "Fail Reason" },
      { key: "outputs", label: "Outputs" },
      { key: "submit_time", label: "Submit Time" },
      { key: "start_time", label: "Start Time" },
      { key: "finish_time", label: "Finish Time" },
      { key: "data", label: "Data" },
    ],
  },
};
