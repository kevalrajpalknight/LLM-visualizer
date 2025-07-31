import { useState } from "react";
import nlp from "compromise";

const Lemmatization = () => {
  const [inputText, setInputText] = useState("");
  const [lemmas, setLemmas] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const isHelpingVerb = (term) => {
    const helpingVerbs = [
      "is",
      "are",
      "was",
      "were",
      "be",
      "been",
      "being",
      "have",
      "has",
      "had",
      "do",
      "does",
      "did",
      "will",
      "would",
      "could",
      "should",
      "may",
      "might",
      "can",
      "must",
      "shall",
    ];
    return helpingVerbs.includes(term.toLowerCase()); // Convert term to lowercase for case-insensitive comparison
  };

  const processLemmatization = () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      try {
        const doc = nlp(inputText);

        // Get all terms with their original text
        const allTerms = doc.json();

        // Create a copy for lemmatization
        const lemmatizedDoc = nlp(inputText);

        lemmatizedDoc.verbs().toInfinitive();
        lemmatizedDoc.nouns().toSingular();
        lemmatizedDoc.adjectives().toAdverb();

        const lemmatizedTerms = lemmatizedDoc.json();

        console.log(
          "Lemmatized text: ",
          { lemmatizedTerms },
          "All terms: ",
          allTerms
        );

        const processedLemmas = allTerms
          .map((sentence, sentenceIndex) => {
            return sentence.terms.map((term, termIndex) => {
              const originalText = term.text;

              if (isHelpingVerb(originalText)) {
                termIndex += 1;
                return {
                  id: `${sentenceIndex}-${termIndex}`,
                  original: originalText,
                  lemma: originalText,
                  pos: "Other",
                  tags: term.tags,
                  position: termIndex,
                  isChanged: false,
                };
              } else {
                // Find the corresponding lemmatized term
                const lemmatizedTerm =
                  lemmatizedTerms[sentenceIndex]?.terms[termIndex-1];
                const lemmatizedText = lemmatizedTerm
                  ? lemmatizedTerm.text
                  : originalText;
                console.log(
                  "Original: ",
                  originalText,
                  "lemmatizedText: ",
                  lemmatizedText
                );

                const pos =
                  term.tags.find((tag) =>
                    ["Noun", "Verb", "Adjective", "Adverb"].includes(tag)
                  ) || "Other";

                return {
                  id: `${sentenceIndex}-${termIndex}`,
                  original: originalText,
                  lemma: lemmatizedText.toLowerCase(),
                  pos: pos,
                  tags: term.tags,
                  position: termIndex,
                  isChanged:
                    originalText.toLowerCase() !== lemmatizedText.toLowerCase(),
                };
              }
            });
          })
          .flat();

        setLemmas(processedLemmas);
      } catch (error) {
        console.error("Lemmatization error:", error);
        // Fallback to simple word splitting
        const words = inputText.split(/\s+/).filter((word) => word.trim());
        const simpleLemmas = words.map((word, wordIndex) => ({
          id: `simple-${wordIndex}`,
          original: word,
          lemma: word.toLowerCase(),
          pos: "Unknown",
          tags: ["word"],
          position: wordIndex,
          isChanged: false,
        }));
        setLemmas(simpleLemmas);
      }

      setIsProcessing(false);
    }, 1000);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      processLemmatization();
    }
  };

  const getPosColor = (pos) => {
    switch (pos) {
      case "Noun":
        return "#667eea";
      case "Verb":
        return "#f093fb";
      case "Adjective":
        return "#4facfe";
      case "Adverb":
        return "#43e97b";
      default:
        return "#718096";
    }
  };

  const getPosBackground = (pos) => {
    switch (pos) {
      case "Noun":
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      case "Verb":
        return "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
      case "Adjective":
        return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
      case "Adverb":
        return "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)";
      default:
        return "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)";
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Lemmatization</h1>
        <p className="page-subtitle">
          Convert words to their base form (lemma) using compromise's built-in
          lemmatization. Try: "I was running and jumping" → "I was run and jump"
        </p>
      </div>

      <div className="input-section">
        <div className="input-group">
          <label className="input-label" htmlFor="lemmatization-input">
            Enter your text to lemmatize:
          </label>
          <textarea
            id="lemmatization-input"
            className="text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Try: I was running and jumping → I was run and jump, or type your own text... (Ctrl+Enter to process)"
            rows={4}
          />
        </div>

        <button
          className="process-button"
          onClick={processLemmatization}
          disabled={!inputText.trim() || isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            "Lemmatize Text"
          )}
        </button>
      </div>

      {lemmas.length > 0 && (
        <div className="output-section">
          <h2 className="output-title">📚 Lemmatization Results</h2>

          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "15px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  padding: "15px",
                  background: "#f7fafc",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#667eea",
                  }}
                >
                  {lemmas.length}
                </div>
                <div style={{ fontSize: "12px", color: "#718096" }}>
                  Total Words
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  padding: "15px",
                  background: "#f7fafc",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#667eea",
                  }}
                >
                  {new Set(lemmas.map((l) => l.lemma)).size}
                </div>
                <div style={{ fontSize: "12px", color: "#718096" }}>
                  Unique Lemmas
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  padding: "15px",
                  background: "#f7fafc",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#667eea",
                  }}
                >
                  {lemmas.filter((l) => l.isChanged).length}
                </div>
                <div style={{ fontSize: "12px", color: "#718096" }}>
                  Changed Forms
                </div>
              </div>
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {lemmas.map((lemma) => (
              <div key={lemma.id} className="lemma-item">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "white",
                      background: getPosBackground(lemma.pos),
                    }}
                  >
                    {lemma.pos}
                  </div>
                  <div className="original-word">{lemma.original}</div>
                  <div style={{ color: "#718096" }}>→</div>
                  <div
                    className="lemma-word"
                    style={{
                      fontWeight: lemma.isChanged ? "bold" : "normal",
                      color: lemma.isChanged ? "#667eea" : "#718096",
                    }}
                  >
                    {lemma.lemma}
                  </div>
                  {lemma.isChanged && (
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#43e97b",
                        fontWeight: "600",
                        background: "#f0fff4",
                        padding: "2px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      ROOT
                    </div>
                  )}
                </div>
                <div style={{ fontSize: "12px", color: "#718096" }}>
                  {lemma.tags.slice(0, 3).join(", ")}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#f7fafc",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "#2d3748" }}>
              Part of Speech Distribution:
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "10px",
              }}
            >
              {["Noun", "Verb", "Adjective", "Adverb", "Other"].map((pos) => {
                const count = lemmas.filter((l) => l.pos === pos).length;
                const percentage = ((count / lemmas.length) * 100).toFixed(1);
                return (
                  <div key={pos} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: getPosColor(pos),
                      }}
                    >
                      {count}
                    </div>
                    <div style={{ fontSize: "12px", color: "#718096" }}>
                      {pos} ({percentage}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lemmatization;
