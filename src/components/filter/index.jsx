import React from 'react';

import './filter.style.scss';

const Filter = () => {
    return (
        <section className="filter">
            <ul className="filter-list">
                <li><button className="filter-list-item">zoom</button> </li>
                <li><button className="filter-list-item">1d</button></li>
                <li><button className="filter-list-item">7d</button></li>
                <li><button className="filter-list-item">1m</button></li>
                <li><button className="filter-list-item">3m</button></li>
                <li><button className="filter-list-item">1y</button></li>
            </ul>
        </section>
    )
}

export default Filter;