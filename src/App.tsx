import { StrictMode, Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import { getProjects, initializeProjects, initializeUsers } from './utils/fakeBackend';


function App() {
  if (getProjects().length === 0) {
    initializeUsers();
    initializeProjects();
  }
  
  return (
    <StrictMode>
      <Suspense fallback={<div>...Loading</div>}>
      <RouterProvider router={routes} />
      </Suspense>
   </StrictMode>
  )
}

export default App
