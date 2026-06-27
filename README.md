# Indo Data Faker 🇮🇩 (Honeypot & Security Edition)

A robust Node.js package designed to generate highly realistic Indonesian decoy data (Honeypot). This tool can be used to defend against cyber attacks by flooding attackers with fake data, or it can be utilized for standard testing and development purposes.

## Features

- **Realistic Data Generation**: Generates NIK (National Identity Number), NPWP (Taxpayer Identification Number), Phone Numbers, Addresses, Emails, and Full Identities. The generated data is structurally valid and passes standard mathematical formatting checks (e.g., NIK uses proper Province, City, District codes and DOB formulas).
- **Financial & Vehicle Data**: Generate Indonesian Bank Accounts (BCA, Mandiri, BNI, BRI), E-Wallets (GoPay, OVO, DANA, dll), and valid License Plates (Plat Nomor Kendaraan).
- **Honeypot Bulk Generator**: Instantly generate thousands of records to feed to a decoy database (Tarpit/Honeypot).
- **Export Capabilities**: Programmatically export generated arrays of data into `.csv` or `.sql` files for easy database seeding.
- **Express.js Middleware Trap**: Seamless integration with Express.js to automatically intercept unauthorized requests and flood attackers with fake data responses.
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

// Generate a realistic NIK
console.log(faker.generateNIK()); 
// Output: "3171014410900003" (Format: Province, City, District, DOB, Sequence)

// Generate Financial & Vehicle Data
console.log(faker.generateRekeningBank()); // "BCA - 8731920045"
console.log(faker.generateEWallet()); // "GoPay - 08123456789"
console.log(faker.generatePlatNomor()); // "B 1234 XYZ"

// Generate a Full Identity Object
console.log(faker.generateIdentity({ kota: "Surabaya", provinsi: "Jawa Timur" }));
/* Example Output:
{
  id: "34812",
  nik: "3171014410900003",
  nama_lengkap: "Budi Santoso, S.Kom",
  email: "budisantoso321@gmail.com",
  telepon: "08123456789",
  alamat: "Jl. Merdeka No. 42, RT 01/RW 02, Surabaya, Prov. Jawa Timur 10110",
  npwp: "99.999.999.9-999.999",
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

### 4. Express Middleware (Honeypot Trap)

Set up a "Tarpit" or "Honeypot Trap" using the provided middleware. If an attacker scans or tries to extract data from a sensitive-looking endpoint (e.g., `/api/admin/users/dump`), they will be flooded with massive amounts of fake data.

```javascript
const express = require('express');
const { honeypotTrap } = require('indo-data-faker');

const app = express();

// If hackers try to access this, they will be flooded with 10,000 fake records!
app.get('/api/v1/users/admin_dump', honeypotTrap({ amount: 10000 }));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## Contributing
Contributions, issues, and feature requests are welcome!

## License
MIT License