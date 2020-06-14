import { FormEvent, useState, ChangeEvent } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import styles from './styles/AddTask.module.css';
import darkStyles from './styles/DarkAddTask.module.css';

export default function InsertTask(props: {show: boolean, setShow, setTasks, isDark: boolean}) {
    const [ formData, setFormData ] = useState({
        title: '',
        description: ''
    });

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({...formData, [name]: value})
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const id = Math.random() * 1000

        if (formData.title) {
            props.setTasks(prev => 
                [...prev,
                    {
                        id,
                        title: formData.title,
                        description: formData.description
                    }
                ])
            props.setShow(prev => !prev)
        } else {
            alert('Por favor, dê um título a sua tarefa!');
        }

        setFormData({title: "", description:""})
    }

    return (
        <div className={styles.container}>
            <div className={styles.background} onClick={() => props.setShow(prev => !prev)}></div>
            <div className={
                    props.isDark
                        ? darkStyles.darkTaskForm
                        : styles.taskForm
            }>
                <h1>Adicione as informações da tarefa!</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Coloque um título!</p>
                        <input
                            type="text" 
                            placeholder="Ex: Ler um livro"
                            value={formData.title}
                            name="title"
                            onChange={handleInputChange}
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
                       <FaArrowRight size={40}/>
                    </button>
                </form>
            </div>
        </div>
    )
}