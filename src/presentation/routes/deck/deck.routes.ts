import { Express, Router } from "express";
import { createDeckController } from "@/presentation/controllers/deck/create-deck.controller";
import { readAllDeckController } from "@/presentation/controllers/deck/read-all-deck.controller";
import { updateDeckController } from "@/presentation/controllers/deck/update-deck.controller";
import { deleteDeckController } from "@/presentation/controllers/deck/delete-deck.controller";

const deckRouter = Router();

deckRouter.post("/", createDeckController);
deckRouter.get("/", readAllDeckController);
deckRouter.put("/:id", updateDeckController);
deckRouter.delete("/:id", deleteDeckController);

export default (app: Express): void => {
  app.use("/api/v1/deck", deckRouter);
};
