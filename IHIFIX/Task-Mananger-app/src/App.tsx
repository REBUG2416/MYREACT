import "./App.css"
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard/Dashboard";
import Projects from "./components/Projects/Projects";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <div className="App">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ProjectsPage" element={<ProjectsPage />} />
              <Route path="/About-us" element={<AboutPage />} />
            </Routes>
        </div>

      </Router>
    </>
  );
}

function DashboardPage() {
  return (
    <>
<Nav activePage="Dashboard"/>
 <Dashboard />
{/*  <Signup/>
 */}    </>
  );
}

function ProjectsPage() {
  return (
    <>
      <Nav activePage="Projects" />
<Projects />
    </>
  );
}

// Component for the "/About-us" route
function AboutPage() {
  return (
    <>
    </>
  );
}

export default App;
-9