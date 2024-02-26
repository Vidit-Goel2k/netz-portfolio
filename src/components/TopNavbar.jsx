import { Button, Navbar, DarkThemeToggle } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {

  const navigate = useNavigate()

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        {/* <img
          src="/favicon.svg"
          className="h-6 mr-3 sm:h-9"
          alt="Flowbite React Logo"
        /> */}
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          Netz IMS
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button>Get started</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link className="cursor-pointer" onClick={()=> navigate('/')}>Home</Navbar.Link>
        <Navbar.Link className="cursor-pointer" onClick={()=> navigate('/customer')}>CustomerForm</Navbar.Link>
        <Navbar.Link className="cursor-pointer" onClick={()=> navigate('/Links')}>LinkForm</Navbar.Link>
        <Navbar.Link className="cursor-pointer" onClick={()=> navigate('/LinkList')}>LinkList</Navbar.Link>
        <Navbar.Link>About</Navbar.Link>
        <Navbar.Link>Contact</Navbar.Link>
        <DarkThemeToggle />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNavbar;
