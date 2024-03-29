import { Navbar, DarkThemeToggle } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {

  const navigate = useNavigate()

  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
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
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
          <Navbar.Link className="cursor-pointer" onClick={()=> navigate('/')}>Home</Navbar.Link>
        <div className="flex flex-col gap-2 px-2">
          <Navbar.Link className="cursor-pointer" onClick={()=> navigate('/addCustomer')}>Add Customer</Navbar.Link>
          <Navbar.Link className="cursor-pointer" onClick={()=> navigate('/customersList')}>Customers list</Navbar.Link>
        </div>
        <div className="flex flex-col gap-2 px-2">
          <Navbar.Link className="cursor-pointer" onClick={()=> navigate('/addLink')}>Add Link</Navbar.Link>
          <Navbar.Link className="cursor-pointer" onClick={()=> navigate('/linksList')}>Links List</Navbar.Link>
        </div>
        <div className="flex flex-col gap-2 px-2">
          <Navbar.Link className="cursor-pointer" onClick={()=> navigate('/addTeam')}>Add Team</Navbar.Link>
          <Navbar.Link className="cursor-pointer" onClick={()=> navigate('/teamsList')}>Teams List</Navbar.Link>
        </div>
        <div className="flex flex-col gap-2 px-2">
          <Navbar.Link className="cursor-pointer" onClick={()=> navigate("/addEmployee")}>Add Employee</Navbar.Link>
          <Navbar.Link className="cursor-pointer" onClick={()=> navigate('/employeesList')}>Employees List</Navbar.Link>
        </div>
        <div className="flex flex-col gap-2 px-2">
          <Navbar.Link className="cursor-pointer" onClick={()=> navigate("/addItem")}>Add Item</Navbar.Link>
          <Navbar.Link className="cursor-pointer" onClick={()=> navigate('/itemsList')}>Items List</Navbar.Link>
        </div>
        <div className="flex flex-col gap-2 px-2">
          <Navbar.Link>About</Navbar.Link>
          <Navbar.Link>Contact</Navbar.Link>
        </div>
          <DarkThemeToggle className="p-0" />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNavbar;