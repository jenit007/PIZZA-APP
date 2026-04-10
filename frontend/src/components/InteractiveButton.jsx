import React from 'react';
import { motion } from 'framer-motion';

const InteractiveButton = ({ children, onClick, type = 'primary', style = {}, ...props }) => {
  const className = type === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      onClick={onClick}
      style={{ ...style }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default InteractiveButton;
