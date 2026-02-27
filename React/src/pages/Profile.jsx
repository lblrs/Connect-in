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

    const [comment, setComment] = useState('');

    const [posts, setPosts] = useState([]);




    // User info

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


    useEffect(() => {

        if (token) {

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


    const submitComment = async (e, postId) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:8000/api/post/${postId}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                content: comment
            })
        });

        if (response.ok) {
            setComment('');
            loadPosts();
        }
    }



    if (!user) {
        return (
            <p>Loading</p>
        )
    }



    // HTML
    return (

        <div className="w-screen h-screen bg-stone-300 flex flex-col items-center">

            <div className="w-1/2 bg-white p-8 mt-10 rounded-xl">
                <img className="w-44 h-44 rounded-full border-4" src={`http://localhost:8000/storage/${user.avatar}`}></img>
                <p className="mt-8 text-5xl">{user.first_name} {user.last_name}</p>
                <p className="mt-2 text-xl">{user.email}</p>
            </div>


            {/* POSTS */}

            <div className="w-1/2 bg-white p-8 mt-10 rounded-xl">
                <h1 className="text-5xl">Activité</h1>
                <hr></hr>

                {posts.map((post) =>

                    <div key={post.id} className="mt-3 p-5 border rounded-xl ">
                        <div className="flex">
                            <img className="w-16 h-16 rounded-full " src={`http://localhost:8000/storage/${user.avatar}`}></img>
                            <h2 className="text-2xl px-3">{post.user.first_name} {post.user.last_name}</h2>
                        </div>
                        <p className="mt-10 mb-5 mx-5">{post.content}</p>
                        <hr />

                        <form onSubmit={(e) => submitComment(e, post.id)}>
                            <input className="w-1/2 border m-3 rounded-3xl p-1" placeholder="Ajoutez un commentaire"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}></input>
                            <button type="submit">Envoyer</button>
                        </form>

                        <div className="mt-5">
                            {post.comments && post.comments.map((comment) => (
                                <div key={comment.id}>

                                    <div className="flex">
                                        <img className="w-10 h-10 rounded-full " src={`http://localhost:8000/storage/${comment.user.avatar}`}></img>
                                        <h2 className="px-3">{comment.user.first_name} {comment.user.last_name}</h2>
                                    </div>

                                    <p className="px-5 py-3">{comment.content}</p>

                                </div>
                            ))}
                        </div>


                    </div>


                )}

            </div>

        </div >

    );

}

export default Profile;
