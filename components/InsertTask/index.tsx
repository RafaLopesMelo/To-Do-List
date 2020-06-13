import { FormEvent } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import styles from './InsertTask.module.css';

export default function InsertTask(props: {show: boolean, setShow}) {

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        props.setShow(prev => !prev)
    }

    return (
        <div 
            className={styles.container}
            style={props.show ? {display: 'flex'} : {display: 'none'}}
        >
            <div className={styles.background}></div>
            <div className={styles.taskForm}>
                <h1>Adicione as informações da tarefa!</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Coloque um título!</p>
                        <input type="text" placeholder="Ex: Ler um livro" />
                    </label>
                    <label>
                        <p>Descreva sua tarefa! (opcional)</p>
                        <input type="text" placeholder="Ex: Pelo menos 10 páginas do livro de história" />
                    </label>
                    <button type="submit">
                       <FaArrowRight size={40}/>
                    </button>
                </form>
            </div>
        </div>
    )
}