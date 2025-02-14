import { useState } from "react";
import "./Activities.css";
const Activities = () => {
  const [activities, setActivities] = useState([
    {
      Time: "10:00am",
      Name: "David Mark",
      Task: "Task log app",
      Date: "01/02/2024",
      profile: "",
    },
    {
      Time: "10:00am",
      Name: "David Mark",
      Task: "Task log app",
      Date: "01/02/2024",
      profile: "",
    },
    {
      Time: "10:00am",
      Name: "David Mark",
      Task: "Task log app",
      Date: "01/02/2024",
      profile: "",
    },
    {
      Time: "10:00am",
      Name: "David Mark",
      Task: "Task log app",
      Date: "01/02/2024",
      profile: "",
    },
    {
      Time: "10:00am",
      Name: "David Mark",
      Task: "Task log app",
      Date: "01/02/2024",
      profile: "",
    },
    {
      Time: "10:00am",
      Name: "David Mark",
      Task: "Task log app",
      Date: "01/02/2024",
      profile: "",
    },
  ]);
  return (
    <>
      <div className="Recent-Activity">
        <h3>Recent Activity</h3>
        <div className="Activities-holder">
          {activities.map((activity, index) => (
            <div className="Activity">
              <span>{activity.Time}</span>
              <span>
                <b>{activity.Name}</b> created a task - "{activity.Task}"
              </span>
              <img src="/src/assets/Default_pfp.png" alt="" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Activities;
