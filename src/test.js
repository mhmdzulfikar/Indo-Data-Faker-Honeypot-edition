// test.js
const { 
  generateNIK, 
  generateNamaIndo, 
  generateIdentity, 
  generateHoneypotData 
} = require('./index.js');

console.log("=== Testing Indo Data Faker (Honeypot Edition) ===");

// 1. Test NIK Realistis
const nik = generateNIK();
console.log(`[TEST] Realistic NIK (length: ${nik.length}): ${nik}`);

// 2. Test Nama
console.log(`[TEST] Random Name: ${generateNamaIndo()}`);

// 3. Test Full Identity
console.log("[TEST] Full Identity Generation:");
console.dir(generateIdentity(), { depth: null, colors: true });

// 4. Test Honeypot Data
console.log("[TEST] Generating Honeypot Data (10 records)...");
const honeypot = generateHoneypotData(10);
console.log(`[TEST] Successfully generated ${honeypot.length} fake identities for decoy.`);