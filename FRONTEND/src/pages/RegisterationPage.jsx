import axios from "axios";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function RegistrationPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const [emailBorder, setEmailBorder] = useState("#22c55e");
    const [passwordBorder, setPasswordBorder] = useState("#22c55e");
    const [usernameBorder , setusernameBorder] = useState("#22c55e");
    const [isValid, setisValid] = useState("#22c55e");

    const handleRegistration = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }


        let valid = true;

        if (email === "") {
            setEmailBorder("#dc2626");
            valid = false;
        } 

        if (password === "") {
            setPasswordBorder("#dc2626");
            valid = false;
        } 


        if (username === "") {
            setusernameBorder("#dc2626");
            valid = false;
        } 

        setisValid(valid);

        if (!isValid) {
            return alert("All fields are required");
        }


        const registrationData = {
            username: username,
            email: email,
            Password: password 
        };

        const loginData = {
            email: email,
            Password: password 
        };

        try {
            // Register user
            await axios.post("https://1-mern-project-backend.vercel.app/register", registrationData);
            // Log in the user immediately after registration
            await axios.post("https://1-mern-project-backend.vercel.app/login", loginData, { withCredentials: true });
            navigate('/');
        } catch (error) {
            console.error("Registration or login failed:", error);
        }
    };

    return (
        <div className="registration-page" style={styles.container}>
            <div style={styles.formContainer}>
                <form onSubmit={handleRegistration} style={styles.form}>
                    <label style={styles.label}>Enter Username</label>
                    <input 
                        type="text" 
                        placeholder="john69" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style = {{ ...styles.input, borderColor: passwordBorder }}
                    />

                    <label style={styles.label}>Enter E-mail</label>
                    <input 
                        type="email" 
                        placeholder="johnWick143@gmail.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        style={{ ...styles.input, borderColor: passwordBorder }}
                    />

                    <label style={styles.label}>Enter Password</label>
                    <input 
                        type={showPassword ? "text" : "password"} // Toggle between text and password
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        style={{ ...styles.input, borderColor: passwordBorder }}
                    />

                    <label style={styles.label}>Confirm Password</label>
                    <input 
                        type={showPassword ? "text" : "password"} // Toggle between text and password
                        placeholder="Confirm your password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        style={styles.input}
                    />

                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={(e) => setShowPassword(e.target.checked)}
                            style={{ marginRight: '8px' }}
                        />
                        <label htmlFor="showPassword" style={{ fontSize: '16px' }}>Show Password</label>
                    </div>

                    <button type="submit" style={styles.button}>Submit</button>
                </form>

                <NavLink to='/login' style={styles.link}>Already have an account? Login</NavLink>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    formContainer: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '100%',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '12px',
        fontWeight: 'bold',
        fontSize: '18px',
    },
    input: {
        padding: '14px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '18px',
    },
    button: {
        padding: '14px 28px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '18px',
    },
    link: {
        marginTop: '20px',
        textAlign: 'center',
        color: '#007bff',
        textDecoration: 'none',
        fontSize: '18px',
    },
};
