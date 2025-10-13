import React, { useState } from 'react';
import { FaPaypal, FaCreditCard } from 'react-icons/fa';
import './PaymentSettings.scss';

const PaymentSettings: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  const paymentHistory = [
    { id: 1, date: '2023-10-26', campaign: 'Adobe Creative Jam', amount: 1800, status: 'Paid' },
    { id: 2, date: '2023-09-15', campaign: 'Game Dev Market Assets', amount: 600, status: 'Paid' },
    { id: 3, date: '2023-08-01', campaign: 'Steam Wishlist Drive', amount: 1200, status: 'Pending' },
  ];

  return (
    <div className="payment-settings-container">
      <div className="payment-configuration">
        <h2>Payment Configuration</h2>
        <div className="payment-methods">
          <button 
            className={`method-button ${paymentMethod === 'paypal' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('paypal')}
          >
            <FaPaypal /> PayPal
          </button>
          <button 
            className={`method-button ${paymentMethod === 'card' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('card')}
          >
            <FaCreditCard /> Credit/Debit Card
          </button>
        </div>

        {paymentMethod === 'paypal' && (
          <div className="method-details">
            <h3>PayPal Configuration</h3>
            <p>Enter your PayPal email to receive payments.</p>
            <input 
              type="email" 
              placeholder="Enter your PayPal email" 
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
            />
            <button className="save-button">Save PayPal Email</button>
          </div>
        )}

        {paymentMethod === 'card' && (
          <div className="method-details">
            <h3>Credit/Debit Card Configuration</h3>
            <p>Enter your card details to receive payments.</p>
            <input type="text" placeholder="Name on Card" value={cardName} onChange={(e) => setCardName(e.target.value)} />
            <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
            <div className="card-details-row">
              <input type="text" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} />
              <input type="text" placeholder="CVC" value={cardCVC} onChange={(e) => setCardCVC(e.target.value)} />
            </div>
            <button className="save-button">Save Card Details</button>
          </div>
        )}
      </div>

      <div className="payment-history">
        <h2>Payment History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Campaign</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map(payment => (
              <tr key={payment.id}>
                <td>{payment.date}</td>
                <td>{payment.campaign}</td>
                <td>${payment.amount.toLocaleString()}</td>
                <td><span className={`status-badge ${payment.status.toLowerCase()}`}>{payment.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentSettings;
