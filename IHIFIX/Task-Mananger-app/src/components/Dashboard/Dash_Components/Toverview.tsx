import { useState } from "react";
import "./Toverview.css";
const Toverview = () => {
  const [tasks, setTasks] = useState([
    {
      Title: "Wireframe for task log app",
      isPending: true,
      Content: "Task log app",
      Date: "01/02/2024",
      fileNo: 10,
      isActive: false,
      profile: "",
    },
    {
      Title: "Wireframe for task log app",
      isPending: false,
      Content: "Task log app",
      Date: "01/02/2024",
      fileNo: 10,
      isActive: true,
      profile: "",
    },
  ]);
  return (
    <>
      <div className="Task-overview">
        <h3>Task Overview</h3>
        <div className="task-o-holder">
          {tasks.map((task, index) => ( 
            <div className="task-o-tasks">
              <div className="task-o-header">
                <h3>{task.Title}</h3>
                <span style={{ backgroundColor: task.isPending ? 'rgba(221, 0, 0, 0.2)' : 'rgba(18, 174, 98, 0.2)', color: task.isPending ? 'rgba(221, 0, 0, 1)' : 'rgba(18, 174, 98, 1)'  }}><b>{task.isPending ? "Pending" : "Completed"}</b></span>
              </div>
              <span className="task-o-content">
                <i>
                  <img src="src\assets\octicon_project-24 (1).svg" alt="" />
                </i>
                {task.Content}
              </span>
              <div className="task-o-info">
                <img src="/src/assets/Default_pfp.png" alt="" />
                <div >
                    <img src="\src\assets\tabler_flag-filled.svg" alt=""  style={{ opacity: task.isActive? '100%' : '20%'}}/>
                  <img src="\src\assets\wi_time-3.svg" alt="" />
                  <span>{task.Date}</span>
                  <img src="\src\assets\fluent_folder-24-regular.svg" alt="" />
                  <span>{task.fileNo} files</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default Toverview;
