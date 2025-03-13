import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/logo-completa-t.png';

const Login = () => {
    const [signState, setSignState] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = signState === "Cadastro" ? "register" : "login";

        try {
            const response = await fetch(`http://localhost:5000/api/auth/${url}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signState === "Cadastro" ? { name, email, password } : { email, password })
            });

            const data = await response.json();
            if (response.ok) {
                if (signState === "Cadastro") {
                    alert("Cadastro realizado! Faça login.");
                    setSignState("Login");
                } else {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    navigate("/");
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro no servidor!");
        }
    };

    return (
        <div className='login'>
            <img src={logo} alt="" className='login-logo'/>
            <div className='login-form'>
                <h1>{signState}</h1>
                <form onSubmit={handleSubmit}>
                    {signState === "Cadastro" && <input type="text" placeholder='Seu nome' value={name} onChange={e => setName(e.target.value)} required />}
                    <input type="email" placeholder='Seu email' value={email} onChange={e => setEmail(e.target.value)} required />
                    <input type="password" placeholder='Sua senha' value={password} onChange={e => setPassword(e.target.value)} required />
                    <button type="submit">{signState}</button>
                </form>
                <div className="form-switch">
                    {signState === "Login" ? <p>Novo na netfliz? <span onClick={() => setSignState("Cadastro")}>Cadastre-se!</span></p> : 
                    <p> Já possui conta? <span onClick={() => setSignState("Login")}>Entre agora!</span></p>}
                </div>
            </div>
        </div>
    );
};

export default Login;
