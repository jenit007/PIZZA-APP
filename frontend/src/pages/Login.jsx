import React, { useState, useContext } from 'react';
import InteractiveButton from '../components/InteractiveButton';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const { login } = useContext(AppContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Since it's UI mockup phase, navigate directly
        login({ name: 'Demo User', role: 'user' });
        navigate('/');
    };

    return (
        <div className="page-wrapper container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="glass" style={{ padding: '40px', maxWidth: '400px', width: '100%' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {!isLogin && (
                        <input className="input-field" type="text" placeholder="Full Name" required />
                    )}
                    <input className="input-field" type="email" placeholder="Email Address" required />
                    <input className="input-field" type="password" placeholder="Password" required />
                    
                    <InteractiveButton type="submit" style={{ width: '100%', marginTop: '10px' }}>
                        {isLogin ? 'Login' : 'Sign Up'}
                    </InteractiveButton>
                </form>

                <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span 
                        style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </span>
                </p>
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    <span 
                        style={{ color: 'var(--accent)', cursor: 'pointer', fontSize: '14px' }}
                        onClick={() => {
                            login({ name: 'Admin User', role: 'admin' });
                            navigate('/admin');
                        }}
                    >
                        Login as Admin
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
