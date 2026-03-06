// This function runs after every outbound request. You can use it to check for
// errors or modify the response. You can have as many as you need. They'll need
// to each be registered in your index.js file.
const handleBadResponses = (response, z) => {
  if (response.status === 401) {
    throw new z.errors.Error(
      "The API token you supplied is incorrect",
      "AuthenticationError",
      response.status,
    );
  }

  return response;
};

// This function runs before every outbound request. You can have as many as you
// need. They'll need to each be registered in your index.js file.
const includeApiKey = (request, z, bundle) => {
  request.headers = request.headers || {};
  if (bundle.authData.apiKey) {
    // Use these lines to include the API key in the querystring
    // request.params = request.params || {};
    // request.params.api_key = bundle.authData.apiKey;
    request.headers.Authorization = `Bearer ${bundle.authData.apiKey}`;
    request.headers["Content-Type"] = "application/json";

    // If you want to include the API key in the header instead, uncomment this:
    // request.headers.Authorization = bundle.authData.apiKey;
  }

  return request;
};

module.exports = {
  befores: [includeApiKey],
  afters: [handleBadResponses],
};
