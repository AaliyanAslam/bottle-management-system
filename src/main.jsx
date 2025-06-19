import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import Layout from "./pages/layout"

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      < Layout />
    </BrowserRouter>
  </StrictMode>
)


