import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { fireStoreDb } from "../../../firebase/firebaseConfig"; // Import your Firestore config

import { Table, Button } from "flowbite-react"; // Import Container and Card
import EmployeeItem from "./EmployeeItem";
import { useNavigate } from "react-router-dom";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesCollection = collection(fireStoreDb, "employees");
        const employeesQuery = query(employeesCollection, orderBy("employeeId", "desc"))
        const employeesSnapshot = await getDocs(employeesQuery);
        
        const employeesData = employeesSnapshot.docs.map((doc) => doc.data());
        // employeesData.sort((a, b) => a.employeeId - b.employeeId);

        setEmployees(employeesData);
        setLoading(false);

        console.log(`Retrieved ${employeesData.length} Documents`);
      } catch (e) {
        setLoading(true);
        console.error("Error getting documents: ", e);
      }
    };
    fetchEmployees();
  }, []);

  const {Head, HeadCell, Body, Row, Cell} = Table;

  return (
    <div className="flex flex-col h-screen overflow-x-auto">
      <Table striped hoverable>
        <Head>
          <HeadCell>Employee Id</HeadCell>
          <HeadCell>Employee Name</HeadCell>
          <HeadCell>Team Name</HeadCell>
          <HeadCell>Employee Phone</HeadCell>
          <HeadCell>Employee Role</HeadCell>
          <HeadCell>Is Leader</HeadCell>
          <HeadCell>
              Edit
          </HeadCell>
        </Head>
        <Body className="divide-y">
          {loading === true ? (
            // TODO: Add Shimmer UI
            <Row><Cell>Loading...</Cell></Row>
            ) : (
            employees.map((employee) => <EmployeeItem key={employee.employeeId} employee={employee} />)
          )}
        </Body>
      </Table>
      <Button 
        size="lg"
        className="self-end m-4 text-6xl size-12"
        onClick={()=>{
          navigate('/addEmployee')
        }}
      >+</Button>
    </div>
  );
};

export default EmployeesList;
