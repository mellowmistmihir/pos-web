import { createBrowserRouter,  } from "react-router";
import Login from "../page/Authentication/Login";
import Ragister from "../page/Authentication/Ragister";
import App from "../App";
import Home from "../page/Home/Home";
import AddProduct from "../page/AddProduct/AddProduct";
import AddCategory from "../page/category/AddCategory";
import AllProducts from "../page/AllProducts/AllProducts";
import Pos from "../page/pos/Pos";
import CustomerList from "../page/customerList/CustomerList";
import SingleCustomerProductDetails from "../page/customerList/SingleCustomerProductDetails";
import PeopleList from "../page/customerList/PeopleList";
import MyProfile from "../page/MyProfile/MyProfile";




 const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path:"/dashboard",
        element:<Home></Home>
      },
      {
        path:"/",
        element:<Home></Home>
      },
      {
           path:"addcategory",
           element:<AddCategory></AddCategory>
      },
      {
        path:"addproduct",
        element:<AddProduct></AddProduct>
      },
      {
        path:"allproduct",
        element:<AllProducts></AllProducts>
      },
      {
        path:"customerList",
        element:<CustomerList></CustomerList>
      },
      {
        path:"/sell-details/:id",
        element:<SingleCustomerProductDetails></SingleCustomerProductDetails>
      },
     {
       path:"/people",
      element:<PeopleList></PeopleList>
     },
     {
      path:"/myprofile",
      element:<MyProfile></MyProfile>
     }
    ]
  },
  {
        path: "/pos",
        element:<Pos></Pos>
  },
  {
      
        path: "/login",
        element: <Login />,
      
  },
  {
           path:"/ragister",
           element:<Ragister></Ragister>
  }
]);

export default routes