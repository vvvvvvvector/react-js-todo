import React from 'react';

import Styles from './AddTask.module.scss';

function AddTask() {
    const [showMenu, setShowMenu] = React.useState(false);
    const [newTaskText, setNewTaskText] = React.useState('');

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
                        <button className='button'>Add task</button>
                        <button className='button button--cancel' onClick={() => { setShowMenu(!showMenu); setNewTaskText('') }}>Cancel</button>
                    </div>)
            }
        </div>
    );
}

export default AddTask;