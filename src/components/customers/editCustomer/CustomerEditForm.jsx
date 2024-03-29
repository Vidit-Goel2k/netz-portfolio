import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { updateDoc } from "firebase/firestore";
import { useLoaderData } from "react-router-dom";

const CustomerEditForm = () => {
    const data = useLoaderData()
	const { customerName, customerContactName } = data.data();
    const customerDocRef = data.ref
    
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm({
		defaultValues: {
			editedCustomerName: customerName,
			editedCustomerContactName: customerContactName,
		},
	});

	const customerEditFormSubmitHandler = async (customerData) => {
		const { editedCustomerName, editedCustomerContactName } = customerData;
		try {
			// Update the document with the new data
			await updateDoc(customerDocRef, {
				customerName: editedCustomerName,
				customerContactName: editedCustomerContactName,
			});
			console.log("Document successfully updated!");
		} catch (e) {
			console.error("Error updating document: ", e);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen ">
			<form
				onSubmit={handleSubmit(customerEditFormSubmitHandler)}
				className="flex flex-col max-w-md gap-4"
			>
				<div>
					<div className="block mb-2">
						<Label htmlFor="customerName" value="Customer" />
					</div>
					<TextInput
						{...register("editedCustomerName")}
						id="customerName"
						type="text"
						placeholder="Sify"
						required
					/>
				</div>
				<div>
					<div className="block mb-2">
						<Label htmlFor="customerContactName" value="Contact Name" />
					</div>
					<TextInput
						{...register("editedCustomerContactName")}
						id="customerContactName"
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
	);
};

export default CustomerEditForm;
