import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {PerfilUsuarioComponent} from './components/perfil-usuario/perfil-usuario.component';
import { UserRequestsComponent } from './components/user-requests/user-requests.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:"createUser", component: CreateUserComponent},
  {path:'editUser',component:EditUserComponent},
  {path:'login',component:LoginComponent},
  {path:'cart',component:ShoppingCartComponent},
  {path:'perfil',component:PerfilUsuarioComponent},
  {path:'requests',component:UserRequestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
