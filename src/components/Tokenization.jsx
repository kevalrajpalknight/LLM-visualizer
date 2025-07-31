import { useState } from 'react';
import nlp from 'compromise';

const Tokenization = () => {
  const [inputText, setInputText] = useState('');
  const [tokens, setTokens] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processTokenization = () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      try {
        const doc = nlp(inputText);
        const tokenized = doc.json();
        
        const processedTokens = tokenized.map((sentence, sentenceIndex) => {
          return sentence.terms.map((term, termIndex) => ({
            id: `${sentenceIndex}-${termIndex}`,
            text: term.text,
            type: term.tags.join(', '),
            normalized: term.normal || term.text,
            position: termIndex
          }));
        }).flat();

        setTokens(processedTokens);
      } catch (error) {
        console.error('Tokenization error:', error);
        // Fallback to simple word splitting
        const simpleTokens = inputText.split(/\s+/).map((word, index) => ({
          id: `simple-${index}`,
          text: word,
          type: 'word',
          normalized: word.toLowerCase(),
          position: index
        }));
        setTokens(simpleTokens);
      }
      
      setIsProcessing(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      processTokenization();
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Tokenization</h1>
        <p className="page-subtitle">
          Break down text into individual tokens and see how natural language processing 
          understands the structure of your input.
        </p>
      </div>

      <div className="input-section">
        <div className="input-group">
          <label className="input-label" htmlFor="tokenization-input">
            Enter your text to tokenize:
          </label>
          <textarea
            id="tokenization-input"
            className="text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type or paste your text here... (Ctrl+Enter to process)"
            rows={4}
          />
        </div>
        
        <button 
          className="process-button"
          onClick={processTokenization}
          disabled={!inputText.trim() || isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            'Tokenize Text'
          )}
        </button>
      </div>

      {tokens.length > 0 && (
        <div className="output-section">
          <h2 className="output-title">
            🔤 Tokenization Results
          </h2>
          
          <div className="token-container">
            {tokens.map((token, index) => (
              <div 
                key={token.id} 
                className="token"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  background: token.type.includes('noun') 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : token.type.includes('verb')
                    ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                    : token.type.includes('adjective')
                    ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                    : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                }}
              >
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  {token.type}
                </div>
                <div style={{ fontWeight: 'bold' }}>
                  {token.text}
                </div>
                {token.normalized !== token.text && (
                  <div style={{ fontSize: '10px', opacity: 0.7 }}>
                    {token.normalized}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', padding: '15px', background: '#f7fafc', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '10px', color: '#2d3748' }}>Token Statistics:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
              <div>
                <strong>Total Tokens:</strong> {tokens.length}
              </div>
              <div>
                <strong>Unique Tokens:</strong> {new Set(tokens.map(t => t.normalized)).size}
              </div>
              <div>
                <strong>Average Length:</strong> {(tokens.reduce((sum, t) => sum + t.text.length, 0) / tokens.length).toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tokenization; 