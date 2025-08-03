import { Express, Router } from "express";

import { createQuestionController } from "@/presentation/controllers/question/create-question.controller";
import { deleteQuestionController } from "@/presentation/controllers/question/delete-question.controller";
import { readAllQuestionController } from "@/presentation/controllers/question/read-all-question.controller";
import { readByIdQuestionController } from "@/presentation/controllers/question/read-by-id-question.controller";
import { updateQuestionController } from "@/presentation/controllers/question/update-question.controller";

export const registerQuestionRoutes = (app: Express) => {

    const questionRouter = Router();

    questionRouter.post("/", createQuestionController);
    questionRouter.get("/", readAllQuestionController);
    questionRouter.get("/:uuid", readByIdQuestionController);
    questionRouter.put("/:uuid", updateQuestionController);
    questionRouter.delete("/:uuid", deleteQuestionController);

    app.use("/api/v1/question", questionRouter);

};
