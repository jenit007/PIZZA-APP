import React, { useState, useContext } from 'react';
import HeroSection from '../components/HeroSection';
import PizzaCard from '../components/PizzaCard';
import { AppContext } from '../context/AppContext';

const Home = () => {
    const [activeTab, setActiveTab] = useState('veg');
    const { addToCart } = useContext(AppContext);

    const menu = [
        { id: 1, title: 'Margherita Classic', description: 'Fresh tomatoes, extra mozzarella, and basil.', price: 12.99, isVeg: true, image: '/images/classic_margherita_1775750516816.png' },
        { id: 2, title: 'Veggie Supreme', description: 'Peppers, onions, mushrooms, and black olives.', price: 14.50, isVeg: true, image: '/images/veg_supreme_1775750532940.png' },
        { id: 3, title: 'Farmhouse', description: 'Delightful combination of onion, capsicum, tomato & grilled mushroom.', price: 15.50, isVeg: true, image: '/images/pizza_farmhouse_1775750895193.png' },
        { id: 4, title: 'Mexican Green Wave', description: 'A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno.', price: 16.00, isVeg: true, image: '/images/pizza_mexican_1775750930178.png' },
        { id: 5, title: 'Paneer Makhani', description: 'Paneer and Capsicum on Makhani Sauce.', price: 17.00, isVeg: true, image: '/images/pizza_paneer_1775750912433.png' },
        { id: 6, title: 'Cheese and Corn', description: 'Sweet & Juicy Golden corn and 100% real mozzarella cheese in a delectable combination.', price: 13.50, isVeg: true, image: '/images/pizza_cheese_corn_1775751005886.png' },
        { id: 7, title: 'Pepperoni Feast', description: 'Double pepperoni loaded with extra cheese.', price: 15.99, isVeg: false, image: '/images/pepperoni_pizza_1775750550067.png' },
        { id: 8, title: 'Chicken Golden Delight', description: 'Double pepper barbecue chicken, golden corn and extra cheese.', price: 18.50, isVeg: false, image: '/images/pizza_chicken_delight_1775750947597.png' },
        { id: 9, title: 'Non Veg Supreme', description: 'Supreme combination of black olives, onion, capsicum, grilled mushroom, pepper BBQ chicken.', price: 19.99, isVeg: false, image: '/images/pizza_nonveg_supreme_1775750964632.png' },
        { id: 10, title: 'BBQ Chicken', description: 'Pepper barbecue chicken with extra cheese.', price: 16.50, isVeg: false, image: '/images/pizza_bbq_1775750989866.png' },
    ];

    const vegPizzas = menu.filter(p => p.isVeg);
    const nonVegPizzas = menu.filter(p => !p.isVeg);

    return (
        <div className="page-wrapper container">
            <HeroSection />

            <section style={{ marginTop: '80px', paddingBottom: '60px' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center', fontWeight: '700' }}>Explore Our Menu</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px' }}>
                    Authentic ingredients, professionally crafted for you.
                </p>
                
                {/* Veg / Non-Veg Tab Toggle */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
                    <button 
                        onClick={() => setActiveTab('veg')}
                        style={{
                            padding: '12px 30px', borderRadius: '50px',
                            border: `2px solid ${activeTab === 'veg' ? 'var(--accent)' : 'var(--glass-border)'}`,
                            background: activeTab === 'veg' ? 'rgba(42, 157, 143, 0.1)' : 'transparent',
                            color: 'var(--text-main)', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '10px',
                            transition: 'all 0.3s'
                        }}
                    >
                        <div style={{ width: '16px', height: '16px', border: '2px solid #2A9D8F', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', borderRadius: '3px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2A9D8F' }} />
                        </div>
                        Veg Pizzas
                    </button>

                    <button 
                        onClick={() => setActiveTab('non-veg')}
                        style={{
                            padding: '12px 30px', borderRadius: '50px',
                            border: `2px solid ${activeTab === 'non-veg' ? 'var(--primary)' : 'var(--glass-border)'}`,
                            background: activeTab === 'non-veg' ? 'rgba(230, 57, 70, 0.1)' : 'transparent',
                            color: 'var(--text-main)', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '10px',
                            transition: 'all 0.3s'
                        }}
                    >
                        <div style={{ width: '16px', height: '16px', border: '2px solid #E63946', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', borderRadius: '3px' }}>
                             <div style={{ width: '0', height: '0', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: '10px solid #E63946', marginTop: '-1px' }} />
                        </div>
                        Non-Veg Pizzas
                    </button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '40px'
                }}>
                    {(activeTab === 'veg' ? vegPizzas : nonVegPizzas).map(pizza => (
                        <PizzaCard 
                            key={pizza.id}
                            title={pizza.title}
                            description={pizza.description}
                            price={pizza.price}
                            image={pizza.image}
                            isVeg={pizza.isVeg}
                            onAdd={() => { addToCart(pizza); alert(`Added ${pizza.title} to cart!`); }}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
