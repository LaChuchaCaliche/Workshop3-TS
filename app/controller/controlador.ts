import { Request, Response } from 'express';
import { MedicineModel } from '../model/medicineModel';
import { Medicine } from '../interfaces/interfaces';

export class MedicineController {
  public static async getMedicines(_: Request, res: Response): Promise<void> {
    try {

      const medicines = await MedicineModel.getMedicines();
      res.status(200).json({
        message: 'fetched successfully', data:medicines});

    } catch (error) {
      console.error(error);
      res.status(500).json({
         message: 'Error fetching medicines'});
    }
  }

  public static async createMedicine(req: Request, res: Response): Promise<void> {
    try {

      const { name, quantity, expireDate, price } = req.body;

      const newMedicine: Omit<Medicine, 'id'> =
      { name, quantity, expireDate, price };

      const createdMedicine = await MedicineModel.createMedicine(newMedicine);

      res.status(201).json({ 
        message: 'Medicine created successfully', data: createdMedicine });

    } catch (error) {
      console.error(error);
      res.status(500).json({
         message: 'Error creating medicine' });
    }
  }

  public  static async deleteMedicine(req: Request, res: Response):Promise<void> {
    try {

      const { id } = req.params;

      const medicine = { id: parseInt(id) } as Medicine;
      const medicineDelete = await MedicineModel.deleteMedicine(medicine);

      res.status(200).json({
         message: 'Medicine deleted successfully', data:medicineDelete});

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting medicine' });
    }
  }

  public static async updateMedicine(req: Request, res: Response): Promise<void> {
    try {

      const { id } = req.params; 
      const { name, quantity, expireDate, price } = req.body; 
 
      if (!id || isNaN(parseInt(id))) {
        res.status(400).json({ message: 'ID inválido' });
        return;
      }

      const updatedMedicine: Medicine = {
        id: parseInt(id), 
        name,
        quantity,
        expireDate,
        price
      };

      const updatedData = await MedicineModel.updateMedicine(updatedMedicine);

      res.status(200).json({ 
        message: 'Medicine updated successfully', data: updatedData });
        
    } catch (error) {
      console.error('Error al actualizar el medicamento:', error);
      res.status(500).json({ message: 'Error updating medicine' });
    }
  }
  
}