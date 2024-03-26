import { Alert } from "flowbite-react";
import { useState } from "react";

const Alerts = ({formSuccessRecieved}) => {
  const [formSuccess, setFormSuccess] = useState({formSuccessRecieved});

  setTimeout(() => {
    setFormSuccess(false);
  }, 1000);

  return (
    <>
      {formSuccess && (
        <Alert color="success">
          <span className="font-medium">Success!</span> Form Submitted
          Successfuly
        </Alert>
      )}
    </>
  );
};

export default Alerts;
