import React from 'react';

import Styles from './List.module.scss';

function List({ items }) {
    return (
        <ul className={Styles.list}>
            {items.map((item, index) => (
                <li key={index} className={(item.className ? Styles[item.className] : (Styles.active))}>
                    <i>
                        {item.icon ? (item.icon) : (
                            <i className={`${Styles.badge} ${Styles[`badge--${item.color}`]}`}></i>)}
                    </i>
                    <span>{item.title}</span>
                </li>
            ))}
        </ul>
    );
}

export default List;