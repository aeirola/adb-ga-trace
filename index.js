#!/usr/bin/env node
const spawn = require('child_process').spawn;
const colors = require('colors');

// From https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
const PARAMETERS = [
  // General
  { id: 'v',          color: colors.gray,   name: 'Protocol Version' },
  { id: 'tid',        color: colors.gray,   name: 'Tracking ID / Web Property ID' },
  { id: 'aip',        color: colors.gray,   name: 'Anonymize IP' },
  { id: 'ds',         color: colors.gray,   name: 'Data Source' },
  { id: 'qt',         color: colors.gray,   name: 'Queue Time' },
  { id: 'z',          color: colors.gray,   name: 'Cache Buster' },
  // User
  { id: 'cid',        color: colors.green,   name: 'Client ID' },
  { id: 'uid',        color: colors.green,   name: 'User ID' },
  // Session
  { id: 'sc',         color: colors.green,   name: 'Session Control' },
  { id: 'uip',        color: colors.green,   name: 'IP Override' },
  { id: 'ua',         color: colors.green,   name: 'User Agent Override' },
  { id: 'geoid',      color: colors.green,   name: 'Geographical Override' },
  // Traffic Sources
  { id: 'dr',         color: colors.cyan,   name: 'Document Referrer' },
  { id: 'cn',         color: colors.cyan,   name: 'Campaign Name' },
  { id: 'cs',         color: colors.cyan,   name: 'Campaign Source' },
  { id: 'cm',         color: colors.cyan,   name: 'Campaign Medium' },
  { id: 'ck',         color: colors.cyan,   name: 'Campaign Keyword' },
  { id: 'cc',         color: colors.cyan,   name: 'Campaign Content' },
  { id: 'ci',         color: colors.cyan,   name: 'Campaign ID' },
  { id: 'gclid',      color: colors.cyan,   name: 'Google AdWords ID' },
  { id: 'dclid',      color: colors.cyan,   name: 'Google Display Ads ID' },
  // System info
  { id: 'sr',         color: colors.gray,   name: 'Screen Resolution' },
  { id: 'vp',         color: colors.gray,   name: 'Viewport size' },
  { id: 'de',         color: colors.gray,   name: 'Document Encoding' },
  { id: 'sd',         color: colors.gray,   name: 'Screen Colors' },
  { id: 'ul',         color: colors.gray,   name: 'User Language' },
  { id: 'je',         color: colors.gray,   name: 'Java Enabled' },
  { id: 'fl',         color: colors.gray,   name: 'Flash Version' },
  // Hit
  { id: 't',          color: colors.green,   name: 'Hit type' },
  { id: 'ni',         color: colors.green,   name: 'Non-Interaction Hit' },
  // Content information
  { id: 'dl',         color: colors.green,   name: 'Document location URL' },
  { id: 'dh',         color: colors.green,   name: 'Document Host Name' },
  { id: 'dp',         color: colors.green,   name: 'Document Path' },
  { id: 'dt',         color: colors.green,   name: 'Document Title' },
  { id: 'cd',         color: colors.green,   name: 'Screen Name' },
  { id: 'cg_',        color: colors.green,   name: 'Content Group' },
  { id: 'linkid',     color: colors.green,   name: 'Link ID' },
  // App tracking
  { id: 'an',         color: colors.gray,   name: 'Application Name' },
  { id: 'aid',        color: colors.gray,   name: 'Application ID' },
  { id: 'av',         color: colors.gray,   name: 'Application Version' },
  { id: 'aiid',       color: colors.gray,   name: 'Application Installer ID' },
  // Event tracking
  { id: 'ec',         color: colors.green,   name: 'Event Category' },
  { id: 'ea',         color: colors.green,   name: 'Event Action' },
  { id: 'el',         color: colors.green,   name: 'Event Label' },
  { id: 'ev',         color: colors.green,   name: 'Event Value' },
  // E-Commerce
  { id: 'ti',         color: colors.blue,   name: 'Transaction ID' },
  { id: 'ta',         color: colors.blue,   name: 'Transaction Affiliation' },
  { id: 'tr',         color: colors.blue,   name: 'Transaction Revenue' },
  { id: 'ts',         color: colors.blue,   name: 'Transaction Shipping' },
  { id: 'tt',         color: colors.blue,   name: 'Transaction Tax' },
  { id: 'in',         color: colors.blue,   name: 'Item Name' },
  { id: 'ip',         color: colors.blue,   name: 'Item Price' },
  { id: 'iq',         color: colors.blue,   name: 'Item Quantity' },
  { id: 'ic',         color: colors.blue,   name: 'Item Code' },
  { id: 'iv',         color: colors.blue,   name: 'Item Category' },
  // Enhanced E-Commerce
  { id: 'pr_id',      color: colors.blue,   name: 'Product SKU' },
  { id: 'pr_nm',      color: colors.blue,   name: 'Product Name' },
  { id: 'pr_br',      color: colors.blue,   name: 'Product Brand' },
  { id: 'pr_ca',      color: colors.blue,   name: 'Product Category' },
  { id: 'pr_va',      color: colors.blue,   name: 'Product Variant' },
  { id: 'pr_pr',      color: colors.blue,   name: 'Product Price' },
  { id: 'pr_qt',      color: colors.blue,   name: 'Product Quantity' },
  { id: 'pr_cc',      color: colors.blue,   name: 'Product Coupon Code' },
  { id: 'pr_ps',      color: colors.blue,   name: 'Product Position' },
  { id: 'pr_cd_',     color: colors.blue,   name: 'Product Custom Dimension' },
  { id: 'pr_cm_',     color: colors.blue,   name: 'Product Custom Metric' },
  { id: 'pa',         color: colors.blue,   name: 'Product Action' },
  { id: 'ti',         color: colors.blue,   name: 'Transaction ID' },
  { id: 'ta',         color: colors.blue,   name: 'Affiliation' },
  { id: 'tr',         color: colors.blue,   name: 'Revenue' },
  { id: 'tt',         color: colors.blue,   name: 'Tax' },
  { id: 'ts',         color: colors.blue,   name: 'Shipping' },
  { id: 'tcc',        color: colors.blue,   name: 'Coupon Code' },
  { id: 'pal',        color: colors.blue,   name: 'Product Action List' },
  { id: 'cos',        color: colors.blue,   name: 'Checkout Step' },
  { id: 'col',        color: colors.blue,   name: 'Checkout Step Option' },
  { id: 'il_nm',      color: colors.blue,   name: 'Product Impression List Name' },
  { id: 'il_pi_id',   color: colors.blue,   name: 'Product Impression SKU' },
  { id: 'il_pi_nm',   color: colors.blue,   name: 'Product Impression Name' },
  { id: 'il_pi_br',   color: colors.blue,   name: 'Product Impression Brand' },
  { id: 'il_pi_ca',   color: colors.blue,   name: 'Product Impression Category' },
  { id: 'il_pi_va',   color: colors.blue,   name: 'Product Impression Variant' },
  { id: 'il_pi_ps',   color: colors.blue,   name: 'Product Impression Position' },
  { id: 'il_pi_pr',   color: colors.blue,   name: 'Product Impression Price' },
  { id: 'il_pi_cd_',  color: colors.blue,   name: 'Product Impression Custom Dimension' },
  { id: 'il_pi_cm_',  color: colors.blue,   name: 'Product Impression Custom Metric' },
  { id: 'promo_id',   color: colors.blue,   name: 'Promotion ID' },
  { id: 'promo_nm',   color: colors.blue,   name: 'Promotion Name' },
  { id: 'promo_cr',   color: colors.blue,   name: 'Promotion Creative' },
  { id: 'promo_ps',   color: colors.blue,   name: 'Promotion Position' },
  { id: 'promoa',     color: colors.blue,   name: 'Promotion Action' },
  { id: 'cu',         color: colors.blue,   name: 'Currency Code' },
  // Social information
  { id: 'sn',         color: colors.blue,   name: 'Social Network' },
  { id: 'sa',         color: colors.blue,   name: 'Social Action' },
  { id: 'st',         color: colors.blue,   name: 'Social Action Target' },
  // Timing
  { id: 'utc',        color: colors.magenta,   name: 'User timing category' },
  { id: 'utv',        color: colors.magenta,   name: 'User timing variable name' },
  { id: 'utt',        color: colors.magenta,   name: 'User timing time' },
  { id: 'utl',        color: colors.magenta,   name: 'User timing label' },
  { id: 'plt',        color: colors.magenta,   name: 'Page Load Time' },
  { id: 'dns',        color: colors.magenta,   name: 'DNS Time' },
  { id: 'pdt',        color: colors.magenta,   name: 'Page Download Time' },
  { id: 'rrt',        color: colors.magenta,   name: 'Redirect Response Time' },
  { id: 'tcp',        color: colors.magenta,   name: 'TCP Connect Time' },
  { id: 'srt',        color: colors.magenta,   name: 'Server Response Time' },
  { id: 'dit',        color: colors.magenta,   name: 'DOM Interactive Time' },
  { id: 'clt',        color: colors.magenta,   name: 'Content Load Time' },
  // Exceptions
  { id: 'exd',        color: colors.magenta,   name: 'Exception Description' },
  { id: 'exf',        color: colors.magenta,   name: 'Is Exception Fatal?' },
  // Custom metrics
  { id: 'cd_',        color: colors.green,   name: 'Custom Dimension' },
  { id: 'cm_',        color: colors.green,   name: 'Custom Metric' },
  // Content experiments
  { id: 'xid',        color: colors.yellow,   name: 'Experiment ID' },
  { id: 'xvar',       color: colors.yellow,   name: 'Experiment Variant' },

  // Undocumented common fields
  { id: 'ht',         color: colors.gray,   name: 'Hit time' },
  { id: 'a',          color: colors.gray,   name: 'a' },
  { id: '_s',         color: colors.gray,   name: '_s' },
  { id: '_v',         color: colors.gray,   name: '_v' },

].reduce((map, value, index) => {
  // Convert to map for fast lookup by id
  value.order = index;
  map[value.id] = value;
  return map;
}, {});

