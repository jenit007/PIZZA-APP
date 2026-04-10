import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveButton from '../components/InteractiveButton';
import { useNavigate } from 'react-router-dom';

const PizzaBuilder = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    
    const [selection, setSelection] = useState({
        base: null,
        sauce: null,
        cheese: null,
        veggies: [],
        meats: []
    });

    const bases = [
        { id: 'b1', name: 'Hand Tossed', price: 5.99, isVeg: true, image: '/images/base_classic_1775751100588.png' },
        { id: 'b2', name: 'Thin Crust', price: 6.99, isVeg: true, image: '/images/base_thin_1775751116058.png' },
        { id: 'b3', name: 'Cheese Burst', price: 8.99, isVeg: true, image: '/images/base_classic_1775751100588.png' }
    ];

    const sauces = [
        { id: 's1', name: 'Tomato Sauce', price: 1.00, isVeg: true, image: '/images/topping_sauce_1775751074001.png' },
        { id: 's2', name: 'Spicy Arrabiata', price: 1.50, isVeg: true, image: 'https://placehold.co/140x140/E63946/FFFFFF?font=Montserrat&text=Arrabiata' },
        { id: 's3', name: 'Creamy Garlic', price: 2.00, isVeg: true, image: 'https://placehold.co/140x140/FFD166/1D1D1D?font=Montserrat&text=Garlic' },
        { id: 's4', name: 'BBQ Sauce', price: 2.00, isVeg: true, image: 'https://placehold.co/140x140/1D1D1D/FFFFFF?font=Montserrat&text=BBQ' },
        { id: 's5', name: 'Pesto Sauce', price: 3.00, isVeg: true, image: 'https://placehold.co/140x140/2A9D8F/FFFFFF?font=Montserrat&text=Pesto' }
    ];

    const cheeses = [
        { id: 'c1', name: 'Mozzarella', price: 2.00, isVeg: true, image: '/images/topping_cheese_1775751134268.png' },
        { id: 'c2', name: 'Cheddar', price: 2.50, isVeg: true, image: 'https://placehold.co/140x140/FFD166/1D1D1D?font=Montserrat&text=Cheddar' },
        { id: 'c3', name: 'Vegan Cheese', price: 3.50, isVeg: true, image: 'https://placehold.co/140x140/2A9D8F/FFFFFF?font=Montserrat&text=Vegan' },
        { id: 'c4', name: 'Gouda', price: 2.75, isVeg: true, image: 'https://placehold.co/140x140/FFD166/1D1D1D?font=Montserrat&text=Gouda' },
        { id: 'c5', name: 'Parmesan', price: 3.00, isVeg: true, image: 'https://placehold.co/140x140/FFD166/1D1D1D?font=Montserrat&text=Parmesan' }
    ];

    const veggiesList = [
        { id: 'v1', name: 'Mushrooms', price: 0.50, isVeg: true, image: '/images/topping_mushroom_1775751024496.png' },
        { id: 'v2', name: 'Onions', price: 0.50, isVeg: true, image: '/images/topping_onion_1775751040590.png' },
        { id: 'v3', name: 'Bell Peppers', price: 0.60, isVeg: true, image: 'https://placehold.co/140x140/2A9D8F/FFFFFF?font=Montserrat&text=Peppers' },
        { id: 'v4', name: 'Jalapenos', price: 0.75, isVeg: true, image: 'https://placehold.co/140x140/2A9D8F/FFFFFF?font=Montserrat&text=Jalapenos' },
        { id: 'v5', name: 'Black Olives', price: 0.80, isVeg: true, image: 'https://placehold.co/140x140/1D1D1D/FFFFFF?font=Montserrat&text=Olives' },
        { id: 'v6', name: 'Tomatoes', price: 0.50, isVeg: true, image: 'https://placehold.co/140x140/E63946/FFFFFF?font=Montserrat&text=Tomatoes' },
        { id: 'v7', name: 'Sweet Corn', price: 0.80, isVeg: true, image: 'https://placehold.co/140x140/FFD166/1D1D1D?font=Montserrat&text=Corn' },
        { id: 'v8', name: 'Paneer', price: 1.50, isVeg: true, image: 'https://placehold.co/140x140/FFFFFF/1D1D1D?font=Montserrat&text=Paneer' },
        { id: 'v9', name: 'Garlic', price: 0.50, isVeg: true, image: 'https://placehold.co/140x140/FFFFFF/1D1D1D?font=Montserrat&text=Garlic' },
        { id: 'v10', name: 'Red Paprika', price: 0.75, isVeg: true, image: 'https://placehold.co/140x140/E63946/FFFFFF?font=Montserrat&text=Paprika' }
    ];

    const meatsList = [
        { id: 'm1', name: 'Pepperoni', price: 1.50, isVeg: false, image: '/images/topping_pepperoni_1775751057412.png' },
        { id: 'm2', name: 'Grilled Chicken', price: 1.80, isVeg: false, image: 'https://placehold.co/140x140/E63946/FFFFFF?font=Montserrat&text=Grilled\\nChicken' },
        { id: 'm3', name: 'Chicken Sausage', price: 1.60, isVeg: false, image: 'https://placehold.co/140x140/E63946/FFFFFF?font=Montserrat&text=Sausage' },
        { id: 'm4', name: 'Barbecue Chicken', price: 1.90, isVeg: false, image: '/images/pizza_bbq_1775750989866.png' },
        { id: 'm5', name: 'Spicy Chicken', price: 1.80, isVeg: false, image: 'https://placehold.co/140x140/E63946/FFFFFF?font=Montserrat&text=Spicy\\nChicken' }
    ];

    const handleNext = () => setStep(step + 1);
    const handlePrev = () => setStep(step - 1);

    const toggleItem = (item, type) => {
        setSelection(prev => {
            const list = prev[type];
            const exists = list.find(v => v.id === item.id);
            if (exists) {
                return { ...prev, [type]: list.filter(v => v.id !== item.id) };
            }
            return { ...prev, [type]: [...list, item] };
        });
    };

    const calculateTotal = () => {
        let total = 0;
        if (selection.base) total += selection.base.price;
        if (selection.sauce) total += selection.sauce.price;
        if (selection.cheese) total += selection.cheese.price;
        selection.veggies.forEach(v => total += v.price);
        selection.meats.forEach(m => total += m.price);
        return total;
    };

    const renderSymbol = (isVeg) => {
        return (
            <div style={{
                position: 'absolute', top: 8, right: 8,
                width: '16px', height: '16px',
                border: `1px solid ${isVeg ? '#2A9D8F' : '#E63946'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: 'white', zIndex: 10, borderRadius: '3px'
            }}>
                {isVeg ? (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2A9D8F' }} />
                ) : (
                    <div style={{ width: '0', height: '0', borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderBottom: '8px solid #E63946', marginTop: '-1px' }} />
                )}
            </div>
        );
    };

    const renderOptions = (options, type, isMulti = false) => {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {options.map(opt => {
                    let isSelected = false;
                    if (isMulti) {
                        isSelected = selection[type].some(v => v.id === opt.id);
                    } else {
                        isSelected = selection[type]?.id === opt.id;
                    }

                    return (
                        <motion.div
                            key={opt.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                if (isMulti) {
                                    toggleItem(opt, type);
                                } else {
                                    setSelection({ ...selection, [type]: opt });
                                }
                            }}
                            className={`glass ${isSelected ? 'selected' : ''}`}
                            style={{
                                cursor: 'pointer',
                                border: isSelected ? '3px solid var(--primary)' : '1px solid var(--glass-border)',
                                textAlign: 'center',
                                position: 'relative',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {renderSymbol(opt.isVeg)}
                            <div style={{ width: '100%', height: '140px', background: 'var(--card-bg)' }}>
                                <img src={opt.image} alt={opt.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '15px' }}>
                                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px' }}>{opt.name}</h4>
                                <p style={{ color: 'var(--accent)', fontWeight: 'bold' }}>+${opt.price.toFixed(2)}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="page-wrapper container">
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px' }}>Customize Pizza</h2>
            
            {/* Progress Bar */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} style={{
                        width: '45px', height: '45px', borderRadius: '50%',
                        background: step >= i ? 'var(--primary)' : 'var(--glass-bg)',
                        color: step >= i ? 'white' : 'var(--text-main)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 'bold', border: step >= i ? 'none' : '1px solid var(--glass-border)',
                        boxShadow: step >= i ? '0 4px 10px rgba(230,57,70,0.3)' : 'none',
                        transition: 'all 0.3s'
                    }}>
                        {i}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                >
                    {step === 1 && (
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', textAlign: 'center' }}>Step 1: Choose Your Dough Base</h3>
                            {renderOptions(bases, 'base')}
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', textAlign: 'center' }}>Step 2: Spread The Sauce</h3>
                            {renderOptions(sauces, 'sauce')}
                        </div>
                    )}
                    {step === 3 && (
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', textAlign: 'center' }}>Step 3: Add Cheedar & Mozzarella</h3>
                            {renderOptions(cheeses, 'cheese')}
                        </div>
                    )}
                    {step === 4 && (
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', textAlign: 'center' }}>Step 4: Top with Fresh Veggies</h3>
                            {renderOptions(veggiesList, 'veggies', true)}
                        </div>
                    )}
                    {step === 5 && (
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', textAlign: 'center' }}>Step 5: Pick Delicious Meats</h3>
                            {renderOptions(meatsList, 'meats', true)}
                        </div>
                    )}
                    {step === 6 && (
                        <div className="glass" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', borderRadius: '16px' }}>
                            <h3 style={{ fontSize: '2rem', marginBottom: '20px', textAlign: 'center', fontWeight: '700' }}>Review Your Masterpiece</h3>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><div style={{transform: 'translateY(-2px)'}}>{renderSymbol(true)}</div> <b>Base:</b> {selection.base?.name || 'None'}</span>
                                    <span>${(selection.base?.price || 0).toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><div style={{transform: 'translateY(-2px)'}}>{renderSymbol(true)}</div> <b>Sauce:</b> {selection.sauce?.name || 'None'}</span>
                                    <span>${(selection.sauce?.price || 0).toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><div style={{transform: 'translateY(-2px)'}}>{renderSymbol(true)}</div> <b>Cheese:</b> {selection.cheese?.name || 'None'}</span>
                                    <span>${(selection.cheese?.price || 0).toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><div style={{transform: 'translateY(-2px)'}}>{renderSymbol(true)}</div> <b>Veggies:</b></span>
                                    <div style={{textAlign: 'right'}}>
                                        <div>{selection.veggies.length > 0 ? selection.veggies.map(v => v.name).join(', ') : 'None'}</div>
                                        <div style={{color: 'var(--text-muted)'}}>${selection.veggies.reduce((acc, v) => acc + v.price, 0).toFixed(2)}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><div style={{transform: 'translateY(-2px)'}}>{renderSymbol(false)}</div> <b>Meats:</b></span>
                                    <div style={{textAlign: 'right'}}>
                                        <div>{selection.meats.length > 0 ? selection.meats.map(v => v.name).join(', ') : 'None'}</div>
                                        <div style={{color: 'var(--text-muted)'}}>${selection.meats.reduce((acc, v) => acc + v.price, 0).toFixed(2)}</div>
                                    </div>
                                </div>
                                <hr style={{ borderColor: 'var(--glass-border)' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: 'bold' }}>
                                    <span>Total:</span>
                                    <span style={{ color: 'var(--accent)' }}>${calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
                {step > 1 && (
                    <InteractiveButton type="secondary" onClick={handlePrev}>Back</InteractiveButton>
                )}
                {step < 6 ? (
                    <InteractiveButton onClick={handleNext}>Next Step</InteractiveButton>
                ) : (
                    <InteractiveButton onClick={() => navigate('/checkout')}>Proceed to Checkout</InteractiveButton>
                )}
            </div>
        </div>
    );
};

export default PizzaBuilder;
