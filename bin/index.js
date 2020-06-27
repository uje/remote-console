#! /usr/bin/env node
const argv = process.argv;
const command = argv[2];
const path = require('path');
const {spawn } = require('child_process');

if (command === 'start') {
  console.log('run server')
  const main = path.join(__dirname, '../server/index.js');
  const child = spawn('node', [main], {
    detached: true
  });
  child.unref();
}