const DEFAULT_PARAMETER = {
  color: colors.red,
};

// Precompile regular expressions for performance
const adbFormatMatcher = new RegExp(/^ +([0-9]+\.[0-9]+) +[0-9]+ +[0-9]+ +([A-Z]) +GAv4 +: +(.*)/m)
const parameterSeparatorMatcher = new RegExp(/(?:, )(?=(?:[_a-z0-9]{1,20}=))/);
const parameterIndexMatcher = new RegExp(/([0-9]+)/);

function formatLogLine(logLine) {
  const match = adbFormatMatcher.exec(logLine);

  // Non-log line, probably not interesting
  if (!match) {
    return logLine.gray;
  }

  const timestamp = new Date(parseFloat(match[1])*1000);
  const logLevel = match[2];
  const text = match[3];

  if (logLevel === 'D' && text.startsWith('Hit delivery requested: ')) {

    // Extract parameters from text
    const parameters = text
      // Remove header
      .slice('Hit delivery requested: '.length)
      // Split into parameters
      .split(parameterSeparatorMatcher)
      // Convert to paramter-value map
      .reduce((map, parameter) => {
        const parameterParts = parameter.split('=', 2);
        map[parameterParts[0]] = parameterParts[1];
        return map;
      }, {});

    // Sort available identifiers according to parameter list
    const parameterIds = Object.keys(parameters)
      .sort((parameterIdA, parameterIdB) =>
        (PARAMETERS[parameterIdA.replace(parameterIndexMatcher, '_')] || {order: 999999}).order
        - (PARAMETERS[parameterIdB.replace(parameterIndexMatcher, '_')] || {order: 999999}).order
      );

    // Start gathering output lines
    const outputLines = [];
    // Header
    outputLines.push(`\n------- ${timestamp.toISOString()} -------`.gray);

    // One line per parameter
    parameterIds.forEach(parameterId => {
      const parameterValue = parameters[parameterId];
      const deIndexedParameterId = parameterId.replace(parameterIndexMatcher, '_');
      const parameterConfig = PARAMETERS[deIndexedParameterId]|| Object.assign({}, DEFAULT_PARAMETER, {
        name: parameterId
      });

      const parameterIndices = parameterIndexMatcher.exec(parameterId);
      const parameterIndexString = parameterIndices
        ? ' ' + parameterIndices.splice(1).join(', ')
        : '';

      outputLines.push(` ${parameterConfig.name}${parameterIndexString}: ${colors.bold(parameterConfig.color(parameterValue))}`);
    });

    // Footer
    outputLines.push('----------------------------------------\n'.gray);

    return outputLines.join('\n');
  }

  // Other line
  switch (logLevel) {
    case 'V':
    case 'D':
    case 'I':
      return text.grey;
    case 'W':
      return text.yellow;
    case 'E':
      return text.red;
    case 'F':
      return text.red.bold;
    default:
      return text;
  }
}

