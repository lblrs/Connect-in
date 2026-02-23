import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [checkNewPassword, setCheckNewPassword] = useState('');
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
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setEmail(data.email);
                }
            };

            loadUser();

        } else {
            navigate('/login');
        }

    }, []);




    // Update Profile
    const UpdateProfile = async (e) => {

        const response = await fetch('http://localhost:8000/api/user/update', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                first_name: first_name,
                last_name: last_name,
                email: email,
            })

        })

        if (response.ok) {
            navigate('/profile');
        }

    }




    // Logout
    const logout = async () => {

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



    //Delete user
    const DeleteUser = async () => {

        const response = await fetch('', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            localStorage.removeItem('token');
            alert('Compte supprmié');
            navigate('/register');
        };
    };




    if (!user) {
        return (
            <p>Loading</p>
        )
    }



    // HTML
    return (

        <div className="w-screen h-screen bg-blue-500 flex">

            <div className="flex flex-col w-1/2 p-5 gap-3">
                <h1 className="text-5xl">Profile</h1>
                <p>{user.first_name} {user.last_name}</p>
                <p>{user.email}</p>
                <button className="bg-amber-50" onClick={logout}>Déconnection</button>

                <div>

                    <form className="flex flex-col justify-center"
                        onSubmit={UpdateProfile}>

                        <button type="submit" className="bg-yellow-400">Modifier le profile</button>

                        <input
                            type="text"
                            className="m-3"
                            placeholder={user.first_name}
                            onChange={(e) => setFirstName(e.target.value)}></input>

                        <input
                            type="text"
                            className="m-3"
                            placeholder={user.last_name}
                            onChange={(e) => setLastName(e.target.value)}></input>

                        <input
                            type="email"
                            className="m-3"
                            placeholder={user.email}
                            onChange={(e) => setEmail(e.target.value)}></input>

                    </form>
                </div>

                <button type="submit" className="bg-red-600" onClick={DeleteUser}>Supprimer le profile</button>

            </div>
        </div>

    );
}


export default Profile;