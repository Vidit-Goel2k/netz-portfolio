import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Flowbite } from "flowbite-react";

import Body from "./components/Body";
import CustomerForm from "./components/customers/CustomerForm";
import LinksForm from "./components/links/LinksForm";
import LinksList from "./components/links/linksList";
import TeamsForm from "./components/teams/TeamsForm";
import EmployeeForm from "./components/teams/teamMember/EmployeeForm";
import ItemsForm from "./components/items/ItemsForm";
import CustomersList from "./components/customers/CustomersList";
import ItemsList from "./components/items/ItemsList";
import TeamsList from "./components/teams/TeamsList";
import EmployeesList from "./components/teams/teamMember/EmployeesList";
import CustomerEditForm from "./components/customers/editCustomer/CustomerEditForm";
import getCustomer from "./components/customers/editCustomer/getCustomer";
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Body />,
			},
			{
				path: "/addCustomer",
				element: <CustomerForm />,
			},
			{
				path: "/customersList/editCustomer/:customerId",
				element: <CustomerEditForm />,
        loader: async ({ params }) => {
          const customerIdInt = parseInt(params.customerId)
          return getCustomer(customerIdInt)
        }
			},
			{
				path: "/customersList",
				element: <CustomersList />,
			},
			{
				path: "/addLink",
				element: <LinksForm />,
			},
			{
				path: "/linksList",
				element: <LinksList />,
			},
			{
				path: "/addTeam",
				element: <TeamsForm />,
			},
			{
				path: "/teamsList",
				element: <TeamsList />,
			},
			{
				path: "/addEmployee",
				element: <EmployeeForm />,
			},
			{
				path: "/employeesList",
				element: <EmployeesList />,
			},
			{
				path: "/addItem",
				element: <ItemsForm />,
			},
			{
				path: "/itemsList",
				element: <ItemsList />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Flowbite>
			<RouterProvider router={router} />
		</Flowbite>
	</React.StrictMode>
);
