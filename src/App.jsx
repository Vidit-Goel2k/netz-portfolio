import { Outlet } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';

const App = () => {
  return (
    <div className='dark:bg-blue-900'>
      <TopNavbar />
      <Outlet />
    </div>
  )
}

export default App