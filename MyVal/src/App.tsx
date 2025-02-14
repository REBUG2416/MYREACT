/* import { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
 */import React from 'react'
import Val2024 from './components/Val2024/Val2024';
import Val2025 from './components/Val2025/Val2025';

function App() {

  return (
    <>
    <div>
          <div className="App">
          <Val2024 />
          <Val2025 />
          </div>
      </div>
    </>
  )
}

export default App
