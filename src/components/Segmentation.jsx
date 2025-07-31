import { useState } from 'react';
import nlp from 'compromise';

const Segmentation = () => {
  const [inputText, setInputText] = useState('');
  const [segments, setSegments] = useState([]);
  const [segmentationType, setSegmentationType] = useState('sentence');
  const [isProcessing, setIsProcessing] = useState(false);

  const segmentationTypes = [
    { value: 'sentence', label: 'Sentence Segmentation', description: 'Break text into sentences' },
    { value: 'paragraph', label: 'Paragraph Segmentation', description: 'Break text into paragraphs' },
    { value: 'word', label: 'Word Segmentation', description: 'Break text into words' },
    { value: 'phrase', label: 'Phrase Segmentation', description: 'Break text into phrases' }
  ];

  const processSegmentation = () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    
    setTimeout(() => {
      try {
        let processedSegments = [];

        switch (segmentationType) {
          case 'sentence':
            processedSegments = segmentBySentences(inputText);
            break;
          case 'paragraph':
            processedSegments = segmentByParagraphs(inputText);
            break;
          case 'word':
            processedSegments = segmentByWords(inputText);
            break;
          case 'phrase':
            processedSegments = segmentByPhrases(inputText);
            break;
          default:
            processedSegments = segmentBySentences(inputText);
        }

        setSegments(processedSegments);
      } catch (error) {
        console.error('Segmentation error:', error);
        setSegments([]);
      }
      
      setIsProcessing(false);
    }, 1000);
  };

  const segmentBySentences = (text) => {
    const doc = nlp(text);
    const sentences = doc.sentences().out('array');
    
    return sentences.map((sentence, index) => ({
      id: `sentence-${index}`,
      text: sentence.trim(),
      type: 'sentence',
      length: sentence.length,
      wordCount: sentence.split(/\s+/).length
    }));
  };

  const segmentByParagraphs = (text) => {
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim());
    
    return paragraphs.map((paragraph, index) => ({
      id: `paragraph-${index}`,
      text: paragraph.trim(),
      type: 'paragraph',
      length: paragraph.length,
      wordCount: paragraph.split(/\s+/).length
    }));
  };

  const segmentByWords = (text) => {
    const words = text.split(/\s+/).filter(word => word.trim());
    
    return words.map((word, index) => ({
      id: `word-${index}`,
      text: word.trim(),
      type: 'word',
      length: word.length,
      wordCount: 1
    }));
  };

  const segmentByPhrases = (text) => {
    const doc = nlp(text);
    const phrases = doc.match('(noun|verb|adjective)+').out('array');
    
    return phrases.map((phrase, index) => ({
      id: `phrase-${index}`,
      text: phrase.trim(),
      type: 'phrase',
      length: phrase.length,
      wordCount: phrase.split(/\s+/).length
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      processSegmentation();
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Segmentation</h1>
        <p className="page-subtitle">
          Break down text into meaningful segments using different segmentation strategies.
        </p>
      </div>

      <div className="input-section">
        <div className="input-group">
          <label className="input-label" htmlFor="segmentation-input">
            Enter your text to segment:
          </label>
          <textarea
            id="segmentation-input"
            className="text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type or paste your text here... (Ctrl+Enter to process)"
            rows={6}
          />
        </div>

        <div className="input-group">
          <label className="input-label">
            Segmentation Type:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {segmentationTypes.map((type) => (
              <label key={type.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="segmentationType"
                  value={type.value}
                  checked={segmentationType === type.value}
                  onChange={(e) => setSegmentationType(e.target.value)}
                  style={{ margin: 0 }}
                />
                <div>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>{type.label}</div>
                  <div style={{ fontSize: '12px', color: '#718096' }}>{type.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
        
        <button 
          className="process-button"
          onClick={processSegmentation}
          disabled={!inputText.trim() || isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            'Segment Text'
          )}
        </button>
      </div>

      {segments.length > 0 && (
        <div className="output-section">
          <h2 className="output-title">
            📝 Segmentation Results
          </h2>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
              <div style={{ textAlign: 'center', padding: '15px', background: '#f7fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
                  {segments.length}
                </div>
                <div style={{ fontSize: '12px', color: '#718096' }}>Total Segments</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', background: '#f7fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
                  {segments.reduce((sum, seg) => sum + seg.wordCount, 0)}
                </div>
                <div style={{ fontSize: '12px', color: '#718096' }}>Total Words</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', background: '#f7fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
                  {(segments.reduce((sum, seg) => sum + seg.length, 0) / segments.length).toFixed(1)}
                </div>
                <div style={{ fontSize: '12px', color: '#718096' }}>Avg Length</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {segments.map((segment) => (
              <div key={segment.id} className="segment-item">
                <div style={{ flex: 1 }}>
                  <div className="segment-text">{segment.text}</div>
                  <div style={{ fontSize: '12px', color: '#718096', marginTop: '5px' }}>
                    Length: {segment.length} chars • Words: {segment.wordCount}
                  </div>
                </div>
                <div className="segment-type">
                  {segment.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Segmentation; 