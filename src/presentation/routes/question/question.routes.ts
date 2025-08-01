import { Express, Router, Request, Response, NextFunction } from "express";
import { createQuestionController } from "../../controllers/question/create-question.controller";
import { readAllQuestionController } from "../../controllers/question/read-all-question.controller";
import { updateQuestionController } from "../../controllers/question/update-question.controller";
import { deleteQuestionController } from "../../controllers/question/delete-question.controller";

/**
 * Minimal example middleware that logs the request method and URL.
 */
const logRequestMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
};

/**
 * Registers question routes with the Express application
 * Implements RESTful API endpoints for question CRUD operations
 * @param app - Express application instance
 */
export const registerQuestionRoutes = (app: Express): void => {
    const questionRouter = Router();

    // POST /api/v1/questions - Create a new question
    questionRouter.post("/", createQuestionController);

    // GET /api/v1/questions - Get all questions
    questionRouter.get("/", logRequestMiddleware, readAllQuestionController);

    // PUT /api/v1/questions/:id - Update a question by UUID
    questionRouter.put("/:id", updateQuestionController);

    // DELETE /api/v1/questions/:id - Delete a question by UUID
    questionRouter.delete("/:id", deleteQuestionController);

    app.use("/api/v1/questions", questionRouter);
};
