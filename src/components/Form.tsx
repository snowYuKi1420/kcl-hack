import React, { useState } from 'react';
import CompleteList from "../components/CompleteList";

interface Todo {
    task: string;
    isCompleted: boolean;
}

export default function Form() {
    const [todoText, setTodoText] = useState<string>('');
    const [textList, setTextList] = useState<Todo[]>([]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTodo: Todo = {
            task: todoText,
            isCompleted: false
        };
        setTextList(prevTextList => [...prevTextList, newTodo]);
        setTodoText('');
    };

    const handleDelete = (index: number) => {
        setTextList(prevTextList => {
            const updatedList = [...prevTextList];
            updatedList.splice(index, 1);
            return updatedList;
        });
    };

    return (
        <div className="">
            <div className="">
                <form onSubmit={handleSubmit}>
                    <input type="text" 
                    className=""
                    placeholder="タスクを入力してください"
                    value={todoText}
                    onChange={handleInputChange}
                    />
                    <button className="" type="submit">追加する</button>
                </form>
            </div>
            <CompleteList textList={textList} onDelete={handleDelete}/>
        </div>
    );
}