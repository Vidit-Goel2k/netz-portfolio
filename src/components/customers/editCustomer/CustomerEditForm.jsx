import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { fireStoreDb } from "../../../firebase/firebaseConfig";
import {
	collection,
	addDoc,
} from "firebase/firestore";
import { useLoaderData, useParams } from "react-router-dom";

const CustomerEditForm = () => {
    const params = useParams();
    const customerId = parseInt(params.customerId)
    const customer = useLoaderData()
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm({
        defaultValues:{
            customerId:customerId,
            customerName: customer.customerName,
            customerContactName: customer.customerContactName
        },
        // defaultValues : {...customer},
        // defaultValues:{
        //     // customerId:1,
        //     customerName: "hello",
        //     customerContactName: "world"
        // }
    });

	const customerEditFormSubmitHandler = async (customerData) => {
		const { customerName, customerContactName } = customerData;
		try {
			const CustomerRef = await addDoc(collection(fireStoreDb, "customers"), {
				customerId: customerId,
				customerName: customerName,
				customerContactName: customerContactName,
			});
			console.log("Document written with ID: ", CustomerRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
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
						{...register("customerName")}
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
						{...register("customerContactName")}
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

