import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddProverb from "./components/AddProverbs";
import ProverbList from "./components/proverbsList";
import EditProverb from "./components/EditProverbs";
import ProverbDetail from "./components/ProverbDetail";

function App() {
  return (
    <Router>
      <div className="max-w-3xl mx-auto p-4">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddProverb onAdd={() => window.location.reload()} />
                <ProverbList />
              </>
            }
          />
          <Route path="/edit/:id" element={<EditProverb />} />
          <Route path="/proverb/:id" element={<ProverbDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
