import { useRef, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './userProvider';
export default function HomePage() {


    axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const urlInputRef = useRef(null);
    const { UserDetails, setUserDetails } = useContext(UserContext);


    const handleShortenUrl = async (e) => {
        e.preventDefault();
        const urlEntered = urlInputRef.current.value;

        if(urlEntered === ""){
            return alert("input is required ");
        }

        try {
            const response = await axios.post("http://localhost:5003/GenerateUrl", { url: urlEntered });
            setUserDetails(response.data.data);
            navigate('/userURL')
        } catch (error) {
            console.log("axios error:", error.response);
            navigate('/login');
        }
    };

    return (
         
        

        <div className='container'>
            <div className='homepage-form'>
            <form method='post' onSubmit={handleShortenUrl} >
                <label
                    style={{
                        fontFamily: 'monospace',
                        fontSize: '3em',
                        color: '#334155'
                    }}
                    className="moving-text"
                >
                    Enter Your URL
                </label>
                <input
                    type="text"
                    placeholder="https://stackoverflow.com                           🔍"
                    ref={urlInputRef}
                    className="homepage-input"
                />
                <button type="submit" className='submit-button'>Submit</button>
            </form>
        </div>

      


        </div>
    );
}
