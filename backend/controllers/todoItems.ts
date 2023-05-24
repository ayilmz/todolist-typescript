import ToDoItemModel from "../models/todoItems";
import {RequestHandler} from "express";

export const getItems:RequestHandler = async (req, res, next) => {
    try {
        const todoItems = await ToDoItemModel.find().exec();
        res.status(200).json(todoItems);
    }catch (error) {
        next(error)
    }
};
export const getItem:RequestHandler = async (req, res, next) => {
    const itemId = req.params.itemId;

    try {
        const item = await ToDoItemModel.findById(itemId).exec()
        res.status(200).json(item)

    }catch (error) {
        next(error)
    }
};
export const createItem:RequestHandler = async (req, res, next) => {
    const item = req.body.item;

    console.log('item', item)

    try{
        const newItem = await ToDoItemModel.create({
            item: item
        });
        res.status(201).json(newItem)
    }catch (error) {
        next(error)
    }
}
interface UpdateItemParams {
    itemId: string
}
interface UpdateItemBody {
    item?:string
}
export const updateItem:RequestHandler<UpdateItemParams, unknown, UpdateItemBody, unknown> = async (req, res, next) => {
    const itemId = req.params.itemId;
    const newItem = req.body.item;
    try {

        const willUpdate = await ToDoItemModel.findById(itemId).exec();
        willUpdate?.set({"item": newItem})

        const updatedItem = await willUpdate?.save();
        res.status(200).json(updatedItem)
    }catch (error) {
        next(error)
    }
}