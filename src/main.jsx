import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Flowbite } from 'flowbite-react'

import Body from './components/Body';
import CustomerForm from './components/customers/CustomerForm'
import LinksForm from './components/links/LinksForm'
import LinkList from './components/links/linkList'
import TeamsForm from './components/teams/TeamsForm'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Body />
      },
      {
        path: '/customer',
        element: <CustomerForm />
      },
      {
        path: '/links',
        element: <LinksForm />
      },
      {
        path: '/linkList',
        element: <LinkList />
      },
      {
        path: '/teamsForm',
        element: <TeamsForm />
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Flowbite>
      <RouterProvider router={router} />
    </Flowbite>
  </React.StrictMode>,
)
