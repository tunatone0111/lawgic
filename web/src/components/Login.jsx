import React, { useState } from 'react'

const Login = () => {
    const [id, setID] = useState('');
    const [pw, setPW] = useState('');

    const onSubmit = () => {
        fetch("http://34.64.175.123:4000/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				username: id,
				password: pw
			})

        })
			.then(response => response.json())
			.then(response => {
				localStorage.setItem('token', response.access_token)
			})

    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input type="text" placeholder="ID" value={id} onChange={e => setID(e.target.value)} />
            <input type="password" placeholder="PW" value={pw} onChange={e => setPW(e.target.value)} />
        <button onClick={onSubmit}>SUBMIT</button>
        </div>
    );
}

export default Login
