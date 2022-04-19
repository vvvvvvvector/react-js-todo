import React from "react";

import Styles from './Badge.module.scss'

function Badge({ color, clickBadge, activeClass }) {
    return (
        <i onClick={clickBadge} className={`${Styles.badge} ${Styles[`badge--${color}`]} ${activeClass}`}></i>
    );
}

export default Badge;