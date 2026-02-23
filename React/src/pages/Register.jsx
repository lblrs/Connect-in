// Import HOOKS
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Import components
import FormInput from "../components/FormInput";
import Button from "../components/Button";


function Register() {

    // Input variables + setters
    // useState
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')

    // UseNavigate
    const navigate = useNavigate();

    // Gérer le submit (Logique JS quand boutton submit cliqué)
    const submit = async (e) => {
        e.preventDefault();

        if (!first_name || !last_name || !email || !password || !checkPassword) {
            alert("Veuillez renseigner tous les champs");
            return;
        }

        if (password !== checkPassword) {
            alert("Mot de passe ne correspendent pas");
            return
        }

        // Fetch
        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password
            })

        });

        const data = await response.json();

        if (response.ok) {
            // UseNavigate redirige vers '/login'
            navigate('/login');
        } else {
            alert('eurreure : ' + data.message)
        }
    }


    // HTML
    return (
        <div className="bg-blue-300 h-screen w-screen flex flex-col items-center justify-center">
            <div>
                <h1 className="mb-3 text-center w-full">Inscrivez-vous</h1>

                <form className="flex flex-col gap-1 bg-gray-300 p-3 rounded-xl"
                    onSubmit={submit}>

                    <label htmlFor="first_name">Prénom</label>
                    <FormInput type="text"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}>
                    </FormInput>

                    <label htmlFor="last_name">Nom</label>
                    <FormInput value={last_name}
                        onChange={(e) => setLastName(e.target.value)}>
                    </FormInput>

                    <label htmlFor="email">Email</label>
                    <FormInput type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </FormInput>

                    <label htmlFor="password">Mot de passe</label>
                    <FormInput type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </FormInput>

                    <label htmlFor="password">Confirmez votre mot de passe</label>
                    <FormInput type="password"
                        value={checkPassword}
                        onChange={(e) => setCheckPassword(e.target.value)}>
                    </FormInput>

                    <Button Arg="Valider"></Button>

                    <Link to="/login">J'ai déjà un compte</Link>
                </form>

            </div>
        </div>
    )
}

// Export de la page => import dans App.js
export default Register;