import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import styles from "./Todo.module.scss"


const Todo = ({todo, setTodo}) => { 
    const [value, setValue] = React.useState('');
    const [filtered, setFiltered] = React.useState(todo)

    useEffect(() => {
        setFiltered(todo)
    }, [todo])

    function todoFilter(status) {
        if(status === 'all') {
            setFiltered(todo)
        } else {
            let newTodo = [...todo].filter( item => item.status === status);
            setFiltered(newTodo)
        }
    }
    function deleteTodo(id) {
       let newTodo = [...todo].filter(item => item.id !== id)
       setTodo(newTodo)
    }

    function statusTodo(id) {
        let newTodo = [...todo].filter(item => {
            if(item.id === id ) {
                item.status = !item.status
            }
            return item
    });
        setTodo(newTodo);
    }

    function saveTodo() {
        setTodo(
            [...todo, {
                id:uuidv4(),
                title: value,
                status: false
            }].reverse()
        )
        setValue('')
    }

    

  return <div className={styles.todo}>

            <h1>Список дел</h1>
            <div className={styles.change}>
                <input value={value}  type="text" placeholder="Добавить список" onChange={(e) => setValue(e.target.value)}/>
            <div className={styles.buttons}>
                <button onClick={ () => saveTodo()}>Добавить</button>
            </div>
            </div>
            <div className={styles.buttons}>
                <button onClick={() => todoFilter('all')}>Все</button>
                <button onClick={() => todoFilter(false)}>В процессе</button>
                <button onClick={() => todoFilter(true)}>Выполнено</button>
            </div>
            {
            filtered.map((item, id )=> <div key={item.id}>
            <ul className={styles.todos}>
                <li>
                    <span onClick={() => statusTodo(item.id)} className={styles.todoTrash}>
                        {
                            item.status === false ? <span>▢</span> : <span>☑</span>
                        }
                    </span>
                    <span className={styles.todoText}>{item.title}</span>
                    <span onClick={() => deleteTodo(item.id)} className={styles.todoTrash}><i className="fas fa-trash-alt"></i></span>
                   
                </li>
            </ul>
            </div>
            )}
            
            
  </div>
}

export default Todo