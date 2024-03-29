import { Table } from "flowbite-react"; // Import necessary Flowbite components
import { useNavigate } from "react-router-dom";

const CustomerItem = ({ customer }) => {
  
  const { customerId, customerName, customerContactName, } = customer 
  const navigate = useNavigate()
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {customerId}
      </Table.Cell>
      <Table.Cell>{customerName}</Table.Cell>
      <Table.Cell>{customerContactName}</Table.Cell>
      <Table.Cell>
        <button
          onClick={()=>{
            navigate(`editCustomer/${customerId}`)
          }}
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          Edit
        </button>
      </Table.Cell>
    </Table.Row>

    // <Card className="p-4 my-4">
    //   <Container>
    //     <Row>
    //       <Col>
    //         <h2>Customer Details</h2>
    //         <p>Customer ID: {customer.customerId}</p>
    //         <p>Customer ID: {customer.customerId}</p>
    //         <p>Customer Name: {customer.customerName}</p>
    //         <p>From: {customer.from}</p>
    //         <p>To: {customer.to}</p>
    //         <p>Customer Customer: {customer.customerCustomer}</p>
    //         <p>Length: {customer.length}</p>
    //         <p>Status: {customer.status}</p>
    //         <p>Core: {customer.core}</p>
    //       </Col>
    //     </Row>
    //   </Container>
    // </Card>
  );
};

export default CustomerItem;
