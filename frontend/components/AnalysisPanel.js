import React from 'react';

export default function AnalysisPanel({ ticker, data, loading }) {
  const renderAnalysisContent = () => {
    if (loading) {
      return (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Analyzing {ticker}...</p>
          <p className="loading-subtitle">Our AI agents are gathering market data and insights</p>
        </div>
      );
    }

    if (!data) {
      return (
        <div className="empty-state">
          <p>No data available</p>
        </div>
      );
    }

    return (
      <div className="analysis-content">
        <div className="ticker-header">
          <h2>{ticker}</h2>
          <span className="badge">AI Analyzed</span>
        </div>

        {data.price && (
          <div className="metric-card">
            <h4>Current Price</h4>
            <div className="price-display">
              ${data.price.toFixed(2)}
            </div>
          </div>
        )}

        {data.sentiment && (
          <div className="metric-card">
            <h4>Market Sentiment</h4>
            <div className="sentiment">
              <span className={`sentiment-badge ${data.sentiment.toLowerCase()}`}>
                {data.sentiment}
              </span>
            </div>
          </div>
        )}

        {data.recommendation && (
          <div className="metric-card">
            <h4>AI Recommendation</h4>
            <div className="recommendation">
              {data.recommendation}
            </div>
          </div>
        )}

        {data.analysis && (
          <div className="metric-card">
            <h4>Detailed Analysis</h4>
            <p className="analysis-text">{data.analysis}</p>
          </div>
        )}

        <div className="insights-grid">
          {data.insights && Array.isArray(data.insights) && data.insights.map((insight, index) => (
            <div key={index} className="insight-item">
              <div className="insight-icon">💡</div>
              <p>{insight}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="analysis-panel">
      <div className="card">
        <div className="panel-header">
          <h3>Analysis Results</h3>
          <div className="status-indicator">
            {loading ? <span className="status-loading"></span> : <span className="status-ready"></span>}
          </div>
        </div>
        {renderAnalysisContent()}
      </div>

      <style jsx>{`
        .analysis-panel {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .card {
          background: linear-gradient(180deg, rgba(14,22,30,0.75), rgba(8,14,20,0.6));
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 16px 40px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.02);
          backdrop-filter: blur(8px);
          animation: slideIn 0.5s ease-out;
          color: #e8f5ff;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f0f0f0;
        }

        .panel-header h3 {
          color: var(--accent-2);
          font-size: 1.15rem;
          margin: 0;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-loading {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ffd36a;
          animation: pulse 2s infinite;
          box-shadow: 0 0 8px rgba(255,211,106,0.25);
        }

        .status-ready {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #27ae60;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
          text-align: center;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f0f0f0;
          border-top-color: #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        .loading-state p {
          color: #333;
          margin: 0.5rem 0;
          font-weight: 500;
        }

        .loading-subtitle {
          color: #999;
          font-size: 0.9rem;
          font-weight: normal;
        }

        .empty-state {
          text-align: center;
          padding: 2rem;
          color: #999;
        }

        .analysis-content {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .ticker-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .ticker-header h2 {
          margin: 0;
          color: #667eea;
          font-size: 1.8rem;
        }

        .badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .metric-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          padding: 1.2rem;
          border-radius: 8px;
          border-left: 4px solid rgba(102,126,234,0.14);
        }

        .metric-card h4 {
          color: #666;
          margin: 0 0 0.8rem 0;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .price-display {
          font-size: 1.9rem;
          font-weight: 800;
          color: var(--accent);
        }

        .sentiment {
          display: flex;
          gap: 0.5rem;
        }

        .sentiment-badge {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: capitalize;
        }

        .sentiment-badge.positive {
          background: #d4edda;
          color: #155724;
        }

        .sentiment-badge.negative {
          background: #f8d7da;
          color: #721c24;
        }

        .sentiment-badge.neutral {
          background: #d1ecf1;
          color: #0c5460;
        }

        .recommendation {
          background: white;
          padding: 1rem;
          border-radius: 6px;
          color: #333;
          line-height: 1.6;
          font-style: italic;
        }

        .analysis-text {
          color: #555;
          line-height: 1.6;
          margin: 0;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .insight-item {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          padding: 1rem;
          border-radius: 8px;
          display: flex;
          gap: 0.8rem;
          border-left: 3px solid rgba(255,211,106,0.12);
        }

        .insight-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .insight-item p {
          margin: 0;
          color: #333;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
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
          .card {
            padding: 1.5rem;
          }

          .ticker-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .insights-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
