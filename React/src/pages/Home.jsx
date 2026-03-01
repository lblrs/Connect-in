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
        } catch (error) {
            console.error("Error during publication:", error);
        }
    };
    //Time management
    const formatRelativeTime = (dateString) => {
        const now = new Date();
        const postDate = new Date(dateString);
        const diff = Math.floor((now - postDate) / 1000);

        if(diff < 60) return "A'instant";
        if(diff < 3600) return `Il y a ${Math.floor(diff / 60)}min`;
        if(diff < 86400) return `Il y a ${Math.floor(diff / 3600)}h`;
        if(diff < 604800) return `Il y a ${Math.floor(diff / 86400)}j`;

        return "Il y a 1 semain";
    };
    //Like and Dislike
    const toggleLike = (postId) =>{
        setLikedPosts(prev =>({
            ...prev,
            [postId]: !prev[postId]
        }));
    };
    
    //Delete the Posts
    const deletePost = async (postId) => {
        if(!window.confirm("Voulez-vous vraiment supprimer cette publication ?")) return;

        try{
            const response = await fetch(`http://localhost:8000/api/deletePost/${postId}`, {
                method: 'DELETE',
                headers: {'Authorization':`Bearer ${token}`}
            });
            if(response.ok) {
                loadPosts();
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du post', error);
        }
    };

    //Edit the Posts
    const updatePost = async (postId) => {
        try {
            const response = await fetch (`http://localhost:8000/api/editPost/${postId}`, {
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({content: editContent})
            });
            if(response.ok){
                setEditingPostId(null);
                loadPosts();
            }
        } catch (error) {
            console.error('Erreur lors de la modification du post', error);
        }
    };

    //Send new comment
    const handleComment = async (postId) => {
        const text = commentTexts[postId];
        if(!text?.trim()) return;

        try{
            const response = await fetch(`http://localhost:8000/api/post/${postId}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    
            },
            body: JSON.stringify({ content: text})
            });
            if(response.ok){
                setCommentTexts(prev=>({ ...prev, [postId]: ''}));
                loadPosts();
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi du commentaire", error);
        }
    };

    //Delete the Comments

    const deleteComment = async (postId, commentId) => {
            
        if (!commentId) return;

        
            if (!window.confirm("Voulez-vous supprimer ce commentaire ?")) return;

            try {
                const response = await fetch(`http://localhost:8000/api/post/${postId}/deleteComment/${commentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json' 
                    }
                });

                if (response.ok) {
                    loadPosts(); 
                } else if (response.status === 403) {
                    alert("");
                }
            } catch (error) {
                console.error('Erreur suppression commentaire', error);
            }
        };
        return(
            //Logo and branding
            <nav className="mt-3 px-4 max-w-5xl mx-auto flex justify-between items-center relative">

                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-black text-gray-900 tracking-tighter leading-none">NEXUS</h1>
                            <span className="text-[9px] font-bold text-blue-600 tracking-[0.2em] uppercase mt-0.5">Platform</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex flex-col items-end border-r border-gray-100 pr-4">
                            <div className="flex items-center gap-1 mt-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-[10px] font-medium text-gray-400">En ligne</span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="w-10 h-10 rounded-full ring-2 ring-offset-2 ring-blue-500/20 overflow-hidden
                            cursor-pointer hover:ring-blue-500/50 transition-all shadow-md active:scale-90"></div>
                        </div>
                    </div>
            </nav>
        )
}
export default Home;