import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import store  from './store/index.ts';


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
    <Toaster/>
  </Provider>,
)
