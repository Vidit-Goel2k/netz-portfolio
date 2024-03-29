import { Button, Label, TextInput, Alert } from "flowbite-react";
import { useForm } from "react-hook-form";
import { fireStoreDb } from "../../firebase/firebaseConfig";
import { useState } from "react";
import {
	collection,
	addDoc,
	getDocs,
	query,
	orderBy,
	limit,
} from "firebase/firestore";

const ItemsForm = () => {
	const [formSuccess, setFormSuccess] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm({
		defaultValues:{
			itemId: 0,
			itemName: "",
			itemQuantity: 0,
		}
	});

	const itemsFormSubmitHandler = async (itemData) => {
		const itemId = await getItemId();
		const { itemName } = itemData;
		const itemQuantity = parseInt(itemData.itemQuantity)
		try {
			const ItemsRef = await addDoc(collection(fireStoreDb, "items"), {
				itemId: itemId,
				itemName: itemName,
				itemQuantity: itemQuantity,
			});
			console.log("Document written with ID: ", ItemsRef.id);
			setFormSuccess(true);
			setTimeout(() => {
				setFormSuccess(false);
			}, 1000);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	const getItemId = async () => {
		const itemIdQuery = query(
			collection(fireStoreDb, "items"),
			orderBy("itemId", "desc"),
			limit(1)
		);
		const querySnapshot = await getDocs(itemIdQuery);

		if (querySnapshot.empty) {
			return 1;
		}
		const highestItemId = querySnapshot.docs[0].data().itemId;

		return highestItemId + 1;
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
					onSubmit={handleSubmit(itemsFormSubmitHandler)}
					className="flex flex-col max-w-md gap-4"
				>
					<div>
						<div className="block mb-2">
							<Label htmlFor="itemName" value="Item Name" />
						</div>
						<TextInput
							{...register("itemName")}
							id="itemName"
							type="text"
							required
						/>
					</div>
					<div>
						<div className="block mb-2">
							<Label htmlFor="itemQuantity" value="Item Quantity" />
						</div>
						<TextInput
							{...register("itemQuantity")}
							id="itemQuantity"
							type="number"
							placeholder="0"
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

export default ItemsForm;
