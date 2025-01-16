require('dotenv').config();
const { cassandraClient, initializeCassandra } = require('./src/factories/CassandraFactory');
const app = require('./app');
const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await initializeCassandra(cassandraClient);
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch (err) {
        console.error('Error initializing the server:', err);
        process.exit(1);
    }
})();