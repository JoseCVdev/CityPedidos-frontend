import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CityPedidosApp } from './CityPedidosApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CityPedidosApp/>
  </StrictMode>,
)
