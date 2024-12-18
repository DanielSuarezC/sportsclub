import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/enviroments/environment';
// import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public form1: FormGroup;
  mostrarFormulario: boolean;
  identificacion: string;
  clave: string;
  // usuario: Usuario;
  // baseUrl = environment.urlAplicacion + 'seguridad/';
  // @BlockUI() blockUI : NgBlockUI;  


  // constructor(private fb: FormBuilder,
  //             private dialog: MatDialog, 
  //             private usuarioService: UsuariosService,
  //             private cookieService: CookieService
  //           ) { }


  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.identificacion = '';
    this.clave = '';
    // this.cookieService.delete(environment.nombreCookieToken);
    this.form1 = this.fb.group({
      identificacion: ['',Validators.compose([Validators.required])],
      clave: ['',Validators.compose([Validators.required])]
    });
    this.form1.get('identificacion')?.setValue('');
    this.form1.get('clave')?.setValue('');
  }

  validar() {
    // this.blockUI.start();
    this.identificacion = this.form1.get('identificacion')?.value;
    this.clave = this.form1.get('clave')?.value;
    if(this.identificacion == 'admin' && this.clave =='admin'){
      window.location.href = environment.urlAplicacion + '#/inicio';
    }else{
      alert('usuario y contraseña incorrecto');
    }
//     this.usuarioService.autenticarUsuario(this.identificacion,CryptoJS.MD5(this.clave).toString(CryptoJS.enc.Hex)).subscribe( value => {
//       console.log(value);
//       if (value.isError === 'N') {
//         this.usuario = value.datos as Usuario;
//         // this.usuarioStateService.setUsuario(this.usuario);
      
//           const fecha = new Date();
//           fecha.setMinutes(fecha.getMinutes() + environment.duracionMinutosCookieToken);
//           this.cookieService.set(environment.nombreCookieToken, this.usuario.token, fecha);
//           this.blockUI.stop();
//           window.location.href = environment.urlAplicacion + '#/inicio';
        
//       } else {
//        // this.blockUI.stop();
//         this.dialog.open(MensajeComponent, {data: {titulo: 'Error',
//         mensaje: 'Error de validación. ' + value.message, textoBoton: 'Aceptar' }});
//       }
//       this.blockUI.stop();
//     }, error => {
//       this.blockUI.stop();
//       this.dialog.open(MensajeComponent, {data: {titulo: 'Error', mensaje: error.message, textoBoton: 'Aceptar' }});
//     });
  }

}
