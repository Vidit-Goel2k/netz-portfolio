import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const Body = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
        <Button onClick={()=> navigate('/customer')} >Customer Form</Button> 
        <Button onClick={()=> navigate('/links')} >Links Form</Button> 
    </div>
  )
}

export default Body