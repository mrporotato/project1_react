import { useState, useRef, useEffect } from "react"

import './Todos.css'
function Todos() {
    if (sessionStorage.getItem("todoList") === null) {
        sessionStorage.setItem("todoList", [])
    }
    const [todoList, settodoList] = useState(JSON.parse(sessionStorage.getItem("todoList")))
    useEffect(() => {
        sessionStorage.setItem("todoList", JSON.stringify(todoList))
        const arr = JSON.parse(sessionStorage.getItem("todoList"))
        //    settodoList(arr
    }
        , [todoList])
    const textareaValue = useRef()
    function addTodos() {
        if (textareaValue.current.value == "") {
            alert("Không được để trống")
        }
        else {
            settodoList([...todoList, { title: textareaValue.current.value, complete: false }])
            textareaValue.current.value = "";
        }
    }
    function removeTodos(key) {
        var newTodoList = todoList;
        newTodoList.splice(key, 1);
        settodoList([...newTodoList]);
    }
    function updateTodos(key) {
        const newItem = prompt("Chỉnh sửa lại công việc")
        if (newItem == "") {
            alert("Không được để trống")
        }
        else {
            var newTodoList = todoList;
            newTodoList[key].title = newItem;
            settodoList([...newTodoList])
        }
    }
    function setStatusTodo(key, status) {
        var newTodoList = todoList;
        newTodoList[key] = {
            ...newTodoList[key],
            complete: status
        }
        console.log(newTodoList[key]);
        settodoList([...newTodoList])
    }
    return (
        <>
            <div className="container">
                <h1>
                    Todos App
                </h1>
                <textarea ref={textareaValue} placeholder="Công việc cần làm"></textarea><br />
                <button onClick={addTodos}>Thêm</button>
                <table>
                    <tbody>
                        <th>Số thứ tự</th>
                        <th>Công việc</th>
                    </tbody>
                    {todoList.map((todo, key) => {
                        return (
                            <tbody>
                                <td>{key + 1}</td>
                                <td className="todos__content">
                                    <span className="table__todos">{todo.title}</span>
                                    <div>
                                        {todo.complete && <span className="todos__status">Đã hoàn thành</span>}
                                        {!todo.complete && <button
                                            onClick={() => setStatusTodo(key, true)}
                                            className="table__button complete"
                                        >
                                            Hoàn thành</button>}
                                        {todo.complete && <button
                                            onClick={() => setStatusTodo(key, false)}
                                            className="table__button complete"
                                        >
                                            Chưa hoàn thành</button>}
                                        <button
                                            onClick={() => updateTodos(key)}
                                            className="table__button update"
                                        >
                                            Sửa</button>
                                        <button
                                            onClick={() => removeTodos(key)}
                                            className="table__button delete"
                                        >
                                            Xóa</button>
                                    </div>
                                </td>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </>
    )
}
export default Todos