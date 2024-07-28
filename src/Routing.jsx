import {Routes,Route} from 'react-router-dom';
import { AdminLoginForm, AdminRegistrationForm } from './Admin/Admin';
import UnauthorizedPage from './components/Unauthorized';
import { Dashboard, ViewTransactions, WithdrawalRequest } from './Admin/Dashboard';
import {  InvestorRegistrationForm,InvestorLoginForm, ForgetPassword, ResetPassword, Profile } from './Investor/Auth';
import { ActivePackages, Deposit, InvestorDashboard, Package, ViewHistory, Wallet, Withdraw, YourTeam } from './Investor/Dashboard';
import { useSelector } from 'react-redux';
import { NotFound } from './components/NotFound';
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
        <Route path='/active-packages' element={isInvestor?<ActivePackages/>:<UnauthorizedPage/>}/>
        <Route path='/choose-package' element={isInvestor?<Package/>:<UnauthorizedPage/>}/>
        <Route path='/request-withdrawal' element={isInvestor?<Withdraw/>:<UnauthorizedPage/>}/>
        <Route path='/withdrawal-request' element={isAdmin?<WithdrawalRequest/>:<UnauthorizedPage/>}/>
        <Route path='/team' element={isInvestor?<YourTeam/>:<UnauthorizedPage/>}/>
        <Route path='/forget-link/:id' element={isInvestor?<ResetPassword/>:<UnauthorizedPage/>}/>
        <Route path='/forget-password' element={isInvestor?<ForgetPassword/>:<UnauthorizedPage/>}/>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/profile' element={isInvestor?<Profile/>:<UnauthorizedPage/>}/>
    </Routes>
    
    </>
}

export default  Routing;