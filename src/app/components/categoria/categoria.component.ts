import { Component,OnInit } from '@angular/core';
import { Categoria } from 'src/app/modelos/categoria.model';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { FormGroup,Validators,FormControl } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  public frmCategoria!:FormGroup;
  public categoria!:Categoria;
  public mensaje:string = '';
  public listaCategorias:any;

  constructor(private location:Location,
    private categoriaService:CategoriaService){
  }

  obtenerCategorias(){
    this.categoriaService.listarCategorias().subscribe(data=>{
      console.log(data)
      this.listaCategorias=data;
    },error=>{
      console.log(error);
    })
  }

  public agregarCategoria = (frmCategoriaValue: {txtNombre:string;})=>{
    //validar formulario
    if(this.frmCategoria.valid){
      this.categoria = new Categoria(frmCategoriaValue.txtNombre.valueOf());
    }
    this.categoriaService.agregarCategoria(this.categoria).subscribe(respuesta=>{
      console.log(respuesta);
      this.mensaje="Categoria agregada correctamente";
      this.frmCategoria.reset();
    },error=>{
      console.log(error);
      this.mensaje="Problemas al agregar categoria";
    });
  }

  ngOnInit():void{
    this.frmCategoria = new FormGroup({
      txtNombre: new FormControl('',
      [Validators.required,Validators.maxLength(60)]),
    });
  }
}
