import './LoginSignup.css'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        alert('Login realizado com sucesso!');
        navigate('/alunos');
      } else {
        alert('Email ou senha inválidos!');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao conectar com o servidor!');
    }
  };

  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="text">Login</div>
        </div>
        
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="input">
            <img src={password_icon} alt="" />
            <input 
              type="password" 
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        
        <div className="submit-container">
          <div className="submit" onClick={handleLogin}>
            Entrar
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup