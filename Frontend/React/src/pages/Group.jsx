import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function Group() {
    const [group, setGroup] = useState([]);
    const {id} = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchGroup = async (id) => {

        const response = await fetch(`http://localhost:8000/api/group/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            const data = await response.json();
            setGroup(data);
        }
    }

    useEffect(() => {
        if (token) {
            fetchGroup(id);
            console.log(group);
        } else {
            navigate('/login');
        }
    }, []);

    if (!group.name) {
        return (
            <div>Loading</div>
        )
    }


    return (
        <div>

            <h1>{group.name}</h1>

        </div>

    )

}