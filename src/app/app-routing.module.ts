import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductoComponent } from './components/producto/producto.component';
import { AgregarproductoComponent } from './components/agregarproducto/agregarproducto.component';
import { EditarproductoComponent } from './components/editarproducto/editarproducto.component';
const routes: Routes = [
  {path: 'categoria', component:CategoriaComponent},
  {path: 'inicio', component:InicioComponent},
  {path: 'producto', component:ProductoComponent},
  {path: 'agregarproducto', component:AgregarproductoComponent},
  {path: 'editarProducto/:codigo', component: EditarproductoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
