import { useEffect, useState, useContext } from 'react';
import Checkbox from 'react-animated-checkbox';
import { FiPlus } from 'react-icons/fi';

import AddTask from '../AddTask';

import styles from './Tasks.module.css';
import { ThemeContext } from '../ThemeContext';

interface ITask {
    id: string;
    title: string;
    description: string;
    isChecked: boolean;
}

const Tasks: React.FC = () => {
    const [ tasks, setTasks ] = useState<ITask[]>([]);
    const [ showAddTask, setShowAddTask ] = useState(false)

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('tasks'));
        if (data) setTasks(data)
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        const data: ITask[] = JSON.parse(localStorage.getItem('tasks'));

        for(let i=0; i<tasks.length; i++) {
            if(tasks[i].isChecked === true) {
                setTimeout(() => {
                    data.splice(i, 1)
                    setTasks(data)  
                }, 500)      
            }
        }
    }, [tasks])

    async function handleCheckboxClick(id: string) {
        if (id !== undefined) {
            const data: ITask[] = JSON.parse(localStorage.getItem('tasks'));
            const toDeleteTask = data.findIndex((task: ITask) => task.id === id);
            data[toDeleteTask].isChecked = true;
            setTasks(data); 
        }
    }

    return (
        <ThemeContext.Consumer>
            {({theme}) =>
        <main 
            className={styles.todo}
            style={{
                borderColor: theme.borderColor,
                boxShadow: theme.boxShadow
            }}
        >
            <div className={styles.addTask} onClick={() => setShowAddTask(prev => !prev)}>
                <FiPlus />
                <h2>Adicionar nova tarefa</h2>
            </div>

            {tasks.map(task => 
                <div
                    key={task.id} 
                    className={
                        task.isChecked
                        ? `${styles.invisibleTask} ${styles.task}`
                        : styles.task
                    }
                    style={{
                        borderColor: theme.borderColor,
                    }}
                >
                    <div className={styles.taskTitle}>
                    <Checkbox 
                        className={styles.checkbox}
                        checked={task.isChecked}
                        onClick={() => {
                            handleCheckboxClick(task.id)
                        }}
                        checkBoxStyle={{
                            checkedColor: "#34b93d",
                            size: 30,
                            unCheckedColor: "#b8b8b8"
                        }}
                        duration={200}
                    />
                        <h3>{task.title}</h3>
                    </div>
                    {task.description && <p>{task.description}</p>}
                </div>
            )}

            {showAddTask && <AddTask show={showAddTask} setShow={setShowAddTask} setTasks={setTasks}/>}
        </main>
}
        </ThemeContext.Consumer>
    )
}

export default Tasks;