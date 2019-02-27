import { Socket } from 'socket.io';
import socketIO from 'socket.io';

import { Usuario } from '../class/usuario';
import { UsuariosLista } from '../class/usuarios-lista';


export const usuariosConectados  = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io:socketIO.Server) =>{
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);

}


export const desconectar = ( cliente: Socket, io:socketIO.Server)=>{

    cliente.on('disconnect', ()=>{
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
        
    });

    

}  


 export const mensaje = ( cliente: Socket, io: socketIO.Server)=>{
    
    cliente.on('mensaje', (payload: {de:string, cuerpo:string})=>{
        
        console.log('mensaje recibido', payload);
        
        io.emit('mensaje-nuevo', payload);
        
    })

 }

    //configurar usuario
    export const configUsuario = ( cliente: Socket, io: socketIO.Server)=>{
    
        cliente.on('configurar-usuario', (payload: { nombre: string}, callback: Function)=>{

            usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
            io.emit('usuarios-activos', usuariosConectados.getLista());
        
            // console.log('configurando usuario', payload.nombre);
            
            // io.emit('mensaje-nuevo', payload);

            callback({
                ok: true,
                mensaje: `Usuario ${payload.nombre}, configurado`
            })
            
        })
        
}

    //Obtener usuario
    export const obtenerUsuarios = ( cliente: Socket, io: socketIO.Server)=>{
    
        cliente.on('obtener-usuarios', ()=>{

            io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    
            
        })
        
}