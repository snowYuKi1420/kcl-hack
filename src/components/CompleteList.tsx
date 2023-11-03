import React, { useState } from 'react';

interface Todo {
    task: string;
    isCompleted: boolean;
}

interface CompleteListProps {
    textList: Todo[];
    onDelete: (index: number) => void; 
}

export default function CompleteList({ textList, onDelete }: CompleteListProps) {
    const [editIndex, setEditIndex] = useState(-1);
    const [editedTask, setEditedTask] = useState('');

    const startEdit = (index: number, task: string) => {
        setEditIndex(index);
        setEditedTask(task);
    };

    const finishEdit = () => {
        if (editIndex !== -1) {
            textList[editIndex].task = editedTask;
            setEditIndex(-1);
        }
    };

    return (
        <ul className="">
            {textList.map((todo: Todo, index: number) => (
                <li key={index} className="">
                    {editIndex === index ? (
                        <div>
                            <input
                            type="text"
                            value={editedTask}
                            onChange={(e) => setEditedTask(e.target.value)}
                            />
                            <button onClick={finishEdit}>完了</button>
                        </div>
                    ) : (
                        <div>
                            <span>{todo.task}</span>
                            <button className="" onClick={() => onDelete(index)}>削除</button>
                            <button onClick={() => startEdit(index, todo.task)}>編集</button>
                        </div>                        
                    )}
                    
                </li>
            ))}
        </ul>
    );
}