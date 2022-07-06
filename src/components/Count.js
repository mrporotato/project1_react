import { useState, useRef, useEffect } from "react"

import './Count.css'
function Count() {
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
        settodoList([...todoList, textareaValue.current.value])
        textareaValue.current.value = "";
    }
    function removeTodos(key) {
        var newTodoList = todoList;
        newTodoList.splice(key, 1);
        settodoList([...newTodoList]);
    }
    function updateTodos(key) {
        const newItem = prompt("Chỉnh sửa lại công việc")
        var newTodoList = todoList;
        newTodoList[key] = newItem;
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
                                <td>
                                    <span className="table__todos">{todo}</span>
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
                                </td>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </>
    )
}
export default Count