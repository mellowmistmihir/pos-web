import { createBrowserRouter,  } from "react-router";
import Login from "../page/Authentication/Login";
import Ragister from "../page/Authentication/Ragister";
import App from "../App";
import Home from "../page/Home/Home";
import AddProduct from "../page/AddProduct/AddProduct";
import AddCategory from "../page/category/AddCategory";




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
      }
    ]
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