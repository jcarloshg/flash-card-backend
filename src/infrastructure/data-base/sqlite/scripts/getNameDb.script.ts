export const getNameDbScript = () => {
    const DB_NAME = ".database.sqlite";
    const environment = process.env.NODE_ENV || "development";
    const dbName = `${environment}${DB_NAME}`;
    return dbName;
}