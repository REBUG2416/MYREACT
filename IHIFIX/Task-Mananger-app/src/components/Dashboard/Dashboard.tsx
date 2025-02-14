import Poverview from "./Dash_Components/Poverview";
import Datewidget from "./Dash_Components/Datewidget";
import Piechart from "./Dash_Components/Piechart";
import "./Dashboard.css";
import Toverview from "./Dash_Components/Toverview";
import Activities from "./Dash_Components/Activities";
const Dashboard = () => {
    return (
      <>
        <div className="content">
          <h1 data-aos="fade-down" data-aos-duration="1000" data-aos-delay="800">Good Morning, Deborah</h1>
          <div className="Widgets">
            <Poverview />
            <div className="Date-task">
              <Datewidget />
              <Piechart />
            </div>
            <Toverview />
            <Activities />
          </div>
        </div>
      </>
    );
}
 
export default Dashboard;