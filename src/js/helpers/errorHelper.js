// Takes a thing from the api and returns a string that represents the error.
// TODO: Clarify the expected cases,
// and use meaningful variable names that make these cases apparent.

const errorHelper = thing => {
  if (thing && thing.body) {
    let innerThing;
    try {
      innerThing = JSON.parse(thing.body);
    } catch (err) {
      innerThing = thing.body;
    }
    if (innerThing.error.message) return innerThing.error.message;
    if (innerThing.error.statusCode) return innerThing.error.statusCode;
  }

  if (thing && thing.statusText) {
    return thing.statusText;
  }

  if (thing && thing.message) {
    if (thing.message === 'Internal XMLHttpRequest Error') {
      return 'We are unable to reach the server at this time.';
    }
    return thing.message;
  }

  return 'An unknown error occurred.';
};

module.exports = errorHelper;
