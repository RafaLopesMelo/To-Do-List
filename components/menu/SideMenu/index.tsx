import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';
import { MenuContext } from "../../contexts/MenuContext"

import { ThemeContext } from '../../contexts/ThemeContext';
import { useState, FormEvent, useEffect } from 'react';

import styles from './SideMenu.module.css';

const SideMenu: React.FC = () => {
    const [projects, setProjects] = useState([]);
    const [showNewProjectInput, setShowNewProjectInput] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');

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
        setShowNewProjectInput(false);
    }

    return (
        <MenuContext.Consumer>
            {({ showMenu }) =>
                <ThemeContext.Consumer>
                    {({ theme }) =>
                        <div
                            className={styles.container}
                            style={
                                showMenu
                                    ? { backgroundColor: theme.background }
                                    : { width: '0', borderColor: '#fefefe', backgroundColor: theme.background }
                            }
                        >
                            <div className={styles.header}>
                                <h1>Projetos</h1>
                                <FiPlus onClick={() => setShowNewProjectInput(prev => !prev)} />
                            </div>
                            <hr style={showMenu ? {} : { borderColor: '#fefefe' }} />

                            {projects.map(project => (
                                <div className={styles.projectContainer}>
                                    <Link href={project}><a style={{color: theme.color}}>{project}</a></Link>
                                </div>
                            ))}

                            {showNewProjectInput &&
                                <form onSubmit={handleNewProject} className={styles.projectForm}>
                                    <input
                                        type="text"
                                        autoFocus
                                        value={newProjectName}
                                        onChange={e => setNewProjectName(e.target.value)}
                                    />
                                    <button type="submit"><FaArrowRight /></button>
                                </form>
                            }
                        </div>
                    }
                </ThemeContext.Consumer>
            }
        </MenuContext.Consumer>
    )
}

export default SideMenu;