import "./Signup.css"

const Signup = () => {




    return (
      <>
        <div className="Form">
          <h1>Welcome</h1>
          <p>Log in to access <a href="www.ihifix.com">Ihifix</a> task log</p>

          <form action="#">
            <div className="Username">
              <label htmlFor="name">Username or Email address</label>
              <input type="text"></input>
            </div>

            <div className="Password">
              <label htmlFor="password">Password</label>
              <input type="text"></input>
              <a href="">Forgot password?</a>
            </div>

            <div className="Submit">
              <button>Login</button>
              <span>
                <input type="checkbox" className="checkbox"></input>Remember Me
              </span>
            </div>
          </form>

          <div className="altlog">
            <span>Log in With</span>
            <img src="\src\assets\Group 21085.svg" alt="" />
            <div className="icons-div">
              <i className="icon">
                <img src="\src\assets\Google svg.svg" />
              </i>
              <i className="icon">
                <img src="\src\assets\Apple svg.svg" />
              </i>
              <i className="icon">
                <img src="\src\assets\g10.svg" />
              </i>
            </div>
          </div>
        </div>
      </>
    );
}
 
export default Signup;