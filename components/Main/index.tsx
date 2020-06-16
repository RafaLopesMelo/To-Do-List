import { useRouter } from 'next/router';

import Tasks from './Tasks';
import SideMenu from '../menu/SideMenu';

import styles from './Main.module.css';
import { useEffect, useState } from 'react';

interface ITask {
    id: string;
    title: string;
    description: string;
    isChecked: boolean;
    project?: string;
}

const Main = () => {
    const [ tasks, setTasks ] = useState<ITask[]>([]);
    const router = useRouter()
    const { project } = router.query;

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

    return (
        <div className={styles.main}>
            <SideMenu />
            <Tasks 
                tasks={
                    project
                        ? tasks.filter(task => task.project === project)
                        : tasks.filter(task => task.project === undefined)
                } 
                setTasks={setTasks}
            />
        </div>
    )
}

export default Main;