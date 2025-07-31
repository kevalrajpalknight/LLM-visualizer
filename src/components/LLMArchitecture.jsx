import { useState, useEffect } from 'react';

// 2D LLM Architecture Components
const ArchitectureLayer = ({ title, description, isActive, color, children, step }) => {
  return (
    <div 
      className="architecture-layer"
      style={{
        background: isActive ? color : '#f7fafc',
        border: `2px solid ${isActive ? color : '#e2e8f0'}`,
        color: isActive ? 'white' : '#2d3748',
        transform: isActive ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.5s ease'
      }}
    >
      <div className="layer-header">
        <h3 className="layer-title">{title}</h3>
        <div className="step-indicator">Step {step}</div>
      </div>
      <p className="layer-description">{description}</p>
      {children}
    </div>
  );
};

const TokenizationVisualization = ({ tokens, isActive }) => {
  return (
    <div className="tokenization-viz">
      <div className="tokens-container">
        {tokens.map((token, index) => (
          <div 
            key={index}
            className="token-box"
            style={{
              animationDelay: `${index * 0.1}s`,
              opacity: isActive ? 1 : 0.6
            }}
          >
            <div className="token-text">{token}</div>
            <div className="token-id">#{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EmbeddingVisualization = ({ isActive }) => {
  const dimensions = [768, 1024, 1280, 1536];
  
  return (
    <div className="embedding-viz">
      <div className="embedding-grid">
        {dimensions.map((dim, index) => (
          <div 
            key={index}
            className="embedding-dimension"
            style={{
              background: isActive ? '#4facfe' : '#e2e8f0',
              color: isActive ? 'white' : '#718096',
              animationDelay: `${index * 0.2}s`
            }}
          >
            <div className="dimension-value">{dim}</div>
            <div className="dimension-label">dim</div>
          </div>
        ))}
      </div>
      <div className="embedding-info">
        <div className="info-item">
          <span className="info-label">Vector Space:</span>
          <span className="info-value">High-dimensional</span>
        </div>
        <div className="info-item">
          <span className="info-label">Semantic Meaning:</span>
          <span className="info-value">Captured</span>
        </div>
      </div>
    </div>
  );
};

const AttentionVisualization = ({ isActive }) => {
  const [attentionScores, setAttentionScores] = useState([0.25, 0.35, 0.20, 0.20]);
  const tokens = ['The', 'quick', 'brown', 'fox'];
  
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setAttentionScores(prev => prev.map(() => Math.random() * 0.5 + 0.1));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  return (
    <div className="attention-viz">
      <div className="attention-header">
        <h4>Multi-Head Attention</h4>
        <div className="attention-heads">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(head => (
            <div 
              key={head}
              className="attention-head"
              style={{
                background: isActive ? '#f093fb' : '#e2e8f0',
                color: isActive ? 'white' : '#718096'
              }}
            >
              H{head}
            </div>
          ))}
        </div>
      </div>
      
             <div className="attention-scores">
         <h5>Attention Scores</h5>
         <div className="scores-container">
           {tokens.map((token, index) => (
             <div key={index} className="score-item">
               <div className="token-label">{token}:</div>
               <div className="score-bar-container">
                 <div 
                   className="score-bar"
                   style={{ 
                     width: `${attentionScores[index] * 100}%`,
                     background: isActive ? '#f093fb' : '#cbd5e0',
                     transition: 'width 0.5s ease',
                     minWidth: '4px'
                   }}
                 ></div>
               </div>
               <div className="score-value">
                 {attentionScores[index].toFixed(2)}
               </div>
             </div>
           ))}
         </div>
       </div>
    </div>
  );
};

const FeedForwardVisualization = ({ isActive }) => {
  return (
    <div className="feedforward-viz">
      <div className="ff-layers">
        <div className="ff-layer" style={{ opacity: isActive ? 1 : 0.6 }}>
          <div className="layer-name">Linear 1</div>
          <div className="layer-size">4x → 16x</div>
        </div>
        <div className="ff-arrow">→</div>
        <div className="ff-layer" style={{ opacity: isActive ? 1 : 0.6 }}>
          <div className="layer-name">ReLU</div>
          <div className="layer-size">Activation</div>
        </div>
        <div className="ff-arrow">→</div>
        <div className="ff-layer" style={{ opacity: isActive ? 1 : 0.6 }}>
          <div className="layer-name">Linear 2</div>
          <div className="layer-size">16x → 4x</div>
        </div>
      </div>
    </div>
  );
};

const DecoderVisualization = ({ isActive, predictedToken }) => {
  const vocabulary = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog'];
  
  return (
    <div className="decoder-viz" style={{ opacity: isActive ? 1 : 0.6 }}>
      <div className="vocabulary-container">
        <h5>Vocabulary Distribution</h5>
        <div className="vocab-items">
          {vocabulary.map((word, index) => (
            <div 
              key={index}
              className="vocab-item"
              style={{
                background: predictedToken === word ? '#43e97b' : '#e2e8f0',
                color: predictedToken === word ? 'white' : '#718096',
                transform: predictedToken === word ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
      
      {predictedToken && (
        <div className="prediction-result">
          <div className="prediction-label">Predicted Token:</div>
          <div className="prediction-value">{predictedToken}</div>
        </div>
      )}
    </div>
  );
};

const MatrixMultiplication = ({ isVisible }) => {
  const [animationStep, setAnimationStep] = useState(0);
  
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setAnimationStep(prev => (prev + 1) % 4);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="matrix-multiplication">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Matrix Multiplication (Q, K, V)</h3>
      
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Query Matrix */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Query Matrix (Q)</h4>
          <div className="grid grid-cols-2 gap-1">
            {[0.8, 0.6, 0.9, 0.7].map((val, i) => (
              <div 
                key={i}
                className={`p-2 text-center text-sm font-mono ${
                  animationStep === 0 ? 'bg-blue-200' : 'bg-gray-100'
                }`}
              >
                {val.toFixed(2)}
              </div>
            ))}
          </div>
        </div>

        {/* Key Matrix */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">Key Matrix (K)</h4>
          <div className="grid grid-cols-2 gap-1">
            {[0.7, 0.8, 0.6, 0.9].map((val, i) => (
              <div 
                key={i}
                className={`p-2 text-center text-sm font-mono ${
                  animationStep === 1 ? 'bg-green-200' : 'bg-gray-100'
                }`}
              >
                {val.toFixed(2)}
              </div>
            ))}
          </div>
        </div>

        {/* Value Matrix */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-medium text-purple-800 mb-2">Value Matrix (V)</h4>
          <div className="grid grid-cols-2 gap-1">
            {[0.9, 0.5, 0.8, 0.6].map((val, i) => (
              <div 
                key={i}
                className={`p-2 text-center text-sm font-mono ${
                  animationStep === 2 ? 'bg-purple-200' : 'bg-gray-100'
                }`}
              >
                {val.toFixed(2)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-2">Attention Scores (Q × K^T)</h4>
        <div className="grid grid-cols-4 gap-2">
          {[0.56, 0.64, 0.54, 0.72].map((val, i) => (
            <div 
              key={i}
              className={`p-2 text-center text-sm font-mono ${
                animationStep === 3 ? 'bg-yellow-200' : 'bg-gray-100'
              }`}
            >
              {val.toFixed(2)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SoftmaxVisualization = ({ isVisible }) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setAnimationProgress(prev => Math.min(prev + 0.1, 1));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setAnimationProgress(0);
    }
  }, [isVisible]);

  const probabilities = [0.25, 0.35, 0.20, 0.20];

  return (
    <div className={`softmax-visualization ${isVisible ? 'block' : 'hidden'}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Softmax Probabilities</h3>
      <div className="grid grid-cols-4 gap-4">
        {probabilities.map((prob, index) => (
          <div key={index} className="text-center">
            <div className="bg-gray-200 rounded-lg p-3 mb-2">
              <div 
                className="bg-green-500 rounded-lg transition-all duration-1000"
                style={{ 
                  height: `${prob * 100 * animationProgress}%`,
                  minHeight: '20px'
                }}
              ></div>
            </div>
            <div className="text-sm font-mono text-gray-600">
              {prob.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LLMArchitecture = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputText] = useState('The quick brown fox jumps');
  const [predictedToken, setPredictedToken] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [inputTokens, setInputTokens] = useState([]);
  const [detailedStep, setDetailedStep] = useState(0);

  useEffect(() => {
    if (inputText) {
      setInputTokens(inputText.split(' '));
    }
  }, [inputText]);

  const startAnimation = () => {
    if (!inputText.trim()) return;
    
    setIsAnimating(true);
    setCurrentStep(0);
    setDetailedStep(0);
    setPredictedToken('');
    
    // Step 1: Tokenization
    setTimeout(() => setCurrentStep(1), 500);
    
    // Step 2: Embedding
    setTimeout(() => setCurrentStep(2), 2000);
    
    // Step 3: Encoder
    setTimeout(() => setCurrentStep(3), 4000);
    
    // Step 4: Decoder
    setTimeout(() => {
      setCurrentStep(4);
      setPredictedToken('over');
    }, 6000);
    
    // Reset
    setTimeout(() => {
      setIsAnimating(false);
      setCurrentStep(0);
      setDetailedStep(0);
    }, 8000);
  };

  const startDetailedAnimation = () => {
    setDetailedStep(0);
    
    // Matrix Multiplication
    setTimeout(() => setDetailedStep(1), 500);
    
    // Attention Scores
    setTimeout(() => setDetailedStep(2), 2000);
    
    // Softmax
    setTimeout(() => setDetailedStep(3), 4000);
    
    // Word Selection
    setTimeout(() => setDetailedStep(4), 6000);
    
    // Reset
    setTimeout(() => setDetailedStep(0), 8000);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">LLM Architecture</h1>
        <p className="page-subtitle">
          Visualize how Large Language Models process text through attention mechanisms 
          and generate predictions in a realistic 2D representation.
        </p>
      </div>

      <div className="input-section">
        <div className="input-group">
          <label className="input-label" htmlFor="llm-input">
            Input text (fixed for demonstration):
          </label>
          <input
            id="llm-input"
            className="text-input"
            value={inputText}
            disabled
            placeholder="The quick brown fox jumps"
          />
        </div>
        
        <div className="flex gap-4">
          <button 
            className="process-button"
            onClick={startAnimation}
            disabled={isAnimating}
          >
            {isAnimating ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              'Start Visualization'
            )}
          </button>
          
          <button 
            className="process-button"
            onClick={() => setShowDetails(!showDetails)}
            style={{ background: showDetails ? '#f093fb' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
      </div>

      <div className="output-section">
        <h2 className="output-title">
          🧠 LLM Architecture Visualization
        </h2>
        
        <div className="architecture-container">
          <ArchitectureLayer
            title="Tokenization"
            description="Split input text into individual tokens"
            isActive={currentStep >= 1}
            color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            step={1}
          >
            <TokenizationVisualization 
              tokens={inputTokens} 
              isActive={currentStep >= 1} 
            />
          </ArchitectureLayer>

          <ArchitectureLayer
            title="Embedding"
            description="Convert tokens to high-dimensional vectors"
            isActive={currentStep >= 2}
            color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            step={2}
          >
            <EmbeddingVisualization isActive={currentStep >= 2} />
          </ArchitectureLayer>

          <ArchitectureLayer
            title="Encoder (Self-Attention)"
            description="Process input context with attention mechanisms"
            isActive={currentStep >= 3}
            color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            step={3}
          >
            <AttentionVisualization isActive={currentStep >= 3} />
          </ArchitectureLayer>

          <ArchitectureLayer
            title="Feed Forward"
            description="Apply non-linear transformations"
            isActive={currentStep >= 3}
            color="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
            step={3}
          >
            <FeedForwardVisualization isActive={currentStep >= 3} />
          </ArchitectureLayer>

          <ArchitectureLayer
            title="Decoder"
            description="Generate next token prediction"
            isActive={currentStep >= 4}
            color="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
            step={4}
          >
            <DecoderVisualization 
              isActive={currentStep >= 4} 
              predictedToken={predictedToken}
            />
          </ArchitectureLayer>
        </div>

        {showDetails && (
          <div className="details-section">
            <h3 className="details-title">
              Detailed Attention Mechanism
            </h3>
            
            <div className="details-content">
              <MatrixMultiplication isVisible={detailedStep >= 1} />
              <SoftmaxVisualization isVisible={detailedStep >= 3} />
              
              {detailedStep >= 4 && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Word Selection</h3>
                  <div className="bg-green-100 p-6 rounded-lg">
                    <div className="text-2xl font-bold text-green-800">"over"</div>
                    <div className="text-sm text-green-600 mt-2">Selected with highest probability</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-center mt-6">
              <button 
                className="process-button"
                onClick={startDetailedAnimation}
                style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
              >
                Start Detailed Animation
              </button>
            </div>
          </div>
        )}

        {predictedToken && (
          <div className="prediction-section">
            <h3 className="prediction-title">Predicted Next Token:</h3>
            <div className="prediction-value">
              "{predictedToken}"
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LLMArchitecture; 