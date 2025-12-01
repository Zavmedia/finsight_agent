import React, { useState } from 'react';

export default function Dashboard({ onAnalyze, loading }) {
  const [ticker, setTicker] = useState('');
  const [error, setError] = useState('');

  const popularStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ticker.trim()) {
      setError('Please enter a stock ticker');
      return;
    }
    setError('');
    onAnalyze(ticker.toUpperCase());
  };

  const handleQuickSelect = (symbol) => {
    setTicker(symbol);
    setError('');
    onAnalyze(symbol);
  };

  return (
    <div className="dashboard">
      <div className="card search-card">
        <h2>Stock Analysis</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="Enter stock ticker (e.g., AAPL)"
              className="ticker-input"
              disabled={loading}
            />
            <button 
              type="submit" 
              className="search-btn"
              disabled={loading}
            >
              {loading ? '🔄 Analyzing...' : '🔍 Analyze'}
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>

      <div className="card">
        <h3>Popular Stocks</h3>
        <div className="stocks-grid">
          {popularStocks.map((stock) => (
            <button
              key={stock.symbol}
              onClick={() => handleQuickSelect(stock.symbol)}
              className="stock-btn"
              disabled={loading}
            >
              <div className="stock-symbol">{stock.symbol}</div>
              <div className="stock-name">{stock.name}</div>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .card {
          background: linear-gradient(180deg, rgba(20,30,40,0.72), rgba(10,16,22,0.6));
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
          backdrop-filter: blur(8px);
          animation: slideIn 0.5s ease-out;
          color: #dbeaf3;
        }

        .search-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%);
        }

        .card h2 {
          color: var(--accent-2);
          margin-bottom: 1.5rem;
          font-size: 1.6rem;
        }

        .card h3 {
          color: var(--muted);
          margin-bottom: 1.2rem;
          font-size: 1.1rem;
        }

        .input-group {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 1rem;
        }

        .ticker-input {
          flex: 1;
          padding: 0.875rem 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .ticker-input:focus {
          outline: none;
          border-color: rgba(100,200,180,0.5);
          box-shadow: 0 0 0 5px rgba(0,245,160,0.04);
          background: rgba(255,255,255,0.02);
          color: #e6f0f6;
        }

        .ticker-input:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }

        .search-btn {
          padding: 0.875rem 1.4rem;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          color: #02221a;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.98rem;
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
        }

        .search-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
        }

        .search-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .error-message {
          color: #e74c3c;
          font-size: 0.9rem;
          margin-top: 0.5rem;
          padding: 0.5rem;
          background-color: rgba(231, 76, 60, 0.1);
          border-radius: 4px;
          border-left: 3px solid #e74c3c;
        }

        .stocks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .stock-btn {
          padding: 0.9rem;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.18s ease;
          text-align: center;
          font-weight: 600;
          color: var(--accent-2);
        }

        .stock-btn:hover:not(:disabled) {
          border-color: #667eea;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
        }

        .stock-btn:hover:not(:disabled) .stock-symbol {
          color: white;
        }

        .stock-btn:hover:not(:disabled) .stock-name {
          color: rgba(255, 255, 255, 0.9);
        }

        .stock-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .stock-symbol {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--accent);
          margin-bottom: 0.2rem;
        }

        .stock-name {
          font-size: 0.78rem;
          color: var(--muted);
          line-height: 1.2;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .input-group {
            flex-direction: column;
          }

          .search-btn {
            width: 100%;
          }

          .stocks-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
