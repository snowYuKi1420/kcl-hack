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

    const updateTask = async () => {
        if (editedTask === '') {
            alert('テキストが空です')
            return
        }
        try {
            // PUTリクエストを送信
            const response = await fetch('/api/sample/posts', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: editIndex,
                content: editedTask,
              }),
            });
            const data = await response.json();
            if (response.ok) {
              // POSTが成功した場合の処理
              setEditIndex(-1);
              console.log('更新に成功しました！')
            } else {
              // POSTが失敗した場合の処理
              console.error(response.statusText, data.message)
            }
          } catch (error) {
            // エラーハンドリング
            console.error(error);
          }
    }

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
                            <button onClick={updateTask}>完了</button>
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