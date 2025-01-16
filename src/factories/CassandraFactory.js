require('dotenv').config();
const Cassandra = require('cassandra-driver');

const KEYSPACE = process.env.KEYSPACE;
const TABLE = process.env.TABLE;

const CassandraClient = new Cassandra.Client({
  contactPoints: JSON.parse(process.env.CONTACT_POINTS),
  localDataCenter: process.env.LOCAL_DATA_CENTER,
});

const initializeCassandra = async (client) => {
  await client.connect();

  const createKeyspaceQuery = `
    CREATE KEYSPACE IF NOT EXISTS ${KEYSPACE}
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
  `;
  await client.execute(createKeyspaceQuery);

  client.keyspace = KEYSPACE;

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${TABLE} (
      user_id int PRIMARY KEY,
      days_per_week int,
      hours_per_day int,
      availability_start_hour int,
      availability_end_hour int
    );
  `;
  await client.execute(createTableQuery);
};

module.exports = { cassandraClient: CassandraClient, initializeCassandra, KEYSPACE, TABLE };