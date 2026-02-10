"use client"
import { useState } from "react"
import React from "react"
import roseLine from "./assets/rose-line.png"
import "./Val2025.css"
import heartIcon from "./assets/heartIcon2.png"

export default function Val2025() {
  const [showLoveMessage, setShowLoveMessage] = useState(false)

 

  const handleHeartClick = () => {
    setShowLoveMessage(true)
    setTimeout(() => setShowLoveMessage(false), 5000) // Message disappears after 5 seconds
  }

  return (
    <>
            <div className='yearDivision'>
          <img src={roseLine} alt="" className="roseline" />
          <span>Valentines Day <span style={{ color: "#0000ff" }}>2025</span></span>
          <img src={roseLine} alt="" className="roseline" />
        </div>

      <div className="container" data-aos="fade-down" data-aos-duration="1000">
        <h1 style={{ color: "#0000ff" }}>To my Val</h1>
      </div>
      <div className="text" data-aos="fade-up" data-aos-duration="1000">
        <span>
          To my one and only Love,
          <br />
          Today is such a special day for us and i am so grateful i have you{" "}
          <span style={{ color: "#e24de2" }}>Kebabi</span>. Our love shall continue to grow <br /> as pure as it has
          been, is , and will always be.
          <br />I love You <span style={{ color: "#e24de2" }}>Aaliyah</span>
          <br />- <span style={{ color: "#0000ff" }}>Dera</span>
        </span>
      </div>

      <div className="text" data-aos="fade-up" data-aos-delay="600">
        <span>👇🏽Made for us something special😏😍</span>
      </div>

      <div className="cute-container" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="800">
        <div className="hearts-background"></div>
        <h2 className="cute-title">Our Love App</h2>
        <div className="cute-card">
          <div className="cute-image">
            <button className="heart-button" onClick={handleHeartClick}>
              <img src={heartIcon || "/placeholder.svg"} className="heart-icon" alt="" />
            </button>
          </div>
          <p className="cute-text">Tap the heart!</p>
          <a href="https://expo.dev/artifacts/eas/5CjUBE7cWLrzakNkW5d47J.apk" download className="cute-button">
            <span className="button-text">Download</span>
            <span className="heart-icon">❤️</span>
          </a>
        </div>
        <div className="floating-hearts">
          <span className="love">❤️</span>
          <span className="love">💖</span>
          <span className="love">💕</span>
        </div>
      </div>
      {showLoveMessage && (
          <div className="love-message">
            <span>I Love You Kebabi!</span>
          </div>
        )}

    </>
  )
}

