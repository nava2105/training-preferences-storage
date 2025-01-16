const { authenticate } = require('../services/AuthenticationService');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid Authorization header' });
  }
  try {
    // Call the `authenticate` function and ensure it resolves successfully
    const authResult = await authenticate(authHeader);

    // If the response from `authenticate` indicates failure, immediately stop further processing
    if (!authResult || authResult.error) {
      return res.status(403).json({ error: 'Forbidden: Authentication failed' });
    }
    req.userId = authResult.data.userId;
    // If authentication is successful, proceed
    next();
  } catch (err) {
    // Log any uncaught exceptions and respond with a generic error message
    console.error('Error during authentication:', err.message);
    return res.status(500).json({ error: 'Internal server error during authentication' });
  }
};