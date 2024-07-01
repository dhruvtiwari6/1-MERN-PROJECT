import React from 'react';

export default function AboutPage() {
    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>About Me</h2>
            <div style={styles.content}>
                <p>
                    Welcome to my About page! I'm a passionate MERN stack developer with a strong background in programming and data structures and algorithms (DSA). I have a knack for building scalable web applications using MongoDB, Express, React, and Node.js.
                </p>
                <p>
                    My journey into programming began with a curiosity for creating functional and user-friendly applications. Over the years, I've honed my skills in JavaScript, gaining proficiency in both frontend and backend development.
                </p>
                <p>
                    As a developer, I thrive on solving complex problems and implementing efficient solutions. I enjoy leveraging the latest technologies to deliver robust and dynamic web experiences. From crafting RESTful APIs to designing responsive UIs, I'm committed to delivering high-quality code.
                </p>
                <p>
                    Beyond coding, I'm dedicated to continuous learning and staying updated with industry trends. I believe in the power of teamwork and collaboration, striving to contribute positively to every project I'm involved in.
                </p>
              
            </div>
        </div>
    );
}

// Internal CSS styles
const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        fontSize: '2.5rem',
        color: '#343a40',
        marginBottom: '30px',
    },
    content: {
        fontSize: '1.2rem',
        lineHeight: '1.8',
        color: '#495057',
    },
};
