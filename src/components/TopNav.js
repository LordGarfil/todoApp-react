import React, { Component } from 'react'

const TopNavBar = (props) => {
    const completedTasks = props.tasks.filter(t => t.completed).length
    const totalTasks = props.tasks.length
return(
        <nav>
            <ul>
                <li>
                    <h3 style={{marginRight: "8px"}}>Tasks</h3>
                    <span className="badge badge-pill badge-primary">{completedTasks} / {totalTasks}</span>
                </li>
            </ul>
            <ul></ul>
        </nav>
    )    
}
export default TopNavBar

