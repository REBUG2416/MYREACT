import React from 'react'
import "./Val2024.css";
import redHeart from "./assets/heart2.png";
import roseLine from "./assets/rose-line.png";


export default function Val2024() {
  return (
<>
<div className="container">
  <div className='yearDivision'>
  <img src={roseLine} alt="" className="roseline" />
  <span>Valentines Day <span style={{color:"red"}}>2024</span></span>
  <img src={roseLine} alt="" className="roseline" />
  </div>
  <h1>Happy Valentines Day</h1>
   <div className="heart"><i className="fa-solid fa-heart"></i></div>
 <div className="text">
     <span>
     In the realm of love, <br /> a poem for <span style={{color: "#e24de"}}>Kebabi</span>,
 A tale of affection, sweet as <span  style={{color: "#e24de2"}}>cinnamon</span>.

<br />A girl so unique and rare,<br />
In your presence, love fills the air.

Your smile, a radiant and warm embrace,
A symphony of joy, a tender grace.
<br />
In your eyes, the stars find their glow,
A universe of love, in which we grow.

    <br /><span  style={{fontSize: "30px"}}>O</span>n this <span  style={{color: "rgb(226, 0, 0)"}}>Valentine's Day</span>, <br />a message is clear,
For Kebabi, my love is sincere.

<br />May our journey be filled with moments divine,
<br /><span style={{color: " rgb(226, 0, 0)"}}>Happy Valentine Day</span> my dear,<br /> be forever <span style={{color:   "#0000ff"}}>mine.</span>         
</span>



<div style={{display: "flex" , justifyContent: "center", marginBottom: "30px"}}> <img src={redHeart} style={{width: "80px"}} /></div>
</div>

  <div className="heart" style={{left: "82%",color: "#800080",animation:"heartbeat-purple ease-in-out 2.5s infinite alternate"}}><i className="fa-solid fa-heart"></i></div>

  <div className='yearDivision'>
  <img src={roseLine} alt="" className="roseline" />
  <span>Valentines Day <span style={{color:"red"}}>2025</span></span>
  <img src={roseLine} alt="" className="roseline" />
  </div>

</div>
</>  
)
}
