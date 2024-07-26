import {Routes,Route} from 'react-router-dom';
import { AdminLoginForm, AdminRegistrationForm } from './Admin/Admin';
import UnauthorizedPage from './components/Unauthorized';
import { Dashboard } from './Admin/Dashboard';
import {  InvestorRegistrationForm,InvestorLoginForm } from './Investor/Auth';
import { Deposit, InvestorDashboard, ViewHistory } from './Investor/Dashboard';
import { useSelector } from 'react-redux';
const Routing=()=>{
    const { user, isAuth } = useSelector((state) => state.user)
    const isAdmin = isAuth && user?.userType === 'Admin' ;
    const isInvestor=isAuth && user?.userType==='Investor';
    return<>
    <Routes>
        <Route path='/admin/registration' element={<AdminRegistrationForm/>}/>
        <Route path='/admin/login' element={<AdminLoginForm/>}/>
        <Route path='/unauthorized' element={<UnauthorizedPage/>}/>
        <Route path='/dashboard' element={isAdmin?<Dashboard/>:<UnauthorizedPage/>}/>
        <Route path='/investor/login' element={<InvestorLoginForm/>}/>
        <Route path='/investor/register' element={isAdmin?<InvestorRegistrationForm/>:<UnauthorizedPage/>}/>
        <Route path='/investor/dashboard' element={isInvestor?<InvestorDashboard/>:<UnauthorizedPage/>}/>
        <Route path='/deposit' element={isInvestor?<Deposit/>:<UnauthorizedPage/>}/>
        <Route path='/view-history' element={isInvestor?<ViewHistory/>:<UnauthorizedPage/>}/>
    </Routes>
    
    </>
}

export default  Routing;