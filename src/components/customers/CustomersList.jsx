import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { fireStoreDb } from "../../firebase/firebaseConfig"; // Import your Firestore config

import { Table, Button } from "flowbite-react"; // Import Container and Card
import CustomerItem from "./CustomerItem";
import { useNavigate } from "react-router-dom";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersCollection = collection(fireStoreDb, "customers");
        const customersQuery = query(customersCollection, orderBy("customerId", "desc"))
        const customersSnapshot = await getDocs(customersQuery);
        
        const customersData = customersSnapshot.docs.map((doc) => doc.data());
        // customersData.sort((a, b) => a.customerId - b.customerId);

        setCustomers(customersData);
        setLoading(false);

        console.log(`Retrieved ${customersData.length} Documents`);
      } catch (e) {
        setLoading(true);
        console.error("Error getting documents: ", e);
      }
    };
    fetchCustomers();
  }, []);

  const {Head, HeadCell, Body, Row, Cell} = Table;

  return (
    <div className="flex flex-col h-screen overflow-x-auto">
      <Table striped hoverable>
        <Head>
          <HeadCell>customer Id</HeadCell>
          <HeadCell>customer Name</HeadCell>
          <HeadCell>customer Contact</HeadCell>
          <HeadCell>
              Edit
          </HeadCell>
        </Head>
        <Body className="divide-y">
          {loading === true ? (
            // TODO: Add Shimmer UI
            <Row><Cell>Loading...</Cell></Row>
            ) : (
            customers.map((customer) => <CustomerItem key={customer.customerId} customer={customer} />)
          )}
        </Body>
      </Table>
      <Button 
        size="lg"
        className="self-end m-4 text-6xl size-12"
        onClick={()=>{
          navigate('/addCustomer')
        }}
      >+</Button>
    </div>
  );
};

export default CustomersList;
