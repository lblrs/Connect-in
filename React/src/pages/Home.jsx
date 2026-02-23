import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);



    useEffect(() => {

        if (token) {

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

            loadPosts();
        } else {
            navigate('/login')

        }
    }, []);



    //Create post
    const submit = async () => {


    }



    return (
        <div className="h-screen bg-amber-500">

            <div>
                {posts.map((post) =>
                    <div key={post.id} className="gap-4">
                        <h2>{post.user.first_name} {post.user.last_name}</h2>
                        <p className="mb-5">{post.content}</p>
                    </div>
                )}

            </div>

            <textarea>            </textarea>
            <button type="sublit"></button>
        </div>
    )


}

export default Home;