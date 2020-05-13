import React, { forwardRef } from 'react';
import './tvchart.style.scss';

const TvChart = (props, ref) => {
    return (
        <section className="chart" ref={ref}></section>
    )
}

export default forwardRef(TvChart);