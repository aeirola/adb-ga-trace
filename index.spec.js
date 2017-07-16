const assert = require('assert');
require('colors');

const formatLogLine = require('./index').formatLogLine;

describe('adb-ga-trace', () => {
  it('should format non-logcat formatted lines verbatim in gray', () =>
    assert.equal(
      formatLogLine('----testing----'),
      '----testing----'.grey));

  it('should format non-hit logcat formatted line content in gray', () =>
    assert.equal(
      formatLogLine(' 12345678.90 123 123 I GAv4 : ----testing----'),
      '----testing----'.grey));

  it('should format non-hit logcat formatted warning line content in yellow', () =>
    assert.equal(
      formatLogLine(' 12345678.90 123 123 W GAv4 : ----testing----'),
      '----testing----'.yellow));

  it('should format non-hit logcat formatted error line content in red', () =>
    assert.equal(
      formatLogLine(' 12345678.90 123 123 E GAv4 : ----testing----'),
      '----testing----'.red));

  it('should format simple hit in nice colors', () =>
    assert.equal(
      formatLogLine(' 12345678.90 123 123 D GAv4 : Hit delivery requested: v=1, tid=UA-123456-1, cid=, t=appview'),
      `${'\n------- 1970-05-23T21:21:18.900Z -------'.grey}\n` +
           ` Protocol Version: ${'1'.grey.bold}\n` +
           ` Tracking ID / Web Property ID: ${'UA-123456-1'.grey.bold}\n` +
           ` Client ID: \n` +
           ` Hit type: ${'appview'.green.bold}\n` +
       `${'----------------------------------------\n'.grey}`));

  it('should handle custom dimensions', () =>
    assert.equal(
      formatLogLine(' 12345678.90 123 123 D GAv4 : Hit delivery requested: v=1, cd1=custom-value'),
      `${'\n------- 1970-05-23T21:21:18.900Z -------'.grey}\n` +
           ` Protocol Version: ${'1'.grey.bold}\n` +
           ` Custom Dimension 1: ${'custom-value'.green.bold}\n` +
       `${'----------------------------------------\n'.grey}`));

  it('should handle unkown parameters', () =>
    assert.equal(
      formatLogLine(' 12345678.90 123 123 D GAv4 : Hit delivery requested: v=1, test=success'),
      `${'\n------- 1970-05-23T21:21:18.900Z -------'.grey}\n` +
           ` Protocol Version: ${'1'.grey.bold}\n` +
           ` test: ${'success'.red.bold}\n` +
       `${'----------------------------------------\n'.grey}`));
});
