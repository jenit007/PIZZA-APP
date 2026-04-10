import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiClock, FiTruck, FiMapPin, FiPhoneCall } from 'react-icons/fi';
import { AppContext } from '../context/AppContext';

const OrderTracking = () => {
    const { orderStatus, updateOrderStatus } = useContext(AppContext);
    
    // Fallbacks if not matching steps perfectly
    const steps = ['Order Received', 'In Kitchen', 'Out for Delivery'];
    let safeIndex = steps.indexOf(orderStatus);
    if (safeIndex === -1) safeIndex = 0;
    
    const currentIndex = safeIndex;

    const getIconForStep = (index) => {
        if (index === 0) return <FiCheckCircle size={20} />;
        if (index === 1) return <FiClock size={20} />;
        return <FiTruck size={20} />;
    };

    return (
        <div className="page-wrapper container">
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Track Your Order</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px' }}>
                Your delicious pizza is on its way! Watch its progress below.
            </p>

            <div className="glass" style={{ padding: '50px 40px', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                    {/* Connecting Line */}
                    <div style={{
                        position: 'absolute', top: '25px', left: '10%', right: '10%', height: '6px',
                        background: 'var(--glass-border)', zIndex: 0, borderRadius: '5px', overflow: 'hidden'
                    }}>
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            style={{ height: '100%', background: 'var(--primary)' }}
                        />
                    </div>

                    {steps.map((step, index) => {
                        const isActive = index <= currentIndex;
                        const isCurrent = index === currentIndex;
                        return (
                            <div key={index} style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <motion.div 
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: isCurrent ? 1.2 : isActive ? 1.05 : 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    style={{
                                        width: '50px', height: '50px', borderRadius: '50%',
                                        background: isActive ? 'var(--primary)' : 'var(--card-bg)',
                                        border: `3px solid ${isActive ? 'var(--primary)' : 'var(--glass-border)'}`,
                                        marginBottom: '15px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: isActive ? 'white' : 'var(--text-muted)',
                                        boxShadow: isCurrent ? '0 0 15px rgba(230, 57, 70, 0.4)' : 'none'
                                    }}
                                >
                                    {getIconForStep(index)}
                                </motion.div>
                                <span style={{ 
                                    fontWeight: isCurrent ? 'bold' : isActive ? '600' : 'normal', 
                                    color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                                    textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px'
                                }}>
                                    {step}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Simulated Rider Card showing up when Out for Delivery */}
                <AnimatePresence>
                    {orderStatus === 'Out for Delivery' && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ delay: 0.5, type: 'spring' }}
                            style={{
                                marginTop: '50px',
                                background: 'rgba(42, 157, 143, 0.1)',
                                border: '1px solid var(--accent)',
                                borderRadius: '12px',
                                padding: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '20px',
                                flexWrap: 'wrap'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <img 
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" 
                                    alt="Rider" 
                                    style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid var(--accent)' }}
                                />
                                <div>
                                    <h4 style={{ margin: '0 0 5px 0' }}>John Doe</h4>
                                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>Your Delivery Expert 🛵</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button style={{ 
                                    display: 'flex', alignItems: 'center', gap: '8px', 
                                    padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--accent)',
                                    background: 'transparent', color: 'var(--text-main)', cursor: 'pointer'
                                }}>
                                    <FiMapPin /> Track Route
                                </button>
                                <button style={{ 
                                    display: 'flex', alignItems: 'center', gap: '8px', 
                                    padding: '10px 20px', borderRadius: '8px', border: 'none',
                                    background: 'var(--accent)', color: 'white', cursor: 'pointer', fontWeight: 'bold'
                                }}>
                                    <FiPhoneCall /> Call Rider
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {/* Quick Demo Simulator trigger for Mockup purposes */}
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                 <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Demo Control: Quickly cycle through statuses locally</p>
                 <button onClick={() => updateOrderStatus('Order Received')} style={{ margin: '5px', padding: '5px 15px', borderRadius: '5px', border: '1px solid var(--glass-border)', background:'transparent', color:'var(--text-main)', cursor: 'pointer' }}>Received</button>
                 <button onClick={() => updateOrderStatus('In Kitchen')} style={{ margin: '5px', padding: '5px 15px', borderRadius: '5px', border: '1px solid var(--glass-border)', background:'transparent', color:'var(--text-main)', cursor: 'pointer' }}>Kitchen</button>
                 <button onClick={() => updateOrderStatus('Out for Delivery')} style={{ margin: '5px', padding: '5px 15px', borderRadius: '5px', border: '1px solid var(--glass-border)', background:'transparent', color:'var(--text-main)', cursor: 'pointer' }}>Delivery</button>
            </div>
        </div>
    );
};

export default OrderTracking;
