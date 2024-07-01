import { UserContext } from "./userProvider";
import { useContext } from "react";

export default function UserGeneratePage() {
    const { UserDetails } = useContext(UserContext);

    if (!UserDetails) {
        return <div>Loading...</div>;
    }

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        margin: '20px 0',
        fontSize: '18px',
        textAlign: 'left',
    };

    const thStyle = {
        backgroundColor: '#f2f2f2',
        padding: '12px 15px',
    };

    const tdStyle = {
        padding: '12px 15px',
        borderBottom: '1px solid #ddd',
    };

    const linkStyle = {
        textDecoration: 'none',
        color: '#3498db',
        fontWeight: 'bold',
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Your Generated URLs</h2>
            {UserDetails.length === 0 ? (
                <p>No URLs generated yet.</p>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Short Link</th>
                            <th style={thStyle}>Original Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {UserDetails.map((url) => (
                            <tr key={url.shortId}>
                                <td style={tdStyle}>
                                    <a href={`https://1-mern-project-backend.vercel.app/${url.shortId}`} style={linkStyle} target="_blank" rel="noopener noreferrer">
                                        {url.shortId}
                                    </a>
                                </td>
                                <td style={tdStyle}>{url.redirectUrl}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