function streamLogs() {
  const logcat = spawn(
    'adb',
    process.argv.splice(2).concat(['logcat', '--format=epoch', '-s', 'GAv4']));

  logcat.stdout.on('data', (data) => console.log(formatLogLine(data.toString())));
  logcat.stderr.on('data', (data) => console.error(data.toString()));
  logcat.on('close', (code) => process.exit(code));
}


function enableAdbLogging() {
  const setprop = spawn(
    'adb',
    process.argv.splice(2).concat(['shell', 'setprop', 'log.tag.GAv4', 'DEBUG']));

  setprop.stdout.on('data', (data) => console.log(data.toString()));
  setprop.stderr.on('data', (data) => console.error(data.toString().red));

  return new Promise((resolve, reject) => setprop.on('close', (code) => {
    if (code === 0) {
      resolve();
    } else {
      reject(code);
    }
  }));
}

function checkAdb() {
  const hash = spawn('hash', ['adb']);

  hash.stdout.on('data', (data) => console.log(data.toString()));
  hash.stderr.on('data', (data) => console.error(data.toString().red));

  return new Promise((resolve, reject) => hash.on('close', (code) => {
    if (code === 0) {
      resolve();
    } else {
      reject(code);
    }
  }));
}

function main() {
  if (process.argv.indexOf('-h') !== -1) {
    console.log('Usage: adb-ga-trace [-h]');
    console.log('Options:');
    console.log('  -h  Show this help');
    console.log('  Other arguments are passed to adb');
    process.exit(1);
  }

  checkAdb()
  .catch(() => {
    console.error('Failed to find adb command\n'.red);
    console.error('Check that adb is installed and avilable in the path.');
    console.error('You can install adb through:');
    console.error(' - homwbrew with `brew cask install android-platform-tools`');
    console.error(' - manually from https://developer.android.com/studio/releases/platform-tools.html');
    process.exit(1);
  })
  .then(() => enableAdbLogging())
  .catch(() => {
    console.error('Failed to enable ADB logging\n'.red);
    console.error('Check that a device is connected, or simulator is running.\n');
    process.exit(1);
  })
  .then(() => streamLogs());
}

if (require.main === module) {
  main();
}

module.exports = {
  formatLogLine,
}
