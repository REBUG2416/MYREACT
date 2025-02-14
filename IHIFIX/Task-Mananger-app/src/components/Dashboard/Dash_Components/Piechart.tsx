import "./Piechart.css"
const Piechart = () => {
    return ( 
        <>
        <div className="Pie-container" data-aos="fade-left" data-aos-duration="1300" data-aos-delay="200">
            <h3>Task Activity</h3>
            <div>
                <div className="Piechart"><div className="Piechart-inner">70%</div></div>
            <div className="labels">
                <div><span className="label-color1"></span><span>Pending</span></div>
                <div><span className="label-color2"></span><span>In Progress</span></div>
                <div><span className="label-color3"></span><span>Completed</span></div>
            </div>
            </div>
        </div>
        </>
     );
}
 
export default Piechart;