import { Component,OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { FormGroup,Validators,FormControl } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-agregarproducto',
  templateUrl: './agregarproducto.component.html',
  styleUrls: ['./agregarproducto.component.css']
})
export class AgregarproductoComponent implements OnInit {
  public frmProducto!:FormGroup;
  public mensaje:string='';
  public rutaImagen:string='';
  listaCategorias:any;

  constructor(private location:Location,
    private _productoService:ProductoService,
    private _categoriaService:CategoriaService){
    }
  
  listarCategorias(){
    this._categoriaService.listarCategorias().subscribe((result) =>{
      this.listaCategorias=result;
    });
  }
  onFileSelected(event:any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.rutaImagen = URL.createObjectURL(file);
      this.frmProducto.get('fileFoto')?.setValue(file);
    }
  }
  agregarProducto(frmProductoValue:any){
     const producto = new FormData();
    if(this.frmProducto.valid){
      var codigo = frmProductoValue.txtCodigo;
      var nombre = frmProductoValue.txtNombre;
      var precio = frmProductoValue.txtPrecio;
      var categoria = frmProductoValue.cbCategoria;
      var foto = frmProductoValue.fileFoto;
      producto.append('proCodigo',codigo);
      producto.append('proNombre',nombre);
      producto.append('proPrecio',precio);
      producto.append('proCategoria',categoria);
      producto.append('profoto',this.frmProducto.get('fileFoto')?.value);
    }
    this._productoService.agregarProducto(producto).subscribe(respuesta=>{
      console.log(respuesta)
      this.mensaje="Producto agregado correctamente";
      this.location.back();
    },error=>{
      console.log(error);
      this.mensaje = "Problemas al agregar producto";
    });
  }

  ngOnInit(): void {
      this.listarCategorias();
      this.frmProducto = new FormGroup({
        txtCodigo:new FormControl('',[Validators.required]),
        txtNombre:new FormControl('',[Validators.required,Validators.maxLength(60)]),
        txtPrecio:new FormControl('',[Validators.required]),
        cbCategoria:new FormControl('',[Validators.required]),
        fileFoto:new FormControl('',)
      });
  }
}
