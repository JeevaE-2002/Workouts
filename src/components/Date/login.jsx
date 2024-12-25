import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    setMessage('Loading...!')
    if(email === "jeeva@gmail.com" && password === "test@123"){
        setTimeout(() => {
            setMessage("Sucessfully Submitted")
        }, 3000);
    } else {
        setTimeout(() => {
            setMessage("Invalid Credentials")
        }, 2000)
    }
  };

  return (
    <div style={{padding:'200px'}}>
        <h1>Login</h1>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <br />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleSubmit}>SignIn</button>
        <br />
        {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
