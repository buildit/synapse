import { configure } from '@kadira/storybook';

const req = require.context('../stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
  // require('../stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
