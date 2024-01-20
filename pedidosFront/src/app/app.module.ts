import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import { ProductService} from './services/productService';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserService } from './services/userService';
import { FormsModule } from '@angular/forms';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AuthService } from './services/authService';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { CorsInterceptor } from './services/http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    NavBarComponent,
    HomeComponent,
    EditUserComponent,
    LoginComponent,
    ShoppingCartComponent,
    PerfilUsuarioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true },
    ProductService, UserService, AuthService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA]
})
export class AppModule { }
