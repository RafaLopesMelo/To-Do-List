import { useEffect, useState } from 'react';
import Switch from 'react-switch';
import { MdSettings } from 'react-icons/md';
import {
    FiTwitter,
    FiInstagram,
    FiLinkedin,
    FiPlus
} from 'react-icons/fi';

import styles from './Home.module.css';
import darkStyles from './DarkHome.module.css';

interface ITask {
    id: string;
    title: string;
    description: string;
}

export default function Home() {
    const [ tasks, setTasks ] = useState<ITask[]>([]);
    const [ isDark, setIsDark ] = useState(false);
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('tasks'));
        if (data) setTasks(data)
    }, []);

    function handleAddTask() {
        const id = String(Math.random() * 10000)
        const title = prompt('Adicione um título à tarefa');

        if (!title) return alert('Título inválido!');

        const description = prompt('Adicione uma descrição à tarefa');

        const newTasks = JSON.parse(localStorage.getItem('tasks')) || []
        newTasks.push({ id, title, description });
        localStorage.setItem('tasks', JSON.stringify(newTasks))

        setTasks(newTasks);
    }

    function handleCheckboxClick(id: string) {
        const data = JSON.parse(localStorage.getItem('tasks'));;
        const toDeleteTask = data.findIndex((task: ITask) => task.id === id);

        data.splice(toDeleteTask, 1);
        localStorage.setItem('tasks', JSON.stringify(data));
        setTasks(data);
    }

    function handleToggleTheme() {
        setIsDark(prev => !prev)
    }

    return (
        <div className={
            isDark
                ? `${darkStyles.container}`
                : `${styles.container}`
        }>
            <nav className={styles.navbar}>
                <h1>Just do it!</h1>
                <div className={styles.menu}>
                    <h2 className={styles.underlined}>Tarefas</h2>
                    <h2>Sobre</h2>
                </div>
                <div className={styles.config}>
                    <MdSettings size={50} />
                    <Switch 
                        onChange={handleToggleTheme}
                        checked={isDark}
                        onColor="#fc5185"
                        offColor="#9e579d"
                    />
                </div>
            </nav>

            <main className={
                isDark 
                    ? darkStyles.todo
                    : styles.todo
                }>
                <div className={styles.addTask} onClick={handleAddTask}>
                    <FiPlus size={30} />
                    <h2>Adicionar nova tarefa</h2>
                </div>

                {tasks.map(task => 
                    <div 
                        key={task.id} 
                        className={isDark
                            ? darkStyles.task
                            : styles.task
                    }>
                        <div className={styles.taskTitle}>
                        <input type="checkbox" onClick={() => handleCheckboxClick(task.id)}/>
                            <h3>{task.title}</h3>
                        </div>
                        {task.description && <p>{task.description}</p> }
                    </div>
                )}
            </main>


            <footer className={styles.footerbar}>
                <div>
                    <a href="https://twitter.com/RafaScriptMelo" target="blanck"><FiTwitter /></a>
                    <a href="https://www.instagram.com/rafa.lopesmelo/" target="blanck"><FiInstagram /></a>
                    <a href="https://www.linkedin.com/in/rafael-melo-4506a81a5/" target="blanck"><FiLinkedin /></a>
                </div>
            </footer>
        </div>
    )
}