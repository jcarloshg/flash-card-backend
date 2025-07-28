import { Express, Request, Response } from "express";
import { enviromentVariables } from "../../../shared/config/enviroment-variables";

export const createHelperRoutes = (app: Express) => {
    app.get("/health", (req: Request, res: Response) => {
        res.json({
            status: "OK",
            timestamp: new Date().toISOString(),
            environment: enviromentVariables.nodeEnv,
            version: process.env.npm_package_version || "1.0.0",
        });
    });

    app.get("/", (req: Request, res: Response) => {
        res.json({
            message: "Welcome to the DDD Express.js API!",
            timestamp: new Date().toISOString(),
            documentation: "/docs",
            health: "/health",
        });
    });
};
