import React from "react";

import Styles from './Badge.module.scss'

function Badge({ color, clickBadge }) {
    return (
        <i onClick={clickBadge} className={`${Styles.badge} ${Styles[`badge--${color}`]}`}></i>
    );
}

export default Badge;