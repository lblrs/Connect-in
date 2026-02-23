import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

function Login() {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Veuillez remplire tous les champs");
            return
        }

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })

        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('toket_type', data.token_type);
            navigate("/profile");
        } else {
            alert('Les identifiants ne correspendent pas : ' + data.message);
        }
    }

    return (
        <div className="bg-blue-300 h-screen w-screen flex flex-col items-center justify-center">
            <div>
                <h1 className="mb-3 text-center w-full">Connection</h1>

                <form className="flex flex-col gap-1 bg-gray-300 p-3 rounded-xl"
                    onSubmit={submit}>

                    <label htmlFor="email">Email</label>
                    <FormInput value={email}
                        onChange={(e) => setEmail(e.target.value)}></FormInput>

                    <label htmlFor="password">Mot de passe</label>
                    <FormInput type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></FormInput>

                    <Button Arg="Valider"></Button>

                    <Link to='/register' >Créer un compte</Link>
                </form>
            </div>
        </div>
    );

}


export default Login;