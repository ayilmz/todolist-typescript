import {useEffect, useState} from 'react'
import {Item as ItemModel} from "./models/item";
import axios from "axios";
import './App.css'
function App() {
    const [items, setItems] = useState<ItemModel[]>([])
    const [inputText, setInputText] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState<string>('');
    const [updateItemText, setUpdateItemText] = useState<string>('');
    const localURL = "http://localhost:5500";

    useEffect(() => {
        getAllItems()
    },[])
    const getAllItems = async ():Promise<ItemModel> => {
        const response =  await axios.get(`${localURL}/api/items`);
        setItems(response.data)
    }
    const createItem = async (item) => {
        item.preventDefault();
        const response = await axios.post(`${localURL}/api/items`, { item: item.target[0].value });
        setItems((prev) => [...prev, response.data]);
        setInputText("");
    }
    const deleteItem = async (_id) => {
        const res = await axios.delete(`${localURL}/api/items/${_id}`);
        const newListItems = items.filter((item) => item._id !== _id);
        setItems(newListItems);
    }
    const updateItem = async (item):Promise<ItemModel> => {
        item.preventDefault();
        if(updateItemText){
            const res = await axios.patch(`http://localhost:5500/api/items/${isUpdating}`, {
                item: updateItemText,
            });
            const updatedItemIndex = items.findIndex(
                (item) => item._id === isUpdating
            );
            items[updatedItemIndex].item = updateItemText;
            setUpdateItemText('');
            setIsUpdating('');
        }
    }
    const updateItemElement = (item) =>{
        return(
            <form
                onSubmit={(e) => {
                    updateItem(e);
                }}
            >
                <input
                    className="update-new-input"
                    type="text"
                    placeholder={item}
                    onChange={(e) => {
                        setUpdateItemText(e.target.value);
                    }}
                    value={updateItemText}
                />
                <button className="update-new-btn" type="submit">
                    Update
                </button>
            </form>
        )
    }

  return (
    <div className="App">
        <h2>Todo List</h2>
        <form className="add-item-form" onSubmit={(item) => createItem(item)}>
            <input
                type="text"
                placeholder="Add New Item"
                onChange={(e) => {
                    setInputText(e.target.value);
                }}
                value={inputText}
            />
            <button type="submit">Add</button>
        </form>
        <hr/>
        {
            items.map(item => (
                <div key={item._id} className="item-list">
                    {
                        isUpdating === item._id ? (
                            updateItemElement(item.item)
                        ): (
                            <div>
                                <span>{item.item}</span>
                                <button onClick={() => {deleteItem(item._id);}}>Delete</button>
                                <button onClick={() => {setIsUpdating(item._id);}}>Update</button>
                            </div>
                        )
                    }
                </div>
            ))
        }
    </div>
  )
}

export default App
