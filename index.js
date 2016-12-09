const Queue = require('cuejs');
const queue = new Queue();
const fs = require('fs');

const interval = setInterval(() => {
  fs.readdir('./process', (err, data) => {
    if (err) return console.error(err);
    if (data.length === 0) return;

    for(let i = 0; i < data.length; i++) {
      queue.enq(data[i]);
    }
  });
}, 100); //TODO: allow customizable interval

setTimeout(() => {
  clearInterval(interval);

  console.log(queue);
}, 500);

