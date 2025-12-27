import LeftPanel from "./components/LeftPanel";
import PatientList from "./components/PatientList";
import Ticker from "./components/Ticker";
import "./App.css";

function App() {
  return (
    <div className="app-bg">
      <div className="tv-wrapper">
        {/* Header */}
        <div className="tv-header">
          <span>LIVE PREVIEW (Waiting Room Display)</span>
          <span className="live-badge">LIVE</span>
        </div>

        {/* Main Content */}
        <div className="tv-content">
          <LeftPanel /> {/* THIS ENABLES SLIDER */}
          <PatientList />
        </div>

        {/* Ticker */}
        <Ticker />
      </div>
    </div>
  );
}

export default App;
