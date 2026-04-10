import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import InteractiveButton from '../components/InteractiveButton';
import { AppContext } from '../context/AppContext';

const AdminDashboard = () => {
    const { tab } = useParams();
    const navigate = useNavigate();
    const activeTab = tab || 'inventory';
    const { orderStatus, updateOrderStatus } = useContext(AppContext);
    const [selectedStatus, setSelectedStatus] = useState(orderStatus);
    
    const [inventory, setInventory] = useState([
        { id: 1, name: 'Classic Crust', type: 'Base', stock: 50 },
        { id: 2, name: 'Mozzarella', type: 'Cheese', stock: 12 }
    ]);

    const [editingStockId, setEditingStockId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [showUpdateToast, setShowUpdateToast] = useState('');

    const triggerToast = (message) => {
        setShowUpdateToast(message);
        setTimeout(() => setShowUpdateToast(''), 3000);
    };

    const handleUpdateStock = (id, newStock) => {
        if (newStock !== '' && !isNaN(newStock)) {
            setInventory(inventory.map(item => item.id === id ? { ...item, stock: parseInt(newStock) } : item));
            triggerToast('Stock updated successfully!');
            setEditingStockId(null);
        }
    };

    const handleUpdateOrderStatus = () => {
        updateOrderStatus(selectedStatus);
        triggerToast(`Order status updated to: ${selectedStatus}`);
    };

    return (
        <div className="page-wrapper container">
            <h2 style={{ marginBottom: '30px' }}>Admin Dashboard</h2>
            
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <Link 
                    to="/admin/inventory"
                    style={{
                        padding: '10px 20px',
                        background: activeTab === 'inventory' ? 'var(--primary)' : 'transparent',
                        color: activeTab === 'inventory' ? 'white' : 'var(--text-main)',
                        border: '1px solid var(--primary)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    }}
                >
                    Inventory
                </Link>
                <Link 
                    to="/admin/orders"
                    style={{
                        padding: '10px 20px',
                        background: activeTab === 'orders' ? 'var(--primary)' : 'transparent',
                        color: activeTab === 'orders' ? 'white' : 'var(--text-main)',
                        border: '1px solid var(--primary)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    }}
                >
                    Orders
                </Link>
            </div>

            {showUpdateToast && (
                <div style={{ background: 'var(--primary)', color: 'white', padding: '10px 20px', borderRadius: '8px', marginBottom: '20px' }}>
                    {showUpdateToast}
                </div>
            )}

            <div className="glass" style={{ padding: '30px' }}>
                {activeTab === 'inventory' ? (
                    <div>
                        <h3>Inventory Management</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                            Adjust stock levels. Auto-email triggers when stock falls below threshold.
                        </p>
                        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <th style={{ padding: '10px' }}>Ingredient</th>
                                    <th style={{ padding: '10px' }}>Type</th>
                                    <th style={{ padding: '10px' }}>Stock</th>
                                    <th style={{ padding: '10px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map((item, index) => (
                                    <tr key={item.id} style={{ background: item.stock < 15 ? 'rgba(230, 57, 70, 0.1)' : 'transparent' }}>
                                        <td style={{ padding: '15px 10px' }}>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td style={{ color: item.stock < 15 ? 'var(--primary)' : 'var(--accent)', fontWeight: item.stock < 15 ? 'bold' : 'normal' }}>
                                            {item.stock} {item.stock < 15 && '(Low)'}
                                        </td>
                                        <td>
                                            {editingStockId === item.id ? (
                                                <div style={{ display: 'flex', gap: '5px' }}>
                                                    <input 
                                                        type="number" 
                                                        value={editValue} 
                                                        onChange={(e) => setEditValue(e.target.value)} 
                                                        style={{ width: '60px', borderRadius: '4px', border: '1px solid var(--glass-border)', background:'transparent', color:'var(--text-main)' }} 
                                                    />
                                                    <InteractiveButton onClick={() => handleUpdateStock(item.id, editValue)} style={{ padding: '5px 10px', fontSize: '12px' }}>
                                                        Save
                                                    </InteractiveButton>
                                                </div>
                                            ) : (
                                                <InteractiveButton onClick={() => { setEditingStockId(item.id); setEditValue(item.stock); }} style={{ padding: '5px 10px', fontSize: '12px' }}>
                                                    Update
                                                </InteractiveButton>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <h3>Order Management</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                            Update order statuses. Users will see updates in real-time.
                        </p>
                        <div style={{ border: '1px solid var(--glass-border)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <strong>Order #MOCK-123</strong>
                                <span style={{ color: 'var(--secondary)' }}>$22.50</span>
                            </div>
                            <p style={{ fontSize: '14px', marginBottom: '15px' }}>Classic Crust, Original Tomato, Mozzarella, Mushrooms, Onions</p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <select 
                                    className="input-field" 
                                    style={{ width: 'auto', margin: 0 }}
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                >
                                    <option value="Order Received">Order Received</option>
                                    <option value="In Kitchen">In Kitchen</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                </select>
                                <InteractiveButton onClick={handleUpdateOrderStatus}>Update Status</InteractiveButton>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
