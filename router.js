import { Router } from "express";
import {
  createRank,
  deleteRank,
  editRank,
  getOneRank,
  getRanks,
} from "./handlers/rank.js";

const rankRouter = Router();

rankRouter.get("/", getRanks);
rankRouter.get("/:id", getOneRank);
rankRouter.post("/", createRank);
rankRouter.put("/:id", editRank);
rankRouter.delete("/:id", deleteRank);

export default rankRouter;
