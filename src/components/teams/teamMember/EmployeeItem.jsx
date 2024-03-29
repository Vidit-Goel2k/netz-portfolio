import { Table } from "flowbite-react"; // Import necessary Flowbite components

const EmployeeItem = ({ employee }) => {
  
  const { employeeId, employeeName, employeePhone, employeeRole, employeeIsLeader, teamName } = employee
  
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {employeeId}
      </Table.Cell>
      <Table.Cell>{employeeName}</Table.Cell>
      <Table.Cell>{teamName}</Table.Cell>
      <Table.Cell>{employeePhone}</Table.Cell>
      <Table.Cell>{employeeRole}</Table.Cell>
      <Table.Cell>{employeeIsLeader ? "Yes" : "No"}</Table.Cell>
      <Table.Cell>
        <a
          href="#"
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          Edit
        </a>
      </Table.Cell>
    </Table.Row>

    // <Card className="p-4 my-4">
    //   <Container>
    //     <Row>
    //       <Col>
    //         <h2>Employee Details</h2>
    //         <p>Employee ID: {employee.employeeId}</p>
    //         <p>Employee ID: {employee.employeeId}</p>
    //         <p>Employee Name: {employee.employeeName}</p>
    //         <p>From: {employee.from}</p>
    //         <p>To: {employee.to}</p>
    //         <p>Employee Employee: {employee.employeeEmployee}</p>
    //         <p>Length: {employee.length}</p>
    //         <p>Status: {employee.status}</p>
    //         <p>Core: {employee.core}</p>
    //       </Col>
    //     </Row>
    //   </Container>
    // </Card>
  );
};

export default EmployeeItem;
