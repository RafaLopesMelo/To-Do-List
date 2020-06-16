import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';
import { MenuContext } from "../../contexts/MenuContext"

import { useState, FormEvent, useEffect } from 'react';

import styles from './SideMenu.module.css';

const SideMenu: React.FC = () => {
    const [projects, setProjects] = useState([]);
    const [newProjectName, setNewProjectName] = useState('');
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
            if(toDeleteProject === project) {router.push('/')}
        }
    }

    return (
        <MenuContext.Consumer>
            {({ showMenu, toggleShow }) =>
                <div
                    className={styles.container}
                    style={
                        showMenu
                            ? {}
                            : { width: '0' }
                    }
                >
                    <div>
                        <div className={styles.header}>
                            <h1>Projetos</h1>
                            <FiPlus onClick={toggleShow} />
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
            }
        </MenuContext.Consumer>
    )
}

export default SideMenu;