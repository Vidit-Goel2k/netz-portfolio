import { Table } from "flowbite-react"; // Import necessary Flowbite components

const LinkItem = ({ link }) => {
  
  const { linkId, customerId, customerName, from, to, customerLink, length, status, core } = link

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {linkId}
      </Table.Cell>
      <Table.Cell>{customerId}</Table.Cell>
      <Table.Cell>{customerName}</Table.Cell>
      <Table.Cell>{from}</Table.Cell>
      <Table.Cell>{to}</Table.Cell>
      <Table.Cell>{customerLink}</Table.Cell>
      <Table.Cell>{length}</Table.Cell>
      <Table.Cell>{status}</Table.Cell>
      <Table.Cell>{core}</Table.Cell>
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
    //         <h2>Link Details</h2>
    //         <p>Link ID: {link.linkId}</p>
    //         <p>Customer ID: {link.customerId}</p>
    //         <p>Customer Name: {link.customerName}</p>
    //         <p>From: {link.from}</p>
    //         <p>To: {link.to}</p>
    //         <p>Customer Link: {link.customerLink}</p>
    //         <p>Length: {link.length}</p>
    //         <p>Status: {link.status}</p>
    //         <p>Core: {link.core}</p>
    //       </Col>
    //     </Row>
    //   </Container>
    // </Card>
  );
};

export default LinkItem;
