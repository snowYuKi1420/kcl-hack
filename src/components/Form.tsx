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

    const submitTask = async () => {
        // 入力が空の場合は知らせる
        if (todoText === '') {
          alert('テキストが空です')
          return
        }
        try {
          // POSTリクエストを送信
          const response = await fetch('/api/sample/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todoText }),
          });
          const data = await response.json();
          if (response.ok) {
            // POSTが成功した場合の処理
            setTodoText('')
            console.log('投稿に成功しました！')
          } else {
            // POSTが失敗した場合の処理
            console.error(response.statusText, data.message);
          }
        } catch (error) {
          // エラーハンドリング
          console.error(error);
        }
      }

    const deleteTask = async (index: number) => {
        try {
          // DELETEリクエストを送信
          const response = await fetch(`/api/posts?id=${index}`, {
            method: 'DELETE',
          });
          const data = await response.json();
          if (response.ok) {
            // 削除が成功した場合の処理
            console.log('削除に成功しました！');
          } else {
            // 削除が失敗した場合の処理
            console.error(response.statusText, data.message);
          }
        } catch (error) {
          // エラーハンドリング
          console.error(error);
        }
      }

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
            <CompleteList textList={textList} onDelete={deleteTask}/>
        </div>
    );
}