import { useState, FormEvent, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';
import { MenuContext } from "../../contexts/MenuContext"

import styles from './SideMenu.module.css';

import { ITask } from '../../../types';

const SideMenu: React.FC = () => {
    const [projects, setProjects] = useState([]);
    const [newProjectName, setNewProjectName] = useState('');
    const menuCtx = useContext(MenuContext)
    const router = useRouter()
    const { project } = router.query

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('projects'));
        if (data) setProjects(data)
    }, [])

    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects])

    function handleNewProject(event: FormEvent) {
        event.preventDefault()
        if (newProjectName) {
            setProjects(prev => [...prev, newProjectName])
            setNewProjectName('')
        }
    }

    function handleDeleteProject(toDeleteProject: string) {
        const confirmation = confirm('Tem certeza que deseja excluir este projeto?')

        if (confirmation) {
            const data: string[] = JSON.parse(localStorage.getItem('projects'));
            const index = data.indexOf(toDeleteProject);
            data.splice(index, 1)
            setProjects(data);
            if (toDeleteProject === project) { router.push('/') }

            const tasks: ITask[] = JSON.parse(localStorage.getItem('tasks'));
            const toDeleteTasks = tasks.filter(task => task.project !== toDeleteProject)
            localStorage.setItem('tasks', JSON.stringify(toDeleteTasks))
        }
    }

return (
    <div
        className={styles.container}
        style={
            menuCtx.showMenu
                ? {}
                : { width: '0' }
        }
    >
        <div>
            <div className={styles.header}>
                <h1>Projetos</h1>
                <FiPlus onClick={menuCtx.toggleShow} />
            </div>

            {projects.map(project => (
                <div className={styles.projectContainer} key={project}>
                    <Link href={project}><a>{project}</a></Link>
                    <FiTrash2 onClick={() => handleDeleteProject(project)} />
                </div>
            ))}
        </div>
        <form onSubmit={handleNewProject} className={styles.projectForm}>
            <input
                type="text"
                placeholder='Adicionar Projeto'
                maxLength={20}
                autoFocus
                value={newProjectName}
                onChange={e => setNewProjectName(e.target.value)}
            />
            <button type="submit"><FaArrowRight /></button>
        </form>
    </div>
)
}

export default SideMenu;