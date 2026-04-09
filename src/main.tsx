import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { HashRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <HashRouter>
      <StrictMode>
    <App />
  </StrictMode>,
    </HashRouter>
  </Provider>
 
)
