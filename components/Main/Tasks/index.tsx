import { useState, useContext } from 'react';
import Checkbox from 'react-animated-checkbox';
import { FiPlus } from 'react-icons/fi';

import AddTask from '../AddTask';

import styles from './Tasks.module.css';
import { ThemeContext } from '../../contexts/ThemeContext';

import { ITask } from '../../../types';

const Tasks: React.FC<{tasks: ITask[], setTasks: any}> = (props) => {
    const [ showAddTask, setShowAddTask ] = useState(false);
    const themeCtx = useContext(ThemeContext);

    function handleCheckboxClick(id: string) {
        if (id !== undefined) {
            const data: ITask[] = JSON.parse(localStorage.getItem('tasks'));
            const toDeleteTask = data.findIndex((task: ITask) => task.id === id);
            data[toDeleteTask].isChecked = true;
            props.setTasks(data);
        }
    }

    return (
        <main 
            className={styles.todo}
            style={{
                borderColor: themeCtx.theme.borderColor,
                boxShadow: themeCtx.theme.boxShadow
            }}
        >
            <div className={styles.addTask} onClick={() => setShowAddTask(prev => !prev)}>
                <FiPlus />
                <h2>Adicionar nova tarefa</h2>
            </div>

            {props.tasks.map(task => 
                <div
                    key={task.id} 
                    className={
                        task.isChecked
                        ? `${styles.invisibleTask} ${styles.task}`
                        : styles.task
                    }
                    style={{
                        borderColor: themeCtx.theme.borderColor,
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

            {showAddTask && <AddTask setShow={setShowAddTask} setTasks={props.setTasks}/>}
        </main>
    )
}

export default Tasks;