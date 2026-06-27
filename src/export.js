const fs = require('fs');

function exportToCSV(filename, data) {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Data must be a non-empty array of objects");
    return;
  }
  
  const keys = Object.keys(data[0]);
  const header = keys.join(',') + '\n';
  
  const rows = data.map(obj => {
    return keys.map(k => {
      let val = obj[k] === null || obj[k] === undefined ? '' : obj[k].toString();
      // escape quotes and commas
      if (val.includes(',') || val.includes('"')) {
        val = `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    }).join(',');
  }).join('\n');
  
  fs.writeFileSync(filename, header + rows, 'utf-8');
  console.log(`Successfully exported to ${filename}`);
}

function exportToSQL(tableName, filename, data) {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Data must be a non-empty array of objects");
    return;
  }
  
  const keys = Object.keys(data[0]);
  let sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES\n`;
  
  const rows = data.map(obj => {
    const values = keys.map(k => {
      let val = obj[k];
      if (val === null || val === undefined) return 'NULL';
      if (typeof val === 'string') {
        // escape single quotes
        return `'${val.replace(/'/g, "''")}'`;
      }
      return val;
    });
    return `(${values.join(', ')})`;
  }).join(',\n') + ';';
  
  fs.writeFileSync(filename, sql, 'utf-8');
  console.log(`Successfully exported to ${filename}`);
}

module.exports = {
  exportToCSV,
  exportToSQL
};
