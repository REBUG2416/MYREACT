import { useState } from "react";
import "./Projectwidget.css";
const Projectwidget = () => {
  const [projects, setProject] = useState([
    {
      Title: "Task Management App",
      Members: [
        "/src/assets/Default_pfp.png",
        "/src/assets/Default_pfp.png",
        "/src/assets/Default_pfp.png",
        "/src/assets/Default_pfp.png",
      ],
      Tasks: { completed: 5, total: 16 },
      Due: "Due Today",
      Update: "1 minute ago",
      Per: 60,
    },
    {
      Title: "Task Management App",
      Members: [
        "/src/assets/Default_pfp.png",
        "/src/assets/Default_pfp.png",
        "/src/assets/Default_pfp.png",
        "/src/assets/Default_pfp.png",
      ],
      Tasks: { completed: 5, total: 16 },
      Due: "Due Today",
      Update: "1 minute ago",
      Per: 60,
    },
    {
      Title: "Task Management App",
      Members: [
        "/src/assets/Default_pfp.png",
        "/src/assets/Default_pfp.png",
        "/src/assets/Default_pfp.png",
        "/src/assets/Default_pfp.png",
      ],
      Tasks: { completed: 5, total: 16 },
      Due: "Due Today",
      Update: "1 minute ago",
      Per: 60,
    },
    {
      Title: "Task Management App",
      Members: [
        "/src/assets/Default_pfp.png",
        "/src/assets/Default_pfp.png",
        "/src/assets/Default_pfp.png",
        "/src/assets/Default_pfp.png",
      ],
      Tasks: { completed: 5, total: 16 },
      Due: "Due Today",
      Update: "1 minute ago",
      Per: 60,
    },
    {
      Title: "Task Management App",
      Members: [
        "/src/assets/Default_pfp.png",
        "/src/assets/Default_pfp.png",
        "/src/assets/Default_pfp.png",
        "/src/assets/Default_pfp.png",
      ],
      Tasks: { completed: 5, total: 16 },
      Due: "Due Today",
      Update: "1 minute ago",
      Per: 60,
    },

  ]);
  
  let date = new Date();

console.log(date);


  return (
    <>
            {projects.map((project) => (
      <div className="Project-w-container">
          <div className="Project-w-project">
            <div>
            <span  className="Projects-headings-title">{project.Title}</span>

            <div className="profiles Projects-headings-members">
              {project.Members.map((member, index) => (
                <>
                {index < 3?<img src={member} className="profileTemplate"></img>:<div className="profileTemplate">{project.Members.length-2}+</div>}
                </>
              ))}
            </div>
                          <span className="Projects-headings-tasks">{project.Tasks.completed}/{project.Tasks.total}</span>
            <span className=" Projects-headings-due"><span className="Due">Due Today</span></span>       
 <span className="Projects-headings-update">{project.Update}</span>
          </div>
          <span className="per">{project.Per}%</span>
                     <div className="progressbar flex"><div className="progress"></div></div>
          </div>     
          </div>
        ))}
 
    </>
  );
};

export default Projectwidget;
