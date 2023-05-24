import {Schema, InferSchemaType, model} from "mongoose";

const todoItemsSchema = new Schema({
    item:{
        type:String,
        required: true
    }
}, {timestamps: true});

type toDoItem = InferSchemaType <typeof todoItemsSchema>

export default model<toDoItem>("toDoItem", todoItemsSchema)