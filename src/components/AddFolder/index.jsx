import React from 'react';
import axios from 'axios';

import Badge from '../Badge';
import List from '../List';

import Styles from './AddFolder.module.scss';

function AddFolder({ badgeColors, addNewFolder }) {
    const [showPopup, setShowPopup] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedColor, setSelectedColor] = React.useState(null);
    const [newFolderName, setNewFolderName] = React.useState('');

    React.useEffect(() => {
        if (badgeColors.length > 0) {
            setSelectedColor(badgeColors[0].id);
        }
    }, [badgeColors]);

    const addFolder = () => {
        if (!newFolderName) {
            alert('you must write folder name');
        } else {
            setIsLoading(true);

            axios.post("http://localhost:3001/folders", { "name": newFolderName, "colorId": selectedColor })
                .then(({ data }) => { // use then -> when request 100% successful
                    addNewFolder(data);
                    setNewFolderName('');
                })
                .catch(() => {
                    alert("error while adding folder!");
                })
                .finally(() => { // no matter true or false
                    setIsLoading(false);
                });
        }
    }

    return (
        <div className={Styles['add-folder']}>
            <List addFolderClick={() => setShowPopup(true)} items={[
                {
                    className: "list__add-button",
                    icon:
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 1V11" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 6H11" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>,
                    name: "Add folder",
                }
            ]} />
            {showPopup && <div className={Styles['add-folder__popup']}>
                <input value={newFolderName} onChange={event => setNewFolderName(event.target.value)} className="textField" input="text" placeholder='Folder name' />
                <svg onClick={() => setShowPopup(false)} width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.315 0C4.62737 0 0 4.62737 0 10.315C0 16.0026 4.62737 20.63 10.315 20.63C16.0026 20.63 20.63 16.0026 20.63 10.315C20.63 4.62737 16.0026 0 10.315 0ZM14.0497 12.928C14.1265 13.0009 14.1879 13.0885 14.2303 13.1855C14.2727 13.2826 14.2952 13.3872 14.2966 13.4931C14.298 13.599 14.2781 13.7041 14.2382 13.8022C14.1983 13.9003 14.1392 13.9894 14.0643 14.0643C13.9894 14.1392 13.9003 14.1983 13.8022 14.2382C13.7041 14.2781 13.599 14.298 13.4931 14.2966C13.3872 14.2952 13.2826 14.2727 13.1855 14.2303C13.0885 14.1879 13.0009 14.1265 12.928 14.0497L10.315 11.4373L7.70203 14.0497C7.55202 14.1922 7.35226 14.2705 7.14536 14.2679C6.93846 14.2652 6.74077 14.1819 6.59446 14.0355C6.44814 13.8892 6.36477 13.6915 6.36212 13.4846C6.35947 13.2777 6.43775 13.078 6.58028 12.928L9.19275 10.315L6.58028 7.70203C6.43775 7.55202 6.35947 7.35226 6.36212 7.14536C6.36477 6.93846 6.44814 6.74077 6.59446 6.59446C6.74077 6.44814 6.93846 6.36477 7.14536 6.36212C7.35226 6.35947 7.55202 6.43775 7.70203 6.58028L10.315 9.19275L12.928 6.58028C13.078 6.43775 13.2777 6.35947 13.4846 6.36212C13.6915 6.36477 13.8892 6.44814 14.0355 6.59446C14.1819 6.74077 14.2652 6.93846 14.2679 7.14536C14.2705 7.35226 14.1922 7.55202 14.0497 7.70203L11.4373 10.315L14.0497 12.928Z" fill="#5C5C5C" />
                </svg>
                <div className={Styles['add-folder__popup-badges']}>
                    {badgeColors.map((color) => (
                        <Badge
                            key={color.id}
                            color={color.name}
                            clickBadge={() => setSelectedColor(color.id)}
                            activeClass={color.id === selectedColor ? Styles.active : null}
                        />
                    ))}
                </div>
                <button onClick={addFolder} className='button'>
                    {isLoading ? "Adding..." : "Add"}
                </button>
            </div>}
        </div>
    );
}

export default AddFolder;