import {
	Button,
	Label,
	TextInput,
	Alert,
	Radio,
	Select,
	Checkbox,
} from "flowbite-react";
import { useForm } from "react-hook-form";
import { fireStoreDb } from "../../../firebase/firebaseConfig";
import { useState, useEffect } from "react";
import {
	collection,
	addDoc,
	getDocs,
	query,
	orderBy,
	limit,
	where,
} from "firebase/firestore";

const EmployeeForm = () => {
	const [formSuccess, setFormSuccess] = useState(false);

	const [teams, setTeams] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTeams = async () => {
			try {
				const teamsCollection = collection(fireStoreDb, "teams");
				const teamsSnapshot = await getDocs(teamsCollection);

				const teamsData = teamsSnapshot.docs.map((doc) => doc.data());

				setTeams(teamsData);
				setLoading(false);
			} catch (e) {
				setLoading(true);
				console.error("Error getting documents: ", e);
			}
		};
		fetchTeams();
	}, []);

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm({
		defaultValues: {
			employeeId: 0,
			teamId: 0,
			employeeName: "",
			employeeRole: "",
			employeePhone: 0,
			isEmployeeLeader: "false",
		},
	});

	const employeeFormSubmitHandler = async (employeeData) => {
		const employeeId = await getEmployeeId();
		const { employeeName, employeeRole } = employeeData;
		const employeePhone = parseInt(employeeData.employeePhone);
		const teamId = parseInt(employeeData.teamId);
		const teamName = await getTeamName(teamId);
		const isEmployeeLeader = Boolean(employeeData.isEmployeeLeader);
		console.log(employeeData);
		try {
			const EmployeesRef = await addDoc(collection(fireStoreDb, "employees"), {
				employeeId: employeeId,
				employeeName: employeeName,
				employeePhone: employeePhone,
				employeeRole: employeeRole,
				isEmployeeLeader: isEmployeeLeader,
				teamId: teamId,
				teamName: teamName,
			});
			console.log("Document written with ID: ", EmployeesRef.id);
			setFormSuccess(true);
			setTimeout(() => {
				setFormSuccess(false);
			}, 1000);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	const getTeamName = async (teamId) => {
		try {
			const teamNameQuery = query(
				collection(fireStoreDb, "teams"),
				where("teamId", "==", teamId)
			);
			const querySnapshot = await getDocs(teamNameQuery);

			if (querySnapshot.empty) {
				return null;
			}
			const teamName = querySnapshot.docs[0].data().teamName;
			return teamName;
		} catch (error) {
			console.error("Error fetching team name:", error);
			return null; // Return null or handle the error accordingly
		}
	};

	const getEmployeeId = async () => {
		const employeeIdQuery = query(
			collection(fireStoreDb, "employees"),
			orderBy("employeeId", "desc"),
			limit(1)
		);
		const querySnapshot = await getDocs(employeeIdQuery);

		if (querySnapshot.empty) {
			return 1;
		}
		const highestEmployeeId = querySnapshot.docs[0].data().employeeId;

		return highestEmployeeId + 1;
	};

	return (
		<>
			{formSuccess && (
				<Alert color="success">
					<span className="font-medium">Success!</span> Form Submitted
					Successfuly
				</Alert>
			)}
			<div className="flex items-center justify-center h-screen text-base ">
				<form
					onSubmit={handleSubmit(employeeFormSubmitHandler)}
					className="flex flex-col max-w-md gap-4"
				>
					<div>
						<div className="block mb-2">
							<Label htmlFor="employeeName" value="Employee Name" />
						</div>
						<TextInput
							{...register("employeeName")}
							id="employeeName"
							type="text"
							required
						/>
					</div>
					<div>
						<div className="block mb-2">
							<Label htmlFor="employeephone" value="Employee phone" />
						</div>
						<TextInput
							{...register("employeephone")}
							id="employeephone"
							type="tel"
							required
						/>
					</div>
					<div className="grid grid-cols-2">
						<Label htmlFor="role" className="dark:text-white" value="Role" />
						<fieldset name="role" className="flex flex-row max-w-md gap-4">
							<div className="flex items-center gap-2">
								<Radio
									{...register("employeeRole")}
									id="united-state"
									name="role"
									value="splicer"
									defaultChecked
								/>
								<Label htmlFor="united-state">Splicer</Label>
							</div>
							<div className="flex items-center gap-2">
								<Radio
									{...register("employeeRole")}
									id="driver"
									name="role"
									value="driver"
								/>
								<Label htmlFor="driver">Driver</Label>
							</div>
							<div className="flex items-center gap-2">
								<Radio
									{...register("employeeRole")}
									id="labor"
									name="role"
									value="labor"
								/>
								<Label htmlFor="labor">Labor</Label>
							</div>
						</fieldset>
					</div>
					<div className="flex justify-between ">
						<Label htmlFor="isLeader">Leader</Label>
						<Checkbox
							{...register("isEmployeeLeader")}
							className="size-6"
							id="isLeader"
						/>
					</div>

					<div className="max-w-md">
						<div className="block mb-2">
							<Label htmlFor="team" value="Select Team" />
						</div>
						<Select id="team" {...register("teamId")} required>
							{loading === true ? (
								// TODO: Add Shimmer UI
								<>Loading...</>
							) : (
								teams.map((team) => (
									<option value={team.teamId} key={team.teamId}>
										{team.teamName}
									</option>
								))
							)}
						</Select>
					</div>

					<Button disabled={isSubmitting} type="submit">
						{isSubmitting ? "Submitting..." : "Submit"}
					</Button>
				</form>
			</div>
		</>
	);
};

export default EmployeeForm;
