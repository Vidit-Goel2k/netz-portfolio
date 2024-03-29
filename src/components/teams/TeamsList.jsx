import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { fireStoreDb } from "../../firebase/firebaseConfig"; // Import your Firestore config

import { Table, Button } from "flowbite-react"; // Import Container and Card
import TeamItem from "./TeamItem";
import { useNavigate } from "react-router-dom";

const TeamsList = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsCollection = collection(fireStoreDb, "teams");
        const teamsQuery = query(teamsCollection, orderBy("teamId", "desc"))
        const teamsSnapshot = await getDocs(teamsQuery);
        
        const teamsData = teamsSnapshot.docs.map((doc) => doc.data());
        // teamsData.sort((a, b) => a.teamId - b.teamId);

        setTeams(teamsData);
        setLoading(false);

        console.log(`Retrieved ${teamsData.length} Documents`);
      } catch (e) {
        setLoading(true);
        console.error("Error getting documents: ", e);
      }
    };
    fetchTeams();
  }, []);

  const {Head, HeadCell, Body, Row, Cell} = Table;

  return (
    <div className="flex flex-col h-screen overflow-x-auto">
      <Table striped hoverable>
        <Head>
          <HeadCell>Team Id</HeadCell>
          <HeadCell>Team Name</HeadCell>
          <HeadCell>Team Leader</HeadCell>
          <HeadCell>
              Edit
          </HeadCell>
        </Head>
        <Body className="divide-y">
          {loading === true ? (
            // TODO: Add Shimmer UI
            <Row><Cell>Loading...</Cell></Row>
            ) : (
            teams.map((team) => <TeamItem key={team.teamId} team={team} />)
          )}
        </Body>
      </Table>
      <Button 
        size="lg"
        className="self-end m-4 text-6xl size-12"
        onClick={()=>{
          navigate('/addTeam')
        }}
      >+</Button>
    </div>
  );
};

export default TeamsList;
