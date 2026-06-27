// decoy.js

function generateHoneypotData(count = 100) {
  // Require inside the function to avoid circular dependency issues at initialization
  const { generateIdentity } = require('./index');
  
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(generateIdentity());
  }
  return data;
}

module.exports = {
  generateHoneypotData
};
