import {useState } from "react";
import Todo from "./components/Todo/Todo";

const App = () => {
    const [todo, setTodo] = useState([
        {
            id:1,
            title: 'Test',
            status: false
        },
    ])
    return <Todo todo={todo} setTodo={setTodo} />
}

export default App;