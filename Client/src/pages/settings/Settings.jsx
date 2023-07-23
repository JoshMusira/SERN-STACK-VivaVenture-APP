import React from 'react';
import './Settings.css';

const Settings = () => {
  const handleSaveSettings = () => {
    // Handle saving settings logic
  };

  return (
    <div className="settings-container">
      <h1 className="settings-heading">Ecommerce Settings</h1>
      <form>
        <h2 className="section-heading">General Settings</h2>
        <div className="form-group">
          <label htmlFor="storeName">Store Name</label>
          <input type="text" id="storeName" className="input-field" />
        </div>
        <div className="form-group">
          <label htmlFor="storeLogo">Store Logo</label>
          <input type="file" id="storeLogo" className="input-field" accept="image/*" />
        </div>
        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <select id="currency" className="input-field">
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
          </select>
        </div>
        <h2 className="section-heading">Payment Settings</h2>
        <div className="form-group">
          <label htmlFor="paymentGateway">Payment Gateway</label>
          <select id="paymentGateway" className="input-field">
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
            <option value="authorize">Authorize.net</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="apiKey">API Key</label>
          <input type="text" id="apiKey" className="input-field" />
        </div>
        <div className="form-group">
          <label htmlFor="apiSecret">API Secret</label>
          <input type="password" id="apiSecret" className="input-field" />
        </div>
        <h2 className="section-heading">Shipping Settings</h2>
        <div className="form-group">
          <label htmlFor="shippingProvider">Shipping Provider</label>
          <input type="text" id="shippingProvider" className="input-field" />
        </div>
        <div className="form-group">
          <label htmlFor="shippingApiKey">Shipping API Key</label>
          <input type="text" id="shippingApiKey" className="input-field" />
        </div>
        <button type="submit" onClick={handleSaveSettings} className="save-button">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
