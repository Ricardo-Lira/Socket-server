import { Router, Request, Response } from "express";

import Server from "../class/server";
import { GraficaData } from './../class/grafica';



export const router = Router();

const grafica = new GraficaData();

router.get('/grafica', (req:Request, res:Response) =>{

    res.json(grafica.getDataGrafics() )
})



router.post('/grafica', (req:Request, res:Response) =>{
    const mes = req.body.mes;
    const valor = Number(req.body.valor);

    grafica.increaseValue(mes, valor);  

    const server = Server.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafics());


    res.json( grafica.getDataGrafics());
})





export default router;