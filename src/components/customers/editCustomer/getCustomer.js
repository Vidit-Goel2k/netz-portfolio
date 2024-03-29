import { collection, getDocs, query, where } from "firebase/firestore";
import { fireStoreDb } from "../../../firebase/firebaseConfig";

const getCustomer = async (customerId) => {
    const customerQuery = query(
        collection(fireStoreDb, "customers"),
        where("customerId", "==", customerId)
    );
    const querySnapshot = await getDocs(customerQuery);

    const customerRecieved = querySnapshot.docs[0];
    return customerRecieved;
};

export default getCustomer