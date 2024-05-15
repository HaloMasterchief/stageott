// controllers/myListController.ts
import { Request, Response } from "express";
import MyListItem from "../models/MyListItem";

const myListController = {
  addToMyList: async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { contentId } = req.body;

    try {
      const existingItem = await MyListItem.findOne({ userId, contentId });
      if (existingItem) {
        return res
          .status(400)
          .json({ message: "Item already exists in the list" });
      }

      const newItem = new MyListItem({ userId, contentId });
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      console.error("Error adding item to list:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  removeFromMyList: async (req: Request, res: Response) => {
    const { userId, contentId } = req.params;

    try {
      const deletedItem = await MyListItem.findOneAndDelete({
        userId,
        contentId,
      });
      if (!deletedItem) {
        return res.status(404).json({ message: "Item not found in the list" });
      }
      res.json(deletedItem);
    } catch (error) {
      console.error("Error removing item from list:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  listMyItems: async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { page = 1, limit = 10 }: { page?: number; limit?: number } =
      req.query;
    const skip = (page - 1) * limit;

    try {
      const startTime = Date.now();
      const items = await MyListItem.find({ userId }).skip(skip).limit(limit);
      const queryTime = Date.now() - startTime;
      console.log(`List My Items query execution time: ${queryTime}ms`);

      res.json(items);
    } catch (error) {
      console.error("Error listing items:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default myListController;
