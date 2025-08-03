import { Express, Router } from "express";

import { createDeckController } from "@/presentation/controllers/deck/create-deck.controller";
import { readAllDeckController } from "@/presentation/controllers/deck/read-all-deck.controller";
import { readByIdDeckController } from "@/presentation/controllers/deck/read-by-id-deck.controller";
import { updateDeckController } from "@/presentation/controllers/deck/update-deck.controller";
import { deleteDeckController } from "@/presentation/controllers/deck/delete-deck.controller";

export const registerDeckRoutes = (app: Express): void => {

  const deckRouter = Router();


  deckRouter.post("/", createDeckController);
  deckRouter.get("/", readAllDeckController);
  deckRouter.get("/:uuid", readByIdDeckController);
  deckRouter.put("/:uuid", updateDeckController);
  deckRouter.delete("/:uuid", deleteDeckController);

  app.use("/api/v1/deck", deckRouter);
};