import React, {useState} from 'react'

function Mypage() {
    const [state, setState] = useState()

    useEffect(() => {
        const token = localStorage.getItem('token')

        fetch('내정보올곳', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
			.then(response => {
			    setState(response);
            })

    }, [])

    return (
        <button>Hi</button>
        localStorage.getItem('token')
    );
}