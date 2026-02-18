import { useState } from "react";
import FormInput from "../components/Input";
import Button from "../components/Button";

function Login () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
            alert('Connection reussi');
        } else {
            alert('Les identifiants ne correspendent pas : ' + data.message)
        }
    }

    return (
        <div>
            <div>
                <h1>Connection</h1>

                <form onSubmit={submit}>

                    <label htmlFor="email">Email</label>
                    <FormInput value={email}
                    onChange={(e) => setEmail(e.target.value)}></FormInput>

                    <label htmlFor="password">Mot de passe</label>
                    <FormInput value={password}
                    onChange={(e) => setPassword(e.target.value)}></FormInput>

                    <Button Arg="Valider"></Button>
                </form>
            </div>
        </div>
    );
}


export default Login;