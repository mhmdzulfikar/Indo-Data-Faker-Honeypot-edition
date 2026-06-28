// middleware.js

function honeypotTrap(options = {}) {
  const amount = options.amount || 500;
  const stream = options.stream || false;
  const chunkDelay = options.chunkDelay || 1000; // ms between chunks
  const maxDuration = options.maxDuration || 60000; // max tarpit duration in ms

  return function(req, res, next) {
    const { generateHoneypotData } = require('./decoy');
    const fakeData = generateHoneypotData(amount);

    if (stream) {
      // Slowloris Tarpit mode
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      const payloadString = JSON.stringify({
        success: true,
        message: "Data extraction successful",
        total_rows: amount,
        data: fakeData
      });
      
      let cursor = 0;
      let intervalId;
      
      // Stop streaming if client disconnects
      req.on('close', () => {
        clearInterval(intervalId);
      });

      // Also set a max duration to prevent infinite hanging connections
      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        if (!res.writableEnded) res.end();
      }, maxDuration);

      intervalId = setInterval(() => {
        if (cursor < payloadString.length) {
          // Send 1 byte at a time
          res.write(payloadString[cursor]);
          cursor++;
        } else {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
          if (!res.writableEnded) res.end();
        }
      }, chunkDelay);

    } else {
      res.status(200).json({
        success: true,
        message: "Data extraction successful",
        total_rows: amount,
        data: fakeData
      });
    }
  };
}

function fastifyTrap(options = {}) {
  const amount = options.amount || 500;
  const stream = options.stream || false;
  const chunkDelay = options.chunkDelay || 1000;
  const maxDuration = options.maxDuration || 60000;

  return async function(request, reply) {
    const { generateHoneypotData } = require('./decoy');
    const fakeData = generateHoneypotData(amount);
    
    if (stream) {
      reply.type('application/json').code(200);
      const payloadString = JSON.stringify({
        success: true,
        message: "Data extraction successful",
        total_rows: amount,
        data: fakeData
      });
      
      // Fastify raw response
      const res = reply.raw;
      const req = request.raw;
      
      let cursor = 0;
      let intervalId;
      
      req.on('close', () => {
        clearInterval(intervalId);
      });

      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        if (!res.writableEnded) res.end();
      }, maxDuration);

      intervalId = setInterval(() => {
        if (cursor < payloadString.length) {
          res.write(payloadString[cursor]);
          cursor++;
        } else {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
          if (!res.writableEnded) res.end();
        }
      }, chunkDelay);
      
      // Tell fastify we'll handle the response
      reply.hijack();
    } else {
      reply.code(200).send({
        success: true,
        message: "Data extraction successful",
        total_rows: amount,
        data: fakeData
      });
    }
  };
}

// For NestJS, developers can use honeypotTrap directly in app.use()
// We'll provide a NestJS friendly wrapper function
function nestTrap(options = {}) {
  // NestJS uses Express by default, so we can just return the express middleware
  return honeypotTrap(options);
}

module.exports = {
  honeypotTrap,
  fastifyTrap,
  nestTrap
};
