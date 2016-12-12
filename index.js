const fs = require('fs');
const path = require('path');
const Queue = require('cuejs');


function IngestJS({ dir, interval } = {}) {
  this.path = dir;
  this.interval = interval;
  this.flow = undefined;
  this.queue = new Queue();
}

IngestJS.prototype.start = function start() {
  this.flow = setInterval(() => {
    return fs.readdir(this.path, (err, data) => {
      if (err) return console.error(err);
      if (data.length === 0) return undefined;

      for (let i = 0; i < data.length; i++) {
        if (!data[i].match(/\.lock/)) {
          fs.rename(path.join(this.path, data[i]), path.join(this.path, `${data[i]}.lock`), (renameErr) => {
            if (renameErr) throw new Error(renameErr);

            fs.unlink(path.join(this.path, data[i]), unlinkErr => new Error(unlinkErr));
          });
          this.queue.enq(data[i]);
        }
      }
      return undefined;
    });
  }, this.interval);
};

IngestJS.prototype.stop = function stop() {
  console.log('stop being called');
  clearInterval(this.flow);
  this.flow = undefined;
};

IngestJS.prototype.restart = function restart() {

};

IngestJS.prototype.getQueue = function getQueue() {
  return this.queue;
};

module.exports = IngestJS;
