import sql from "mssql";

const connectionString = process.env.DB_CONNECTION_STRING!;
export const dbPool = new sql.ConnectionPool(connectionString);
