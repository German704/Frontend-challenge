import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from './routes'

function App() {
  return (
    <StrictMode>
      <RouterProvider router={routes} />
   </StrictMode>
  )
}

export default App
