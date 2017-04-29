#!/usr/bin/env node

var minimist = require('minimist');
var synctoran = require('../lib');

const args = minimist(process.argv.slice(2));
const inputDir = args.i;
const outputFile = args.o;
synctoran(inputDir, outputFile);
