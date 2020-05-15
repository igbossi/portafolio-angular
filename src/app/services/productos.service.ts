import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();
  }

 private cargarProductos() {

  return new Promise( ( resolve, reject ) => {

  this.http.get('https://angular-html-4c51d.firebaseio.com/productos_idx.json')
  .subscribe( (resp: Producto[]) => {
    this.productos = resp;
    this.cargando = false;
    resolve();
 });
});

}

getProducto(id: string){
 return this.http.get(`https://angular-html-4c51d.firebaseio.com/productos/${ id }.json`);
}

  buscarProducto( termino: string ){
  if (this.productos.length === 0){
//cargar productos
   this.cargarProductos().then(  () => {
 //Ejecutar después de tener los productos
 //Aplicar el filtro
    this.filtrarProductos(termino);
});

   }else{
//aplicar el filtro
    this.filtrarProductos(termino);
}
  

  this.productosFiltrado = this.productosFiltrado.filter( producto => {
   return true;

  });

  console.log(this.productosFiltrado);
}



private filtrarProductos(termino: string){

  this.productosFiltrado = [];

  this.productos.forEach(prod => {

  if( prod.categoria.indexOf(termino) >=0 || prod.titulo.indexOf(termino) >= 0  ) {
      this.productosFiltrado.push(prod);
  }
});

}



}