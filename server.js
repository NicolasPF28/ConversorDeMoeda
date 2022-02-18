const express = require ('express');
const app = express ();

const data = new Date ();
const horas = data.getHours ();
const minutos = data.getMinutes ();
const segundos = data.getSeconds ();


/*const time = `${horas}:${minutos}:${segundos}`;

app.listen (3000, () => console.log (`> ${time} - Server is running`));

app.get ('/homePage', (req, res) => {
    res.sendFile (__dirname + '/menu/index.html');
    app.use (express.static (__filename));
})*/