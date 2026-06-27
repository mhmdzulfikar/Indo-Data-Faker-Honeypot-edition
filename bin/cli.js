#!/usr/bin/env node

const faker = require('../src/index');

const args = process.argv.slice(2);

function showHelp() {
  console.log(`
Indo Data Faker CLI
-------------------
Usage: 
  npx indo-data-faker [options]

Options:
  --amount <number>    Number of records to generate (default: 10)
  --format <csv|sql>   Format to export (default: console output)
  --out <filename>     Output file name (e.g., data.csv or data.sql)
  --table <name>       Table name for SQL export (default: users)
  --help               Show this help message
`);
}

if (args.includes('--help')) {
  showHelp();
  process.exit(0);
}

let amount = 10;
let format = null;
let out = 'data.out';
let table = 'users';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--amount' && args[i+1]) {
    amount = parseInt(args[i+1], 10);
  }
  if (args[i] === '--format' && args[i+1]) {
    format = args[i+1].toLowerCase();
  }
  if (args[i] === '--out' && args[i+1]) {
    out = args[i+1];
  }
  if (args[i] === '--table' && args[i+1]) {
    table = args[i+1];
  }
}

console.log(`Generating ${amount} records...`);
const data = faker.generateHoneypotData(amount);

if (format === 'csv') {
  if (out === 'data.out') out = 'data.csv';
  faker.exportToCSV(out, data);
} else if (format === 'sql') {
  if (out === 'data.out') out = 'data.sql';
  faker.exportToSQL(table, out, data);
} else {
  console.log(JSON.stringify(data, null, 2));
}
