import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('')
    const [avatar, setAvatar] = useState(null);
    const [email, setEmail] = useState('');


    const [posts, setPosts] = useState([]);




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
                    setAvatar(data.avatar);
                    setEmail(data.email);
                }
            };

            const loadPosts = async () => {

                const response = await fetch('http://localhost:8000/api/getUserPosts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                }
            }

            loadUser();
            loadPosts();

        } else {
            navigate('/login');
        }

    }, []);




    // Update Profile
    const UpdateProfile = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('email', email);

        if (avatar instanceof File) {
            formData.append('avatar', avatar);
        }

        formData.append('_method', 'PUT');

        const response = await fetch('http://localhost:8000/api/user/update', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })

        if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            window.location.reload();
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

    const DeleteAll = async () => {

        const response = await fetch('', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            localStorage.removeItem('token');
            alert('Compte supprimée');
            navigate('/register');
        }
    }




    if (!user) {
        return (
            <p>Loading</p>
        )
    }



    // HTML
    return (

        <div className="w-screen h-screen bg-blue-500 flex">

            <div className="flex flex-col w-1/6 p-5 gap-3">
                <h1 className="text-5xl">Profile</h1>
                <img src={`http://localhost:8000/storage/${user.avatar}`}></img>
                <p>{user.first_name} {user.last_name}</p>
                <p>{user.email}</p>
                <button className="bg-amber-50" onClick={logout}>Déconnection</button>

                <div className="bg-amber-300">

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

                        <input type="file"
                            className="m-3"
                            onChange={(e) => setAvatar(e.target.files[0])}></input>

                    </form>
                </div>

                <div className="bg-red-300">
                    <h2>SUPPRIMER LE PROFILE</h2>

                    <button type="submit" className="bg-red-600 w-1/3 m-1" onClick={DeleteAll}>Supprimer le contenue</button>
                    <button type="submit" className="bg-red-600 w-1/2 m-1" onClick={DeleteUser}>Supprimer juste le profile</button>

                </div>
            </div>


            {/* POSTS */}
            <div>
                {posts.map((post) =>
                    <div key={post.id} className="gap-5 bg-amber-50 p-5 mb-3">
                        <h2 className="text-2xl">{post.user.first_name} {post.user.last_name}</h2>
                        <p>{post.content}</p>
                    </div>
                )}
            </div>


            <div>

            </div>

        </div>

    );

}

export default Profile;
