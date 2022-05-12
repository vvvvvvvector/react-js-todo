import React from 'react';
import axios from 'axios';

import Styles from './AddTask.module.scss';

function AddTask({ folder, onAddTask }) {
    const [showMenu, setShowMenu] = React.useState(false);
    const [newTaskText, setNewTaskText] = React.useState('');
    const [isPostingTask, setIsPostingTask] = React.useState(false);

    const addTask = () => {
        const task = { folderId: folder.id, text: newTaskText, completed: false };

        if (newTaskText.length > 0) {
            setIsPostingTask(true);
            axios.post("http://localhost:3001/tasks", task)
                .then(({ data }) => {
                    onAddTask(folder.id, data);
                    setShowMenu(!showMenu);
                    setNewTaskText('');
                })
                .catch(() => {
                    alert("error while adding task!");
                }).finally(() => {
                    setIsPostingTask(false);
                });
        } else {
            alert("you must write task text!");
        }
    }

    return (
        <div className={Styles['add-task']}>
            {
                showMenu === false ? (
                    <div onClick={() => setShowMenu(!showMenu)} className={Styles['add-task__plus']}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 1V15" stroke="#B4B4B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 8H15" stroke="#B4B4B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>new task</span>
                    </div>) : (
                    <div className={Styles['add-task__menu']}>
                        <input className='textField' value={newTaskText} onChange={(event) => setNewTaskText(event.target.value)} type="text" placeholder="Task text" />
                        <button disabled={isPostingTask} onClick={addTask} className='button'>{!isPostingTask ? "Add task" : "Adding..."}</button>
                        <button className='button button--cancel' onClick={() => { setShowMenu(!showMenu); setNewTaskText('') }}>Cancel</button>
                    </div>)
            }
        </div>
    );
}

export default AddTask;