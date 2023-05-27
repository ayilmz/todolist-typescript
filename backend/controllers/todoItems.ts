import ToDoItemModel from "../models/todoItems";
import {RequestHandler} from "express";

export const getItems:RequestHandler = async (req, res, next) => {
    try {
        const todoItems = await ToDoItemModel.find({});
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
    try {

        await ToDoItemModel.findByIdAndUpdate(req.params.itemId, {$set: req.body});
        res.status(200).json('Item Updated')
    }catch (error) {
        next(error)
    }
}

export const deleteItem: RequestHandler = async (req, res, next) => {
    const itemId = req.params.itemId;

    try{
        await ToDoItemModel.findByIdAndDelete(itemId);
        res.sendStatus(200).json('Item Deleted')

    }catch (error) {
        next(error)
    }
}