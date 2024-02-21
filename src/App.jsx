import { Outlet } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';

const App = () => {
  return (
    <div className=' bg-blue-950'>
      <TopNavbar />
      <Outlet />
    </div>
  )
}

export default App