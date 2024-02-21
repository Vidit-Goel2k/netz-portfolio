import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Flowbite } from 'flowbite-react'

import CustomerForm from './components/CustomerForm.jsx'
import LinksForm from './components/LinksForm.jsx'
import Body from './components/Body';

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
