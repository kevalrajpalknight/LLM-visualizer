import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/tokenization', label: 'Tokenization', icon: '🔤' },
    { path: '/segmentation', label: 'Segmentation', icon: '📝' },
    { path: '/lemmatization', label: 'Lemmatization', icon: '📚' },
    { path: '/llm-architecture', label: 'LLM Architecture', icon: '🧠' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>NLP Visualizer</h2>
        <p>Natural Language Processing Tools</p>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <p>Interactive NLP Visualization</p>
      </div>
    </div>
  );
};

export default Sidebar; 