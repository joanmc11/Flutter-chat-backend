const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');


//Mensajes de Sockets  
io.on('connection', (client) => {
    console.log('Cliente conectado');

    const [valido, uid]= comprobarJWT( client.handshake.headers['x-token'] );
    console.log(client.handshake.headers['x-token']);

    //Verificar autenticación
    if(!valido){ return client.disconnect();}
    
    console.log('Cliente autenticado');
    usuarioConectado( uid );

    // Ingresar al usuario a una sala particular
    // sala global, client.id
    client.join(uid);

    //Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async(payload)=>{
      //TODO: grabar mensaje
      await grabarMensaje( payload );

      io.to(payload.para).emit('mensaje-personal', payload);
    })

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
        usuarioDesconectado( uid );
     });

   //   client.on('mensaje', ( payload )=>{
   //      console.log('Mensaje!!', payload);

   //      io.emit( 'mensaje', {admin: 'Nuevo mensaje' });

       

   //   });

  });