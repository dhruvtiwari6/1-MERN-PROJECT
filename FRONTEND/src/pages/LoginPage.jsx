import axios from "axios";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

// Define a const variable for styles
const styles = {
    loginPage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    container: {
        backgroundColor: 'white',
        padding: '60px',
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
        fontSize: '18px',
    },
    input: {
        padding: '14px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '18px',
    },
    showPasswordContainer: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
        marginBottom: '10px', /* Adjust margin as needed */
    },
    submitButton: {
        padding: '14px 28px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '18px',
    },
    submitButtonHover: {
        backgroundColor: '#0056b3',
    },
    link: {
        marginTop: '20px',
        textAlign: 'center',
        color: '#007bff',
        textDecoration: 'none',
        fontSize: '18px',
    },
    linkHover: {
        textDecoration: 'underline',
    },
};

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailBorder, setEmailBorder] = useState("#22c55e");
    const [passwordBorder, setPasswordBorder] = useState("#22c55e");
    const [showPassword, setShowPassword] = useState(false); 
    const [isValid, setIsValid] = useState(true);

    const handleLogin = async (e) => {
        e.preventDefault();

        let valid = true;

        if (email === "") {
            setEmailBorder("#dc2626");
            valid = false;
        } 

        if (password === "") {
            setPasswordBorder("#dc2626");
            valid = false;
        } 

        setIsValid(valid);

        if (!isValid) {
            return alert("All fields are required");
        }

        const data = {
            email: email,
            Password: password
        };

        try {
            const response = await axios.post("http://localhost:5003/login", data, { withCredentials: true });
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={styles.loginPage}>
            <div style={styles.container}>
                <form style={styles.form}>
                    <label style={styles.label}>Enter E-mail</label>
                    <input
                        type="text"
                        placeholder="johnWick143@gmail.com"
                        style={{ ...styles.input, borderColor: emailBorder }}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <br />

                    <label style={styles.label}>Enter Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="enter your security key"
                        style={{ ...styles.input, borderColor: passwordBorder }}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <br />

                    <div style={styles.showPasswordContainer}>
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={(e) => setShowPassword(e.target.checked)}
                        />
                        <label htmlFor="showPassword" style={styles.label}>Show Password</label>
                    </div>

                    <button type="submit" style={styles.submitButton} onClick={handleLogin}>Submit</button>
                </form>

                <NavLink to='/register' style={styles.link}>Create Account ?</NavLink>
            </div>
        </div>
    );
}
