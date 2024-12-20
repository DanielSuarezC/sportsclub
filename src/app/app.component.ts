import { Component, OnInit } from '@angular/core';
import { environment } from 'src/enviroments/environment';
// import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit{
  title = 'sportsclub';

  menuselect = '';

  baseUrl = environment.urlAplicacion;
  baseUrl2 = 'https://sportsclub.pages.dev/';
  // constructor(private cookieService: CookieService) {

  // }

  ngOnInit(): void {
    console.log(window.location.toString());
    console.debug(window.location.toString());
    if (window.location.toString() === this.baseUrl2 + '#/login' ||
        window.location.toString() === this.baseUrl2 + '/login') {
          console.log('entro al if 1');
    } else if (window.location.toString() === this.baseUrl2 + '#/' ||
      window.location.toString() === this.baseUrl2) {
      // window.location.href = this.baseUrl + '#/login';
      console.log('entro al if 2');
      window.location.href = this.baseUrl2 + '#/login';
    } else {
      // const token = this.cookieService.get(environment.nombreCookieToken);
      // if (token === null || !token || token === undefined || token === '') {
      //   console.log('entro al if 3');
      //   window.location.href = this.baseUrl + '/login';
      // } else {
      //   console.log('here else')
      //   // this.usuarioService.consultarUsuarioValidado().subscribe( value => {
      //   //   if (value.isError === 'N') {
      //   //     const usuario = value.datos as Usuario;
      //   //     if (usuario === null || usuario.id === 0) {
      //   //       window.location.href = this.baseUrl + '#/login';
      //   //     }
      //   //   } else {
      //   //     window.location.href = this.baseUrl + '#/login';
      //   //   }
      //   // }, error => {
      //   //   window.location.href = this.baseUrl + '#/login';
      //   // });
      // }
    }
  }
}
