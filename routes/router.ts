import { Router, Request, Response } from "express";

import Server from "../class/server";
import { usuariosConectados } from '../sockets/sockets';



export const router = Router();




router.get('/mensajes', (req:Request, res:Response) =>{
    res.json({
        ok: true,
        mensaje: 'Todo va bien'
    })
})

router.post('/mensajes', (req:Request, res:Response) =>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload)


    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de
    })
})

router.post('/mensajes/:id', (req:Request, res:Response) =>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    }


    const server = Server.instance;
    server.io.in(id).emit('mensaje-private', payload);


    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de,
        id: id
    })

})

//servicio para obtener todos los Id´s de los usuarios


router.get('/usuarios', (req:Request, res:Response) =>{
    const server = Server.instance;
    server.io.clients((err:any, clientes:string[])=>{
        
        if (err) {
           return res.json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            clientes
        });
    })
})

//Obtener usuarios y sus datos

router.get('/usuarios/detalles', (req:Request, res:Response) =>{

    res.json({
        ok:true,
        clientes:usuariosConectados.getLista()
    });
    
});


export default router;