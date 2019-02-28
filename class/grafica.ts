

export class GraficaData{

    private meses:string [] = ['enero', 'febrero', 'marzo', 'abril'];
    private valores : number[] = [0,0,0,0];


    constructor(){

    }

    getDataGrafics(){
        return [
            {data: this.valores, label: 'Ventas'}
        ];
    }

    increaseValue(mes:string, valor:number){
        mes = mes.toLocaleLowerCase().trim();
        
        for (let i in this.meses) {
                if (this.meses[i] === mes) {
                    this.valores[i] += valor;
                }            
        }

        return this.getDataGrafics();
    }

}