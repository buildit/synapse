const errorHelper = (response) => {
  if (response.error != null) {
    return response.error.message;
  } else if (response.statusText.length > 0) {
    return response.statusText;
  }
  return `An unknown error occured - ${response.statusCode}`;
};

module.exports = errorHelper;
