// Takes a response from the api and returns a string that represents the error.

const errorHelper = response => {
  const parsedResponse = JSON.parse(response.message);

  if (parsedResponse.error && parsedResponse.error.message) {
    return parsedResponse.error.message;
  }

  if (parsedResponse.statusText) {
    return parsedResponse.statusText;
  }

  return `An unknown error occurred: ${response.statusCode}`;
};

module.exports = errorHelper;
