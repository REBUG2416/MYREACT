import Task_manager from "./Task_manager";
import "./Poverview.css"
const Poverview = () => {
    return (
      <>
        <div className="Poverview" data-aos="fade-right" data-aos-duration="1000"> 
          <h1 >Project Overview</h1>
          <div className="Tasks">
            <Task_manager />
            <Task_manager />
            <Task_manager />
            <Task_manager />
          </div>
        </div>
      </>
    );
}
 
export default Poverview;