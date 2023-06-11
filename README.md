# SliceIT

## Table of Contents
- [SliceIT](#sliceit)
  - [Table of Contents](#table-of-contents)
  - [Descrizione](#descrizione)
  - [Sviluppato da](#sviluppato-da)
  - [How to run](#how-to-run)
  - [Deploy](#deploy)
  - [Note](#note)
  - [Future works](#future-works)
  - [Known issues](#known-issues)

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

Ricordimao che il progetto non è stato sviluppato nella sua interezza. Per esempio manca la feature di pagare la spesa che era riservata a uno sprint successivo.

## Future works
Nel futuro vogliamo sviluppare queste funzionalità tra cui c'è la gestione delle FAQ, la possibilità di pagare una spesa e infine la possibilità di notificare un debitore del proprio debito. Inoltre ci riserveremo anche di risolvere potenziali nuovi bug e bug noti, migliorare l'interfaccia utente e sviluppare nuove funzionalità.

## Known issues
Siamo a conoscenza che la validation dei campi in certi casi sia buggata e incorretta. Ci siamo voluti dedicare di più allo sviluppo di nuove funzionalità con l'idea di correggere questi 'bug' in futuro. 

Un altro problema noto è che alla creazione di qualsiasi cosa (risorsa o gruppo) oppura alla modifica di questa, sarà necessario riaggiornare la pagina per visualizzare le modifiche effettuate.