import { Alert, Button, Label, Radio, Select, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { fireStoreDb } from "../../firebase/firebaseConfig";
import {
	collection,
	addDoc,
	getDocs,
	query,
	orderBy,
	limit,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const LinksForm = () => {
	const [formSuccess, setFormSuccess] = useState(false);

	const [customers, setCustomers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCustomers = async () => {
			try {
				const customersCollection = collection(fireStoreDb, "customers");
				const customersSnapshot = await getDocs(customersCollection);

				const customersData = customersSnapshot.docs.map((doc) => doc.data());

				setCustomers(customersData);
				setLoading(false);
			} catch (e) {
				setLoading(true);
				console.error("Error getting documents: ", e);
			}
		};
		fetchCustomers();
	}, []);

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
		watch,
	} = useForm({
		defaultValues: {
			customerId: 0,
			from: "",
			to: "",
			customerLink: false,
			length: 0,
			status: "active",
			core: "single",
		},
	});

	// const customerWatch = watch("customerLink")
	// console.log(customerWatch)

	const LinksFormSubmitHandler = async (linksData) => {
		const linkId = await getLinkId();
		const customerName = await getCustomerName(parseInt(linksData.customerId))

		const linkDataToSubmit = {
			...linksData,
			linkId: linkId,
			customerId: parseInt(linksData.customerId),
			customerName:customerName,
			customerLink: Boolean(linksData.customerLink),
			length: parseInt(linksData.length),
		};

		console.log(linkDataToSubmit);

		try {
			const LinkRef = await addDoc(
				collection(fireStoreDb, "links"),
				linkDataToSubmit
			);
			console.log("Document written with ID: ", LinkRef.id);
			setFormSuccess(true);
			setTimeout(() => {
				setFormSuccess(false);
			}, 1000);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	const getCustomerName = async (customerId) => {
		try {
			const customerNameQuery = query(
				collection(fireStoreDb, "customers"),
				where("customerId", "==", customerId)
			);
			const querySnapshot = await getDocs(customerNameQuery);

			if (querySnapshot.empty) {
				return null;
			}
			const customerName = querySnapshot.docs[0].data().customerName;
			return customerName;
		} catch (error) {
			console.error("Error fetching customer name:", error);
			return null; // Return null or handle the error accordingly
		}
	};

	const getLinkId = async () => {
		const linkIdQuery = query(
			collection(fireStoreDb, "links"),
			orderBy("linkId", "desc"),
			limit(1)
		);

		const querySnapshot = await getDocs(linkIdQuery);

		if (querySnapshot.empty) {
			return 1;
		}

		const highestLinkId = querySnapshot.docs[0].data().linkId;
		return highestLinkId + 1;
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
					onSubmit={handleSubmit(LinksFormSubmitHandler)}
					className="flex flex-col max-w-md gap-4"
				>
					{/* CustomerId */}
					<div className="max-w-md">
						<div className="block mb-2">
							<Label htmlFor="customer" value="Select Customer" />
						</div>
						<Select id="customer" {...register("customerId")} required>
							{loading === true ? (
								// TODO: Add Shimmer UI
								<>Loading...</>
							) : (
								customers.map((customer) => (
									<option value={customer.customerId} key={customer.customerId}>
										{customer.customerName}
									</option>
								))
							)}
						</Select>
					</div>

					{/* From */}
					<div className="grid grid-cols-2">
						<div className="block mb-2">
							<Label htmlFor="from" value="From" />
						</div>
						<TextInput
							{...register("from")}
							id="from"
							type="text"
							placeholder="Enter Start location of link :"
							required
						/>
					</div>

					{/* To */}
					<div className="grid grid-cols-2">
						<div className="block mb-2">
							<Label htmlFor="to" value="To :" />
						</div>
						<TextInput
							{...register("to")}
							id="to"
							type="text"
							placeholder="Enter End location of link"
							required
						/>
					</div>

					{/* Customer Link */}
					<div className="grid grid-cols-2">
						<Label htmlFor="customerLink" className="mb-4">
							Customer Link :
						</Label>
						<fieldset
							name="customerLink"
							className="flex flex-row max-w-md gap-4"
						>
							<div className="flex items-center gap-2">
								<Label htmlFor="yes">Yes</Label>
								<Radio
									id="yes"
									name="customerLink"
									value="true"
									{...register("customerLink")}
								/>
							</div>
							<div className="flex items-center gap-2">
								<Label htmlFor="no">No</Label>
								<Radio
									id="no"
									name="customerLink"
									value=""
									defaultChecked
									{...register("customerLink")}
								/>
							</div>
						</fieldset>
					</div>

					{/* Length */}
					{watch("customerLink") === "false" && (
						<div className="grid grid-cols-2">
							<div className="block mb-2">
								<Label htmlFor="length" value="Length of Link (mtrs) :" />
							</div>
							<TextInput
								{...register("length")}
								id="length"
								type="number"
								placeholder="enter length of the link"
								required
							/>
						</div>
					)}

					{/* Status */}
					<div className="grid grid-cols-2">
						<Label htmlFor="status">Status :</Label>
						<fieldset name="status" className="flex flex-row max-w-md gap-4">
							<div className="flex items-center gap-2">
								<Radio
									id="active"
									name="status"
									value="active"
									defaultChecked
									{...register("status")}
								/>
								<Label htmlFor="active">Active</Label>
							</div>
							<div className="flex items-center gap-2">
								<Radio
									id="disconnected"
									name="status"
									value="disconnected"
									{...register("status")}
								/>
								<Label htmlFor="disconnected">Disconnected</Label>
							</div>
						</fieldset>
					</div>

					{/* Core */}
					<div className="grid grid-cols-2">
						<Label htmlFor="core" className="mb-4">
							Core :
						</Label>
						<fieldset name="core" className="flex flex-row max-w-md gap-4">
							<div className="flex items-center gap-2">
								<Radio
									id="single"
									name="single"
									value="Single"
									defaultChecked
									{...register("core")}
								/>
								<Label htmlFor="single">Single</Label>
							</div>
							<div className="flex items-center gap-2">
								<Radio
									id="pair"
									name="pair"
									value="Pair"
									{...register("core")}
								/>
								<Label htmlFor="pair">Pair</Label>
							</div>
						</fieldset>
					</div>

					<Button disabled={isSubmitting} type="submit">
						{isSubmitting ? "Submitting..." : "Submit"}
					</Button>
				</form>
			</div>
		</>
	);
};

export default LinksForm;
