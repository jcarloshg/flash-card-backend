
import { Express, Request, Response } from "express";
import { enviromentVariables } from "../../../shared/config/enviroment-variables";

/**
 * Registers helper routes to the Express app (health check, root info).
 * @param app - Express application instance
 */
export const createHelperRoutes = (app: Express): void => {
    /**
     * Health check endpoint
     * GET /health
     */
    app.get("/health", (req: Request, res: Response): void => {
        res.json({
            status: "OK",
            timestamp: new Date().toISOString(),
            environment: enviromentVariables.nodeEnv,
            version: process.env.npm_package_version || "1.0.0",
        });
    });

    /**
     * Root endpoint info
     * GET /
     */
    app.get("/", (req: Request, res: Response): void => {
        res.json({
            message: "Welcome to the DDD Express.js API!",
            timestamp: new Date().toISOString(),
            documentation: "/docs",
            health: "/health",
        });
    });
};
