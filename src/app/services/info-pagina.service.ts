import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: infoPagina = { };
  cargada = false;

  equipo: any[] = [];

  constructor( private http: HttpClient ) {

    //console.log('Servicio de info página cargada');
     this.cargarInfo();
     this.cargarEquipo();
    
   }

   private cargarInfo(){
   //LEER EL ARCHIVO JSON

   this.http.get('assets/data/data-pagina.json')
   .subscribe (  (resp: infoPagina) => {

     this.cargada = true;
     this.info = resp;
   });
   }
   private cargarEquipo(){

    this.http.get('https://angular-html-4c51d.firebaseio.com/equipo.json')
    .subscribe (  (resp:any) => {
 
      
      this.equipo = resp;
      
    });

   }
}
