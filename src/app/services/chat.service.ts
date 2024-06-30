import { Injectable } from '@angular/core';
import { Mensaje } from '../interfaces/mensaje';
import { Firestore, collection, addDoc, collectionData, doc, getDoc, getDocs, query, where, onSnapshot } from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: Firestore) { }
  public subChat!: any;

  agregarChat(nuevosMensaje: Mensaje, chat: string): Promise<any> {
    const col = collection(this.firestore, chat);
    return addDoc(col, nuevosMensaje);
  }





  obtenerChat(mensajes: Mensaje[], chat: string): Promise<boolean> {
    const q = query(collection(this.firestore, chat));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          mensajes.push({ "emisor": change.doc.data()['emisor'], "fecha": change.doc.data()['fecha'], "texto": change.doc.data()['texto'] });
          mensajes.sort(this.compararPorFecha);
        }
      });
    });

    this.subChat = unsubscribe;
    return new Promise<boolean>((resolve, reject) => { resolve(true) })
  }

  compararPorFecha(a: Mensaje, b: Mensaje): number {
    const fechaA = new Date(a.fecha.split(' - ')[1] + ' ' + a.fecha.split(' - ')[0]);
    const fechaB = new Date(b.fecha.split(' - ')[1] + ' ' + b.fecha.split(' - ')[0]);
    let cmp = 0;
    if (fechaA < fechaB) { cmp = -1; }
    else if (fechaA > fechaB) { cmp = 1; }
    return cmp;
  }

}
