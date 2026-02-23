import { useNavigate } from "react-router-dom";

function Home() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if (!token) {
        navigate('/login')
    }

    
}