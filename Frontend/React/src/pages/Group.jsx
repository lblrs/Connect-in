import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Group() {

    const [groups, setGroups] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchGroup = async (e) => {

        const response = await fetch('http://localhost:8000/api/getGroups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            const data = await response.json();
            setGroups(data);
        }



    }

    useEffect(() => {
        if (token) {
            fetchGroup();
        } else {
            navigate('/logn')

        }

    }, []);

    if (groups) {
        console.log(groups);    
    }


    return (
       <div>
        {groups.map(g =>
            <div key={g.id}>
                <h1>{g.name}</h1>
            </div>
        )}
       </div>
    )
}