import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './style.css'

import Ecommerce from './ecommerce/Ecommerce';
import NotFoundPage from './ecommerce/assets/components/NotFoundPage'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/*" element={<Ecommerce />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
  );
}

export default App;
