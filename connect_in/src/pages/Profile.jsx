import Nav from "../components/Nav";

function Profile () {
    
    const token = localStorage.getItem('token');
    

    return (
        <div className="w-screen h-screen bg-blue-500">
            <Nav></Nav>

            <div>
                <h1>hello</h1>
            </div>

        </div>
    );
}


export default Profile;