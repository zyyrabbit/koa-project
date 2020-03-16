const path = require('path');

[
  'common',
  'network',
].forEach(name => {
  Object.assign(exports , require(path.join(__dirname, name)));
})