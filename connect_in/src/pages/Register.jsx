import { useState } from "react";
import FormInput from "../components/Input";
import Button from "../components/Button";


function Register() {

    const [firstName, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')

    return (
        <div className="bg-blue-300 h-screen w-screen flex flex-col items-center justify-center">
            <div>
                <h1 className="mb-3 text-center w-full">Inscrivez-vous</h1>

                <form className="flex flex-col gap-1 bg-gray-300 p-3 rounded-xl">


                    <label htmlFor="first_name">Prénom</label>
                    <FormInput type="text"
                        value={firstName}
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
                    <Button Arg="sqdsqsqd"></Button>

                </form>
            </div>
        </div>
    )
}

export default Register;