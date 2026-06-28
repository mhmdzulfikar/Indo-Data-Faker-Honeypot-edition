# Indo Data Faker 🇮🇩 (Honeypot & Security Edition)

[![NPM Version](https://img.shields.io/npm/v/indo-data-faker.svg)](https://www.npmjs.com/package/indo-data-faker)
[![NPM Downloads](https://img.shields.io/npm/dt/indo-data-faker.svg)](https://www.npmjs.com/package/indo-data-faker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A robust Node.js package designed to generate highly realistic Indonesian decoy data (Honeypot). This tool can be used to defend against cyber attacks by flooding attackers with fake data, or it can be utilized for standard testing and development purposes.

## Features

- **Realistic Data Generation**: Generates NIK (National Identity Number), Nomor KK (Family Card), BPJS, NPWP (Taxpayer Identification Number), Resi Kurir (JNE, J&T, dll), Phone Numbers, Addresses, Emails, and Full Identities. The generated data is structurally valid and passes standard mathematical formatting checks.
- **Financial & Vehicle Data**: Generate Indonesian Bank Accounts (BCA, Mandiri, BNI, BRI), E-Wallets (GoPay, OVO, DANA, dll), and valid License Plates (Plat Nomor Kendaraan).
- **Honeypot Bulk Generator**: Instantly generate thousands of records to feed to a decoy database (Tarpit/Honeypot).
- **Export Capabilities**: Programmatically export generated arrays of data into `.csv` or `.sql` files for easy database seeding.
- **Advanced Tarpit & Honeypot**: Seamless integration with Express.js, Fastify, and NestJS to automatically intercept unauthorized requests. Features an extreme `stream` mode (Slowloris) to tie up attackers' connections indefinitely.
- **CLI Support**: Generate data directly from your terminal!
- **TypeScript Support**: Full `.d.ts` typing for excellent autocomplete in modern code editors.

## Installation

Currently in local development. 
```bash
npm install indo-data-faker
```

## Usage Guide

### 1. Generating Individual Data

You can import the module and use the built-in generator functions to create single data points.

```javascript
const faker = require('indo-data-faker');

// Generate a realistic NIK & KK
console.log(faker.generateNIK()); // "3171014410900003"
console.log(faker.generateKK()); // "3171012805900001"

// Generate Financial, Vehicle, & Other Specific Data
console.log(faker.generateRekeningBank()); // "BCA - 8731920045"
console.log(faker.generateEWallet()); // "GoPay - 08123456789"
console.log(faker.generatePlatNomor()); // "B 1234 XYZ"
console.log(faker.generateBPJS()); // "0001234567890"
console.log(faker.generateResi()); // "JB0001234567"

// Generate a Full Identity Object
console.log(faker.generateIdentity({ kota: "Surabaya", provinsi: "Jawa Timur" }));
/* Example Output:
{
  id: "34812",
  nik: "3171014410900003",
  no_kk: "3171012805900001",
  nama_lengkap: "Budi Santoso, S.Kom",
  email: "budisantoso321@gmail.com",
  telepon: "08123456789",
  alamat: "Jl. Merdeka No. 42, RT 01/RW 02, Surabaya, Prov. Jawa Timur 10110",
  npwp: "99.999.999.9-999.999",
  bpjs: "0001234567890",
  agama: "Islam",
  kewarganegaraan: "WNI",
  status_perkawinan: "Belum Kawin",
  rekening_bank: "Mandiri - 13700029319",
  e_wallet: "OVO - 0821938201",
  kendaraan_plat: "L 9382 AB"
}
*/
```

### 2. Exporting Data to CSV & SQL

```javascript
const faker = require('indo-data-faker');
const data = faker.generateHoneypotData(100);

faker.exportToCSV('fake_users.csv', data);
faker.exportToSQL('users', 'seed_users.sql', data);
```

### 3. CLI Usage

You can generate fake data or honeypot dumps directly from your terminal using `npx`.

```bash
# Generate 50 records and print to console
npx indo-data-faker --amount 50

# Export 10,000 records to a CSV file
npx indo-data-faker --amount 10000 --format csv --out my_honeypot.csv

# Export 500 records to an SQL Insert script (for 'users' table)
npx indo-data-faker --amount 500 --format sql --table users --out seed.sql
```

### 4. Honeypot Trap & Slowloris (Express, Fastify, NestJS)

Set up a "Tarpit" or "Honeypot Trap" using the provided middleware. If an attacker scans or tries to extract data from a sensitive-looking endpoint (e.g., `/api/admin/users/dump`), they will be flooded with massive amounts of fake data.

**Advanced Slowloris Mode (`stream: true`)**: Alih-alih me-return payload besar sekaligus, mode ini akan membalas dengan streaming data byte per byte. Ini akan mengikat (hang) koneksi hacker dan membuat mereka frustrasi, cocok untuk tarpit ekstrem.

#### Express.js Example
```javascript
const express = require('express');
const { honeypotTrap } = require('indo-data-faker');

const app = express();

// Standard flood
app.get('/api/admin_dump', honeypotTrap({ amount: 10000 }));

// Slowloris Tarpit (Streams data slowly to hang the attacker's connection)
app.get('/api/secret', honeypotTrap({ 
  amount: 500, 
  stream: true, 
  chunkDelay: 1000, // 1 byte per second
  maxDuration: 60000 // Force close after 60 seconds to save your server resources
}));

app.listen(3000);
```

#### Fastify Example
```javascript
const fastify = require('fastify')();
const { fastifyTrap } = require('indo-data-faker');

fastify.get('/api/admin_dump', fastifyTrap({ amount: 10000, stream: true }));

fastify.listen({ port: 3000 });
```

#### NestJS Example
```typescript
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { nestTrap } from 'indo-data-faker';
import * as express from 'express';

// Example applying globally in main.ts or as specific endpoint middleware
// Di NestJS (berbasis Express), nestTrap mengembalikan Express middleware standar.
// Anda dapat memasangnya via app.use() atau bind ke route tertentu.
```

## Contributing
Contributions, issues, and feature requests are welcome!

## License
MIT License