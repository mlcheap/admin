import './Login.css';


function Login() {
    return (
        <div className="modal-content">
        <div className="container">
        <label ><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" required />

        <label ><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required />

        <button type="submit">Login</button>
      </div>
      </div>);
}


export default Login;