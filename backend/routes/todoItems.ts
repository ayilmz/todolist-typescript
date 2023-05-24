import express from "express";
import * as ToDoItemController from '../controllers/todoItems'

const router = express.Router();

router.get("/", ToDoItemController.getItems);

router.get("/:itemId", ToDoItemController.getItem);




router.post("/", ToDoItemController.createItem);

router.patch("/:itemId", ToDoItemController.updateItem);

export default router;