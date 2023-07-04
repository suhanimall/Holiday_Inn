import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Login = () => {

    //login page credentials
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const navigate = useNavigate()
    //fetching data from AuthContext for checking authenticated user
    const { loading, error, dispatch } = useContext(AuthContext);

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("https://holiday-backend-tj0d.onrender.com/api/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    }

    return (
        <div className="login">
            <div className="lContainer">
                <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
                <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
                <button disabled={loading} onClick={handleClick} className="lButton">Login</button>

                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
}

export default Login
