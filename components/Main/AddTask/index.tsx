import { FormEvent, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { FaArrowRight } from 'react-icons/fa';

import styles from './AddTask.module.css';
import { ThemeContext } from '../../contexts/ThemeContext';

const AddTask: React.FC<{setShow, setTasks}> = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    const router = useRouter()
    const { project } = router.query

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value })
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const id = Math.random() * 1000

        if (formData.title) {
            props.setTasks(prev =>
                [...prev,
                {
                    id,
                    project: project,
                    title: formData.title,
                    description: formData.description
                }
                ])
            props.setShow(prev => !prev)
        } else {
            alert('Por favor, dê um título a sua tarefa!');
        }

        setFormData({ title: "", description: "" })
    }

    return (
        <ThemeContext.Consumer>
            {({ theme }) =>
                <div className={styles.container}>
                    <div className={styles.background} onClick={() => props.setShow(prev => !prev)}></div>
                    <div
                        className={styles.taskForm}
                        style={{
                            background: theme.background,
                            color: theme.color,
                            borderColor: theme.borderColor,
                            boxShadow: theme.boxShadow
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <h1>Adicione as informações da tarefa!</h1>
                            <label>
                                <p>Coloque um título!</p>
                                <input
                                    type="text"
                                    placeholder="Ex: Ler um livro"
                                    value={formData.title}
                                    name="title"
                                    onChange={handleInputChange}
                                    maxLength={45}
                                    autoComplete="off"
                                    autoFocus
                                />
                            </label>
                            <label>
                                <p>Descreva sua tarefa! (opcional)</p>
                                <input
                                    type="text"
                                    placeholder="Ex: Pelo menos 10 páginas do livro de história"
                                    value={formData.description}
                                    name="description"
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                />
                            </label>
                            <button type="submit">
                                <FaArrowRight />
                            </button>
                        </form>
                    </div>
                </div>
            }
        </ThemeContext.Consumer >
    )
}

export default AddTask;