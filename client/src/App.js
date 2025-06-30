import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [fullUrl, setFullUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullUrl) {
      setError('Please enter a URL');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/shorten`, { fullUrl });
setShortUrl(`${process.env.REACT_APP_API_URL}/${res.data.shortUrl}`);
      setCopied(false);
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app-container">
      <div className="url-shortener">
        <h1>URL Shortener</h1>
        <p className="description">Shorten your long URLs quickly and easily</p>
        
        <form onSubmit={handleSubmit} className="url-form">
          <div className="input-group">
            <input
              type="text"
              value={fullUrl}
              onChange={(e) => setFullUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              className="url-input"
            />
            <button type="submit" className="shorten-button" disabled={loading}>
              {loading ? 'Shortening...' : 'Shorten'}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>

        {shortUrl && (
          <div className="result-container">
            <p className="result-label">Your Short URL:</p>
            <div className="result-box">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="short-url">
                {shortUrl}
              </a>
              <button onClick={copyToClipboard} className="copy-button">
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;