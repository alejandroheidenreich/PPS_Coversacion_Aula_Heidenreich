import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../interfaces/mensaje';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(private chatService: ChatService, private authService: AuthService, private router: Router) { }

  usuarioLogeado: any;
  public nuevoMensaje: Mensaje = {
    emisor: '',
    fecha: '',
    texto: '',
  };
  public mensajes: Mensaje[] = [];
  public sub!: any;

  async ngOnInit() {
    this.authService.getUserLogged().subscribe(user => {
      this.usuarioLogeado = user;
    });
    this.chatService.obtenerChat(this.mensajes, "chat-4b")
      .then(res => {
        this.scrollToTheLastElementByClassName();
      })
  }

  ngOnDestroy(): void {
    //this.chatService.subChat.unsubscribe();
    // this.sub.unsubscribe(); no anda
  }


  async enviarMensaje() {
    if (this.nuevoMensaje.texto != '') {
      this.nuevoMensaje.emisor = this.usuarioLogeado.email;
      let mensaje = {
        emisor: this.usuarioLogeado.email,
        texto: this.nuevoMensaje.texto,
        fecha: new Date().toTimeString() + " - " + new Date().toDateString()
      };
      try {
        await this.chatService.agregarChat(mensaje, "chat-4b").then((chat) => {
          this.nuevoMensaje.texto = '';
          setTimeout(() => {
            this.scrollToTheLastElementByClassName();
          }, 20);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  convertirAFechaString(cadenaFecha: string) {
    const partes = cadenaFecha.split(" - ");
    const fechaParte = partes[1];
    const fecha = new Date(fechaParte);

    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11 en JavaScript
    const año = fecha.getFullYear().toString().slice(-2); // Obtenemos los últimos dos dígitos del año

    const fechaFormateada = `${dia}/${mes}/${año}`;
    return fechaFormateada;
  }

  scrollToTheLastElementByClassName() {

    let element = document.getElementsByClassName('msj');
    if (element.length > 0) {

      let lastElement: any = element[element.length - 1];
      let toppos = lastElement.offsetTop;

      const contMsg = document.getElementById('contendedorMensajes');
      console.log(contMsg!.scrollTop);

      contMsg!.scrollTop = toppos;
    }
  }

  back() {
    this.router.navigate(['tabs/tab1']);
  }

}
