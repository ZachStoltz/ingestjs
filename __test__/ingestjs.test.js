/* eslint-disable no-undef */
const IngestJS = require('../');
const fs = require('fs');

describe('IngestJS test suite', () => {
  test('should return queue with items', (done) => {
    const ingest = new IngestJS({ dir: './ingest', interval: 200 });
    ingest.start();
    fs.createReadStream('./process/user.json').pipe(fs.createWriteStream('./ingest/test.json')).close();

    setTimeout(() => {
      ingest.stop();
      const queue = ingest.getQueue();

      expect(queue).toBeDefined();
      expect(queue.size).toBeGreaterThan(0);

      done();
    }, 1000);
  });

  test('should stop flow', (done) => {
    const ingest = new IngestJS({ dir: './ingest', interval: 200 });
    ingest.start();
    expect(ingest.flow).toBeDefined();
    fs.createReadStream('./process/user.json').pipe(fs.createWriteStream('./ingest/user.json')).close();

    setTimeout(() => {
      ingest.stop();
      expect(ingest.flow).toBeUndefined();
      done();
    }, 1000);
  });
});
