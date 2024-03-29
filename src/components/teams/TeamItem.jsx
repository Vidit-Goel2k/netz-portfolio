import { Table } from "flowbite-react"; // Import necessary Flowbite components

const TeamItem = ({ team }) => {
  
  const { teamId, teamName, teamLeaderName, } = team 

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {teamId}
      </Table.Cell>
      <Table.Cell>{teamName}</Table.Cell>
      <Table.Cell>{teamLeaderName}</Table.Cell>
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
    //         <h2>Team Details</h2>
    //         <p>Team ID: {team.teamId}</p>
    //         <p>Team ID: {team.teamId}</p>
    //         <p>Team Name: {team.teamName}</p>
    //         <p>From: {team.from}</p>
    //         <p>To: {team.to}</p>
    //         <p>Team Team: {team.teamTeam}</p>
    //         <p>Length: {team.length}</p>
    //         <p>Status: {team.status}</p>
    //         <p>Core: {team.core}</p>
    //       </Col>
    //     </Row>
    //   </Container>
    // </Card>
  );
};

export default TeamItem;
