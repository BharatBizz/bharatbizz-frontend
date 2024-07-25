import {Routes,Route} from 'react-router-dom';
import { AdminLoginForm, AdminRegistrationForm } from './Admin/Admin';
import UnauthorizedPage from './components/Unauthorized';
import { Dashboard } from './Admin/Dashboard';
import {  InvestorRegistrationForm } from './Investor/Auth';
import { useSelector } from 'react-redux';
const Routing=()=>{
    const { user, isAuth } = useSelector((state) => state.user)
    const isAdmin = isAuth && user?.userType === 'Admin' ;
    return<>
    <Routes>
        <Route path='/admin/registration' element={<AdminRegistrationForm/>}/>
        <Route path='/admin/login' element={<AdminLoginForm/>}/>
        <Route path='/unauthorized' element={<UnauthorizedPage/>}/>
        <Route path='/dashboard' element={isAdmin?<Dashboard/>:<UnauthorizedPage/>}/>
        {/* <Route path='/investor/login' element={<InvestorLoginForm/>}/> */}
        <Route path='/investor/register' element={isAdmin?<InvestorRegistrationForm/>:<UnauthorizedPage/>}/>
    </Routes>
    
    </>
}

export default  Routing;