import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { fireStoreDb } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const CustomerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const customerFormSubmitHandler = async (customerData) => {
    const customerId = await getCustomerId();
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

  const getCustomerId = async () => {
    const customerIdQuery = query(
      collection(fireStoreDb, "customers"),
      orderBy("customerId", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(customerIdQuery);
    
    if (querySnapshot.empty) {
      return 1;
    }
    const highestCustomerId = querySnapshot.docs[0].data().customerId;
    
    return highestCustomerId + 1;
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <form
        onSubmit={handleSubmit(customerFormSubmitHandler)}
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

export default CustomerForm;

("use client");
