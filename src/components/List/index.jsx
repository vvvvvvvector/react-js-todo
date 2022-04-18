import React from 'react';

import Styles from './List.module.scss';

function List({ items }) {
    return (
        <ul className={Styles.list}>
            {items.map((item) => (
                <li className={item.selected ? Styles.active : null}>
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