import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPost from "../components/ButtonPost";

function Home(){
    // Memory section (States)
    const [posts, setPost] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [likedPosts, setLikedPosts] = useState({});
    const token =localStorage.getItem('token');
    const navigate = useNavigate();
    const [commentTexts, setCommentTexts] = useState({});
    const [editingPostId, setEditingPostId] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [userId, setUserId] = useState(null);
    //1: To get information from the server
    const loadPosts = async() =>{
        try {
            const response = await fetch('http://localhost:8000/api/getAllPosts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setPost(data);
            }

            else if (response.status === 401) {
                navigate('/login');
            }
        } catch (error) {
            console.error ('Error connecting to server', error);
        }
    }
    //
    const fetchUser = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            setUserId(data.id);
        }
    } catch (error) {
        console.error("Erreur fetch user:", error);
    }
};
    //2: Auto-run when page opens
    useEffect(() =>{
        if(!token){
            navigate('/login');
        }
        else{
            loadPosts();
            fetchUser();
        }
    }, []);
    //3: New Post
    const submit = async (e) => {

        e.preventDefault();

        if (!newPost.trim()) return;

        try {
            const response = await fetch('http://localhost:8000/api/createPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    content: newPost
                })
            });
            if (response.ok) {

                setNewPost("");
                loadPosts();
            }
        }
    }


    return (
        <div className="h-screen bg-black flex flex-col items-center">

            <div className="w-1/2">
                {posts.map((post) =>
                    <div key={post.id} className="gap-5 bg-gray-500 p-5 m-5 rounded-3xl">
                        <h2 className="text-3xl mb-5">{post.user.first_name} {post.user.last_name}</h2>
                        <p className="mb-5 text-lg">{post.content}</p>
                        <img src={`http://localhost:8000/storage/${post.image}`} alt="Post" />
                        <p className="justify-self-end">Crée le : {post.created_at}</p>

                        <button className="bg-red-600 text-white"
                            type="submit"
                        >Supprimer</button>
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
