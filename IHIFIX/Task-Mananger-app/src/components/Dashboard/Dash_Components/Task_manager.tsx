import "./Task_manager.css"

const Task_manager = () => {

    return ( 

        <>
       <div className="Task-container">
           <div className="flex"><h4 className="Header">Task Management App</h4><i><img src="\src\assets\Group (1).svg" alt="" /></i></div>
           <div className="profiles"><img className="profileTemplate"></img><img className="profileTemplate"></img><img className="profileTemplate"></img></div>
           <div className="flex"><span className="align"><i><img className="TaskIcon" src="\src\assets\fluent_clipboard-bullet-list-20-regular.svg" alt="" /></i>Tasks</span> <span>8/10</span></div>
           <div className="progressbar flex"><div className="progress"></div></div>
<div className="flex"><span className="Due">Due Today</span><span className="align">4<i><img className="TaskIcon" src="\src\assets\fluent_folder-24-regular.svg" alt="" /></i>8</span></div>
       </div>
       <hr />
        </>
     );
}
 
export default Task_manager;