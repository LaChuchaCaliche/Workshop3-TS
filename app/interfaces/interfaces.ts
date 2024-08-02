// El sistema debe permitir agregar nuevos medicamentos con las propiedades id, nombre, cantidad, fechaDeCaducidad y precio.
export interface Medicine{
    id?:number;
    name:string;
    quantity:number;
    expireDate:Date;
    price:number;
};