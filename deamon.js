const cp = require('child_process');
let reStartNum = 0;
function createWork() {
  let child = cp.fork('app.js');
  child.on('exit', function(err) {
    if (err && reStartNum < 10) {
      console.log('重启子进程', reStartNum++);
      createWork();
    }
  })
}
createWork();