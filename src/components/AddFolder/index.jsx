import React from 'react';

import Badge from '../Badge';
import List from '../List';

import Styles from './AddFolder.module.scss';

function AddFolder({ badgeColors }) {
    const [showPopup, setShowPopup] = React.useState(false);

    return (
        <div className={Styles['add-folder']}>
            <List addFolderClick={() => setShowPopup(!showPopup)} items={[
                {
                    className: "list__add-button",
                    icon:
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 1V11" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 6H11" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>,
                    title: "Add folder",
                }
            ]} />
            {showPopup && <div className={Styles['add-folder__popup']}>
                <input className="textField" input="text" placeholder="Folder name" />
                <div className={Styles['add-folder__popup-badges']}>
                    {badgeColors.map((color) => (
                        <Badge clickBadge={() => alert(color.id)} key={color.id} color={color.name} />
                    ))}
                </div>
                <button className='button'>Add</button>
            </div>}
        </div>
    );
}

export default AddFolder;