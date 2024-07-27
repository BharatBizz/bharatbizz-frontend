import {Routes,Route} from 'react-router-dom';
import { AdminLoginForm, AdminRegistrationForm } from './Admin/Admin';
import UnauthorizedPage from './components/Unauthorized';
import { Dashboard, ViewTransactions } from './Admin/Dashboard';
import {  InvestorRegistrationForm,InvestorLoginForm } from './Investor/Auth';
import { Deposit, InvestorDashboard, Package, ViewHistory, Wallet, Withdraw } from './Investor/Dashboard';
import { useSelector } from 'react-redux';
const Routing=()=>{
    const { user, isAuth } = useSelector((state) => state.user)
    const { admin, isAuthe } = useSelector((state) => state.admin)

    console.log(admin)
    const isAdmin = isAuthe && admin?.userType === 'Admin' ;
    console.log(isAdmin)
    const isInvestor=isAuth && user?.userType==='Investor';
    return<>
    <Routes>
        <Route path='/admin/registration' element={<AdminRegistrationForm/>}/>
        <Route path='/admin/login' element={<AdminLoginForm/>}/>
        <Route path='/unauthorized' element={<UnauthorizedPage/>}/>
        <Route path='/dashboard' element={isAdmin?<Dashboard/>:<UnauthorizedPage/>}/>
        <Route path='/' element={<InvestorLoginForm/>}/>
        <Route path='/investor/register' element={isAdmin?<InvestorRegistrationForm/>:<UnauthorizedPage/>}/>
        <Route path='/investor/dashboard' element={isInvestor?<InvestorDashboard/>:<UnauthorizedPage/>}/>
        <Route path='/deposit' element={isInvestor?<Deposit/>:<UnauthorizedPage/>}/>
        <Route path='/view-history' element={isInvestor?<ViewHistory/>:<UnauthorizedPage/>}/>
        <Route path='/view-transactions' element={isAdmin?<ViewTransactions/>:<UnauthorizedPage/>}/>
        <Route path='/wallet' element={isInvestor?<Wallet/>:<UnauthorizedPage/>}/>
        <Route path='/choose-package' element={isInvestor?<Package/>:<UnauthorizedPage/>}/>
        <Route path='/request-withdrawal' element={isInvestor?<Withdraw/>:<UnauthorizedPage/>}/>
        
    </Routes>
    
    </>
}

export default  Routing;