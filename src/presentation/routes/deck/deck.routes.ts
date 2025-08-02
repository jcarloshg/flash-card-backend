import { Express, Router } from "express";

import { readAllDeckController } from "@/presentation/controllers/deck/read-all-deck.controller";
import { updateDeckController } from "@/presentation/controllers/deck/update-deck.controller";
import { deleteDeckController } from "@/presentation/controllers/deck/delete-deck.controller";
import { createDeckController } from "@/presentation/controllers/deck/create-deck.controller";

export const registerDeckRoutes = (app: Express): void => {

  const deckRouter = Router();

  deckRouter.post("/", createDeckController);
  deckRouter.get("/", readAllDeckController);
  deckRouter.put("/:id", updateDeckController);
  deckRouter.delete("/:id", deleteDeckController);

  app.use("/api/v1/deck", deckRouter);
};