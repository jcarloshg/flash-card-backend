// Application configuration interface
export interface AppConfig {
  port: number;
  nodeEnv: string;
  database: DatabaseConfig;
  jwt?: JWTConfig;
  cors: CORSConfig;
  logging: LoggingConfig;
  dataBaseSql: DataBaseSql;
}

export interface DataBaseSql {
  DB_SQL_URL: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
  ssl?: boolean;
  maxConnections?: number;
  sqlite: SQLiteConfig;
}

export interface SQLiteConfig {
  path: string;
  enableWAL?: boolean;
  busyTimeout?: number;
  maxConnections?: number;
}

export interface JWTConfig {
  secret: string;
  expiresIn: string;
  refreshExpiresIn: string;
}

export interface CORSConfig {
  origin: string[];
  credentials: boolean;
}

export interface LoggingConfig {
  level: "error" | "warn" | "info" | "debug";
  format: "json" | "simple";
}

class EnviromentVariables {
  private static instance: AppConfig;

  public static load(): AppConfig {
    if (!this.instance) {
      this.instance = {
        port: parseInt(process.env.PORT || "3000"),
        nodeEnv: process.env.NODE_ENV || "development",
        database: {
          host: process.env.DB_HOST || "localhost",
          port: parseInt(process.env.DB_PORT || "5432"),
          name: process.env.DB_NAME || "app_db",
          username: process.env.DB_USERNAME || "postgres",
          password: process.env.DB_PASSWORD || "password",
          ssl: process.env.DB_SSL === "true",
          maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || "10"),
          sqlite: {
            path: process.env.SQLITE_DB_PATH || "./data/database.sqlite",
            enableWAL: process.env.SQLITE_ENABLE_WAL === "true",
            busyTimeout: parseInt(process.env.SQLITE_BUSY_TIMEOUT || "5000"),
            maxConnections: parseInt(process.env.SQLITE_MAX_CONNECTIONS || "1"),
          },
        },
        jwt: process.env.JWT_SECRET
          ? {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN || "15m",
            refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
          }
          : undefined,
        cors: {
          origin: process.env.CORS_ORIGIN?.split(",") || ["*"],
          credentials: process.env.CORS_CREDENTIALS === "true",
        },
        logging: {
          level: (process.env.LOG_LEVEL as any) || "info",
          format: (process.env.LOG_FORMAT as any) || "json",
        },
        dataBaseSql: {
          DB_SQL_URL: process.env.DB_SQL_URL || "NOT-FOUND",
        },
      };
    }
    console.log(`[this.instance] -> `, this.instance);
    return this.instance;
  }
}

export const enviromentVariables = EnviromentVariables.load();
