import React from 'react';
import Badge from '../Badge';

import Styles from './List.module.scss';

function List({ items, addFolderClick }) {
    return (
        <ul onClick={addFolderClick} className={Styles.list}>
            {items.map((item, index) => (
                <li key={index} className={(item.className ? Styles[item.className] : (Styles.active))}>
                    <i>
                        {item.icon ? (item.icon) : (
                            <Badge color={item.badgeColor} />
                        )}
                    </i>
                    <span>{item.name}</span>
                </li>
            ))}
        </ul>
    );
}

export default List;