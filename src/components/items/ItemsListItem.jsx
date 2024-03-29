import { Table } from "flowbite-react"; // Import necessary Flowbite components

const ItemsListItem = ({ item }) => {
  
  const { itemId, itemName, itemQuantity, } = item 

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {itemId}
      </Table.Cell>
      <Table.Cell>{itemName}</Table.Cell>
      <Table.Cell>{itemQuantity}</Table.Cell>
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
    //         <h2>Item Details</h2>
    //         <p>Item ID: {item.itemId}</p>
    //         <p>Item ID: {item.itemId}</p>
    //         <p>Item Name: {item.itemName}</p>
    //         <p>From: {item.from}</p>
    //         <p>To: {item.to}</p>
    //         <p>Item Item: {item.itemsListItem}</p>
    //         <p>Length: {item.length}</p>
    //         <p>Status: {item.status}</p>
    //         <p>Core: {item.core}</p>
    //       </Col>
    //     </Row>
    //   </Container>
    // </Card>
  );
};

export default ItemsListItem;
