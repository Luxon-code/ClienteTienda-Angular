import { Component,OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  listaProductos:any;
  listaCategorias:any;
  display='none';
  codigoProducto:any;
  url:any;

  constructor(private productoService:ProductoService,
    private categoriaService:CategoriaService,
    private router:Router){
      this.url = "http://127.0.0.1:8000/media/fotos"
    }
  obtenerProductos(){
    this.productoService.getProductos().subscribe((result)=>{
      this.listaProductos=result;
    })
  }
  listarCategorias(){
    this.categoriaService.listarCategorias().subscribe((result)=>{
      this.listaCategorias=result;
    })
  }
  cerrarModal(){
    this.display='none';
  }
  abrirModalEliminar(codigo:number){
    this.display='block';
    this.codigoProducto=codigo;
  }

  eliminarProducto(){
    this.productoService.eliminarProducto(this.codigoProducto).subscribe((result)=>{
      location.reload()
    },error=>{
      console.log(error);
    });
    this.cerrarModal();
  }
  ngOnInit():void {
    this.listarCategorias();
    this.obtenerProductos();
  }
}
