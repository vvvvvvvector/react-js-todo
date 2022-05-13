import React from 'react';
import axios from 'axios';

import AddTask from '../AddTask';
import Task from './Task';

import Styles from './Tasks.module.scss';

function Tasks({ folder, onEditTitle, onAddTask, isFolderEmpty = false, showAddTask = true }) {
    const editTitle = () => {
        const newName = window.prompt("The folder name:", folder.name);
        if (newName) {
            onEditTitle(folder.id, newName);
            axios.patch(`http://localhost:3001/folders/${folder.id}`, { // updating title in database
                name: newName
            }).catch(() => {
                alert("Error while updating folder name!");
            });
        } else if (newName.length == 0) {
            alert("The folder name shouldn't be empty!");
        }
    }

    return (
        <div className={Styles['tasks']}>
            {!isFolderEmpty && <h2 className={`${Styles['tasks__title']} ${Styles[`tasks__title--${folder.color.name}`]}`}>
                {folder.name}
                <svg onClick={editTitle} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9337 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.6379 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.11 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825Z" fill="#DFDFDF" />
                </svg>
            </h2>}

            {!isFolderEmpty && <div className={Styles['tasks__items']}>
                {
                    folder.tasks.length == 0 ? (<div className={Styles['tasks__items-empty']}>
                        <h2>No tasks in folder</h2>
                        <AddTask folder={folder} onAddTask={onAddTask} />
                    </div>) : (
                        <React.Fragment>
                            {
                                folder.tasks.map((task) => (
                                    <Task key={task.id} {...task} />
                                ))
                            }
                            {showAddTask && <AddTask folder={folder} onAddTask={onAddTask} />}
                        </React.Fragment>
                    )
                }
            </div>}
        </div>
    );
}

export default Tasks;