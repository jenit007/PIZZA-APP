import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InteractiveButton from '../components/InteractiveButton';
import axios from 'axios';

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePayment = async () => {
        setLoading(true);
        // Mock payment flow
        setTimeout(() => {
            alert('Mock Payment Successful!');
            setLoading(false);
            navigate('/orders'); // Route path to track order
        }, 2000);
    };

    return (
        <div className="page-wrapper container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="glass" style={{ padding: '40px', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '20px' }}>Checkout Order</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
                    Complete your payment with our secure mock Razorpay integration.
                </p>
                <InteractiveButton onClick={handlePayment} style={{ width: '100%' }}>
                    {loading ? 'Processing...' : 'Pay with Razorpay (Mock)'}
                </InteractiveButton>
            </div>
        </div>
    );
};

export default Checkout;
