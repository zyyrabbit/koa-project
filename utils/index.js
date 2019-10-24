const path = require('path');

[
  'network'
].forEach(name => {
  exports[name] = require(path.join(__dirname, name));
})