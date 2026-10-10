import { Routes } from '@angular/router';
import { Sigup } from './Pages/Auth/Sigup/sigup/sigup';
import { Sigin } from './Pages/Auth/Sigin/sigin/sigin';
import { ResetPassword } from './Pages/Auth/ResetPassword/reset-password/reset-password';
import { ChangePassword } from './Pages/Auth/ChangePassword/change-password/change-password';
import { Home } from './Pages/User/Home/home/home';
import { authGruadGuard } from './Gruad/Auth/auth-gruad-guard';
import { Dashboard as AdminDashboard } from './Pages/Admin/AdminDashboard/dashboard/dashboard';
import { adminGuard } from './Gruad/Admin/admin-guard';
import { baberGuard } from './Gruad/Baber/baber-guard';
import { userGuard } from './Gruad/User/user-guard';
import { AdminUserMangment } from './Pages/Admin/AdminUserMangement/admin-user-mangment/admin-user-mangment';
import { AdminEmploymangment } from './Pages/Admin/AdminEmploymangment/admin-employmangment/admin-employmangment';
import { BarberDashboard } from './Pages/Barber/Dashboard/barber-dashboard/barber-dashboard';
import { ManageService } from './Pages/Admin/ManageService/manage-service/manage-service';
import { ManageService as BarberService } from './Pages/Barber/ManageService/manage-service/manage-service';
import { Reports } from './Pages/Admin/Report/reports/reports';
import { ManualEntry } from './Pages/Barber/ManualEntry/manual-entry/manual-entry';
import { ChangeUserName } from './Pages/Auth/ChangeUserName/change-user-name/change-user-name';
import { superGuardGuard } from './Gruad/SuperGuard/super-guard-guard';
import { NotFound } from './Pages/NotFound/not-found/not-found';

export const routes: Routes = [

{ path: '', component: Home , canActivate:[userGuard] },
{path:'sigin', component: Sigin , canActivate:[authGruadGuard] },
{path:'resetpassword', component: ResetPassword , canActivate:[authGruadGuard] },
{path:'changepassword', component: ChangePassword , canActivate:[superGuardGuard] },
{path:'sigup', component: Sigup , canActivate:[authGruadGuard] },
{path:'admin/dashboard', component: AdminDashboard , canActivate:[adminGuard] },
{path:'barber/dashboard', component: BarberDashboard, canActivate:[baberGuard] },
{path:'admin/UserManagment' , component:AdminUserMangment , canActivate:[adminGuard]  },
{path:'admin/EmployManagment' , component:AdminEmploymangment , canActivate:[adminGuard]  },
{path:'admin/ManageService' , component:ManageService , canActivate:[adminGuard] },
{path:'barber/Service' , component:BarberService , canActivate:[baberGuard]},
{path:'admin/Report' , component:Reports , canActivate:[adminGuard]},
{path:'barber/ManualEntry' , component:ManualEntry , canActivate:[baberGuard]},
{path:'ChangeUserName', component:ChangeUserName , canActivate:[superGuardGuard] },

// 404 — wrong / unknown routes
{ path: 'notfound', component: NotFound },
{ path: '**', redirectTo: 'notfound' }

];
