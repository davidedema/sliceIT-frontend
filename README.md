# SliceIT

## Table of Contents
- [SliceIT](#sliceit)
  - [Table of Contents](#table-of-contents)
  - [Descrizione](#descrizione)
  - [Sviluppato da](#sviluppato-da)
  - [How to run](#how-to-run)
  - [Deploy](#deploy)
  - [Note](#note)

## Descrizione 
SliceIT è un servizio web per la gestione semplificata di spese condivise sviluppato per il corso Ingegneria del software all'università di Trento. L'obiettivo del software è di semplificare la gestione delle spese condivise. Questo ti permetterà di creare un gruppo di spesa con i tuoi amici e condividere le spese con loro. La visualizzazione di debiti e crediti sarà immediata. Un grafico di resoconto delle spese aiuterà l'utente nel capire le categorie di spese fatte. Questa repository contiene il frontend, se interessati al backend la repository è https://github.com/davidedema/sliceIT-backend

## Sviluppato da
- Davide De Martini @davidedema
- Francesco Poinelli @Vitho306
- Riccardo Stiz @Rikistiz

## How to run
1) Per provare il progetto assicurarsi di avere nodejs (> v. 20.0.2) e npm installati. Per ubuntu:
``` BASH
sudo apt install nodejs
sudo apt install npm
```
2) Clonare il progetto nel posto desiderato
```BASH
git clone https://github.com/davidedema/sliceIT-frontend.git
```
3) Ora aggiornare le dipendenze
```BASH
cd sliceIT-frontend
npm install
```
4) Fatto questo passo basterà runnare il server e il servizio sarà in funzione. L'applicazione sarà accessibile all'indirizzo http://localhost:300
```BASH
npm run dev
```
## Deploy
Il servizio è anche raggiungibile all'indirizzo https://www.sliceit.onrender.com

## Note
Come detto all'inizio questo progetto contiene solo il frontend, per avere l'esperienza completa bisognerà installare anche https://github.com/davidedema/sliceIT-backend. Seguire il README per l'installazione
