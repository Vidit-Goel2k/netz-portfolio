import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <Button onClick={() => navigate("/addCustomer")}>Add Customer</Button>
        <Button onClick={() => navigate("/addLink")}>Add Links</Button>
        <Button onClick={() => navigate("/addTeam")}>Add Teams</Button>
        <Button onClick={() => navigate("/addEmployee")}>Add Employee</Button>
        <Button onClick={() => navigate("/addItem")}>Add Items</Button>
      </div>
    </>
  );
};

export default Body;
