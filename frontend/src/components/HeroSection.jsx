import React from 'react';
import { motion } from 'framer-motion';
import InteractiveButton from './InteractiveButton';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '80vh',
            gap: '40px',
        }}>
            <div style={{ flex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '20px' }}>
                        Craft Your <br/>
                        <span style={{ color: 'var(--primary)' }}>Perfect Pizza</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '40px', maxWidth: '400px' }}>
                        Experience the art of authentic pizza making. Choose your base, pick fresh ingredients, and enjoy!
                    </p>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <InteractiveButton onClick={() => navigate('/builder')}>
                            Build Your Pizza
                        </InteractiveButton>
                        <InteractiveButton type="secondary" onClick={() => navigate('/menu')}>
                            View Menu
                        </InteractiveButton>
                    </div>
                </motion.div>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%'
                    }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        style={{ fontSize: '200px' }}
                    >
                        🍕
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
