import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { fireStoreDb } from "../../firebase/firebaseConfig"; // Import your Firestore config

import { Table, Button } from "flowbite-react"; // Import Container and Card
import LinkItem from "./LinkItem";
import { useNavigate } from "react-router-dom";

const LinksList = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const linksCollection = collection(fireStoreDb, "links");
        const linksQuery = query(linksCollection, orderBy("linkId", "desc"))
        const linksSnapshot = await getDocs(linksQuery);
        
        const linksData = linksSnapshot.docs.map((doc) => doc.data());
        // linksData.sort((a, b) => a.linkId - b.linkId);

        setLinks(linksData);
        setLoading(false);

        console.log(`Retrieved ${linksData.length} Documents`);
      } catch (e) {
        setLoading(true);
        console.error("Error getting documents: ", e);
      }
    };
    fetchLinks();
  }, []);

  const {Head, HeadCell, Body, Row, Cell} = Table;

  return (
    <div className="flex flex-col overflow-x-auto">
      <Table striped hoverable>
        <Head>
          <HeadCell>linkId</HeadCell>
          <HeadCell>customerId</HeadCell>
          <HeadCell>customerName</HeadCell>
          <HeadCell>from</HeadCell>
          <HeadCell>to</HeadCell>
          <HeadCell>customer Link</HeadCell>
          <HeadCell>length</HeadCell>
          <HeadCell>status</HeadCell>
          <HeadCell>core</HeadCell>
          <HeadCell>
            <span className="sr-only">Edit</span>
          </HeadCell>
        </Head>
        <Body className="divide-y">
          {loading === true ? (
            // TODO: Add Shimmer UI
            <Row><Cell>Loading...</Cell></Row>
            ) : (
            links.map((link) => <LinkItem key={link.linkId} link={link} />)
          )}
        </Body>
      </Table>
      <Button
        size="lg"
        className="self-end m-4 text-6xl size-12"
        onClick={()=>{
          navigate('/addLink')
        }}
      >+</Button>
    </div>
  );
};

export default LinksList;
