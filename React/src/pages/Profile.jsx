import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";

function Profile() {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [updateForm, setUpdateForm] = useState(false);

    


    // User info

    useEffect(() => {

        if (token) {

            const loadUser = async () => {
                const response = await fetch('http://localhost:8000/api/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                }
            };

            loadUser();

        } else {
            navigate('/login');
        }

    }, []);






    
    // Logout
    const deconnect = async () => {

        const response = await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            localStorage.removeItem('token');

            navigate('/login');
        };

    }




    if (!user) {
        return (
            <p>Loading</p>
        )
    }



    // HTML
    return (

        <div className="w-screen h-screen bg-blue-500">
            <div className="flex flex-col w-1/6 p-5 gap-3">


                <h1 className="text-5xl">Profile</h1>
                <p>{user.first_name} {user.last_name}</p>
                <p>{user.email}</p>



                <button className="bg-yellow-400">Modifier le profile</button>
                <button className="bg-amber-50" onClick={deconnect}>Déconnection</button>
                <button className="bg-red-600">Supprimer le profile</button>

            </div>
        </div>
        
    );
}


export default Profile;