// middleware.js

function honeypotTrap(options = {}) {
  // By default, flood with 500 fake records
  const amount = options.amount || 500; 
  
  return function(req, res, next) {
    const { generateHoneypotData } = require('./decoy');
    const fakeData = generateHoneypotData(amount);
    
    // Send a realistic looking payload to fool the hacker
    res.status(200).json({
      success: true,
      message: "Data extraction successful",
      total_rows: amount,
      data: fakeData
    });
  };
}

module.exports = {
  honeypotTrap
};
