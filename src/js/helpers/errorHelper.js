// Takes a response from the api and returns a string that represents the error.

const errorHelper = response => {
  if (response && response.body) {
    return response.body;
  }

  if (response && response.statusText) {
    return response.statusText;
  }

  if (response && response.message) {
    return response.message;
  }

  return 'An unknown error occurred.';
};

module.exports = errorHelper;
