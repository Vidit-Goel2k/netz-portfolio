import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { fireStoreDb } from "../../firebase/firebaseConfig"; // Import your Firestore config

import { Table, Button } from "flowbite-react"; // Import Container and Card
import { useNavigate } from "react-router-dom";
import ItemsListItem from "./ItemsListItem";

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsCollection = collection(fireStoreDb, "items");
        const itemsQuery = query(itemsCollection, orderBy("itemId", "desc"))
        const itemsSnapshot = await getDocs(itemsQuery);
        
        const itemsData = itemsSnapshot.docs.map((doc) => doc.data());
        // itemsData.sort((a, b) => a.itemId - b.itemId);

        setItems(itemsData);
        setLoading(false);

        console.log(`Retrieved ${itemsData.length} Documents`);
      } catch (e) {
        setLoading(true);
        console.error("Error getting documents: ", e);
      }
    };
    fetchItems();
  }, []);

  const {Head, HeadCell, Body, Row, Cell} = Table;

  return (
    <div className="flex flex-col h-screen overflow-x-auto">
      <Table striped hoverable>
        <Head>
          <HeadCell>item Id</HeadCell>
          <HeadCell>item Name</HeadCell>
          <HeadCell>item Quantity</HeadCell>
          <HeadCell>
              Edit
          </HeadCell>
        </Head>
        <Body className="divide-y">
          {loading === true ? (
            // TODO: Add Shimmer UI
            <Row><Cell>Loading...</Cell></Row>
            ) : (
            items.map((item) => <ItemsListItem key={item.itemId} item={item} />)
          )}
        </Body>
      </Table>
      <Button 
        size="lg"
        className="self-end m-4 text-6xl size-12"
        onClick={()=>{
          navigate('/addItem')
        }}
      >+</Button>
    </div>
  );
};

export default ItemsList;
