import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Nav() {

    const navigate = useNavigate()
    
    const deconnect = () => {
        navigate('/login');
    };

    return (

        <div className="h-8 bg-gray-500 flex justify-between items-center">

            <img src="img/logout.svg" alt="Logo"
                className="max-h-full p-1"></img>

            <div className="bg-white w-1/4">z</div>

            <img src="img/logout.svg" alt="Logo"
                className="max-h-full p-1"
                onClick={deconnect}></img>

        </div>

    );
}

export default Nav;