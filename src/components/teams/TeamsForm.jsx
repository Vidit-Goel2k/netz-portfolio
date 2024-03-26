import { Button, Label, TextInput, Alert } from "flowbite-react";
import { useForm } from "react-hook-form";
import { fireStoreDb } from "../../firebase/firebaseConfig";
import { useState } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const TeamsForm = () => {
  const [formSuccess, setFormSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const teamsFormSubmitHandler = async (teamData) => {
    const teamId = await getTeamId();
    const { teamName, teamLeaderName } = teamData;
    try {
      const TeamsRef = await addDoc(collection(fireStoreDb, "teams"), {
        teamId: teamId,
        teamName: teamName,
        teamLeaderName: teamLeaderName,
      });
      console.log("Document written with ID: ", TeamsRef.id);
      setFormSuccess(true);
      setTimeout(()=>{
        setFormSuccess(false)
      }, 1000)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getTeamId = async () => {
    const teamIdQuery = query(
      collection(fireStoreDb, "teams"),
      orderBy("teamId", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(teamIdQuery);

    if (querySnapshot.empty) {
      return 1;
    }
    const highestTeamId = querySnapshot.docs[0].data().teamId;

    return highestTeamId + 1;
  };

  return (
    <>
        
      {formSuccess && (
        <Alert color="success">
          <span className="font-medium">Success!</span> Form Submitted
          Successfuly 
        </Alert>
      )}
        <div className="flex items-center justify-center h-screen ">
        <form
            onSubmit={handleSubmit(teamsFormSubmitHandler)}
            className="flex flex-col max-w-md gap-4"
        >
            <div>
            <div className="block mb-2">
                <Label htmlFor="teamName" value="Team Name" />
            </div>
            <TextInput
                {...register("teamName")}
                id="teamName"
                type="text"
                placeholder="GGN Team"
                required
            />
            </div>
            <div>
            <div className="block mb-2">
                <Label htmlFor="teamLeaderName" value="Team Leader Name" />
            </div>
            <TextInput
                {...register("teamLeaderName")}
                id="teamLeaderName"
                type="text"
                placeholder="John Doe"
                required
            />
            </div>
            <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
        </form>
        </div>
    </>
  );
};

export default TeamsForm;
