import { useEffect, useState } from 'react';
import Checkbox from 'react-animated-checkbox';
import { FiPlus } from 'react-icons/fi';

import InsertTask from '../AddTask';

import styles from './styles/Tasks.module.css';
import darkStyles from './styles/darkTasks.module.css';

interface ITask {
    id: string;
    title: string;
    description: string;
    isChecked: boolean;
}

export default function Tasks(props :{isDark: boolean}) {
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
        const data: ITask[] = JSON.parse(localStorage.getItem('tasks'));
        const toDeleteTask = data.findIndex((task: ITask) => task.id === id);
        data[toDeleteTask].isChecked = true;
        setTasks(data); 
    }

    return (
        <main className={
            props.isDark
                ? darkStyles.darkTodo
                : styles.todo
            }>
            <div className={styles.addTask} onClick={() => setShowAddTask(prev => !prev)}>
                <FiPlus size={30} />
                <h2>Adicionar nova tarefa</h2>
            </div>

            {tasks.map(task => 
                <div
                    key={task.id} 
                    className={
                        props.isDark
                            ? task.isChecked === true
                                ? `${styles.invisibleTask} ${darkStyles.darkTask}`
                                : darkStyles.darkTask
                            : task.isChecked === true
                                ? `${styles.invisibleTask} ${styles.task}`
                                : styles.task
                    }>
                    <div className={styles.taskTitle}>
                    <Checkbox 
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
                    {task.description && <p>{task.description}</p> }
                </div>
            )}

            <InsertTask show={showAddTask} setShow={setShowAddTask} setTasks={setTasks}/>
        </main>
    )
}