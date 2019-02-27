import { Router, Request, Response } from "express";

import Server from "../class/server";



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