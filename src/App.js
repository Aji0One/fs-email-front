import Signin from "./Components/registerModule/signin";
import Signup from "./Components/registerModule/signup";
import ProductComponent from "./Components/Product/product";
import Forgot from "./Components/registerModule/forgotpassword";
import Header from "./Components/Header/header";
import DashBord from "./Components/Dashboard/dash";
import AfterFP from "./Components/registerModule/afterfp";
import { BrowserRouter,Routes,Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<DashBord/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin/forgotpassword' element={<Forgot/>}/>
        <Route path='/afterfp' element={<AfterFP/>}/>
        <Route path='/product' element={<ProductComponent/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
