import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

const PizzaCard = ({ title, description, price, image, isVeg, onAdd }) => {
  return (
    <motion.div 
      className="glass"
      whileHover={{ y: -10 }}
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px'
      }}
    >
      {/* Diet Indicator (Veg/Non-Veg Symbol) */}
      <div style={{
          position: 'absolute', top: 20, right: 20,
          width: '24px', height: '24px',
          border: `2px solid ${isVeg ? '#2A9D8F' : '#E63946'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'white', zIndex: 10, borderRadius: '4px'
      }}>
          {isVeg ? (
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#2A9D8F' }} />
          ) : (
              <div style={{ width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '12px solid #E63946', marginTop: '-2px' }} />
          )}
      </div>

      <div style={{ 
        width: '100%', 
        height: '240px', 
        borderRadius: '12px', 
        overflow: 'hidden',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px'
      }}>
        {image ? (
            <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.3))' }} />
        ) : (
            <div style={{ fontSize: '60px' }}>🍕</div>
        )}
      </div>

      <div>
        <h3 style={{ fontSize: '20px', fontWeight: '600' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '5px', minHeight: '40px' }}>{description}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <span style={{ fontSize: '22px', fontWeight: '700' }}>${price.toFixed(2)}</span>
        <button 
          onClick={onAdd}
          style={{
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(230,57,70,0.3)',
            transition: 'transform 0.2s',
            fontSize: '22px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FiPlus />
        </button>
      </div>
    </motion.div>
  );
};

export default PizzaCard;
