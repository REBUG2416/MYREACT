import "./Projects.css";
import Projectwidget from "./Pro_Components/Projectwidget";
const Projects = () => {
    return (
      <div className="content">
        <h1 data-aos="fade-down" data-aos-duration="1000" data-aos-delay="800">
          Projects
        </h1>
        <div className="Projects-headings">
          <span className="Projects-headings-title">Title</span>
          <span className="Projects-headings-members">Project Members</span>
          <span className="Projects-headings-tasks">Tasks</span>
          <span className="Projects-headings-due">Due Date</span>
          <span className="Projects-headings-update">Last Update</span>
        </div>
        <div className="Widgets">
<Projectwidget />
        </div>
      </div>
    );
}
 
export default Projects;