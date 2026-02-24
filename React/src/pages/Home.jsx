import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('')




    // Get all posts
    const loadPosts = async () => {

        const response = await fetch('http://localhost:8000/api/getAllPosts', {
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
            loadPosts();
        } else {
            navigate('/login')
        }
    }, []);



    //Create post
    const submit = async () => {

        if (!newPost) {
            return;
        } else {
            const response = await fetch('http://localhost:8000/api/createPost', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: newPost
                })

            });

            if (response.ok) {
                loadPosts();
            }
        }
    }

    //Delete post
    const deletePost = async () => {

        
    }


    return (
        <div className="h-screen bg-amber-500 flex flex-col items-center">

            <div>
                {posts.map((post) =>
                    <div key={post.id} className="gap-5 bg-amber-50 p-5 mb-3">
                        <h2 className="text-2xl">{post.user.first_name} {post.user.last_name}</h2>
                        <p className="mb-5">{post.content}</p>
                        <p>{post.created_at}</p>

                        {/* <button className="bg-red-600 text-white"
                            onClick={deletePost}>Supprimer</button> */}
                    </div>
                )}

            </div>

            <form className="flex flex-col" onSubmit={submit}>

                <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}>
                </textarea>

                <button className="bg-white mt-3" type="submit">Valider</button>

            </form>

        </div>
    )


}

export default Home;