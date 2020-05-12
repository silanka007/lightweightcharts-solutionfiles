import React, { forwardRef } from 'react';
import './chart.style.scss';

const Chart = (props, ref) => {
    return (
        <div className="chart" ref={ref}></div>
    )
}

export default forwardRef(Chart);