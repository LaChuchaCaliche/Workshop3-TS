import { Medicine } from "../interfaces/interfaces"
import { pool } from "../config/db";

export class MedicineModel {
  public static async getMedicines(): Promise<Medicine[]> {
    const query = "SELECT * FROM medicines";
    try {
      const [result] = await pool.query(query);
      return result as Medicine[];
    } catch (error) {
      console.error("Error fetching medicines:", error);
      throw new Error("Unable to get medicines");
    }
  }

  public static async createMedicine(medicine: Medicine): Promise<Medicine> {
    try {
      const [result] = await pool.query(
        `INSERT INTO medicines (name, quantity, expireDate, price) 
            VALUES (?, ?, ?, ?)`,
        [
          medicine.name,
          medicine.quantity,
          medicine.expireDate,
          medicine.price,
        ]
      );

      const insertId = (result as any).insertId;

      // devuelve medicine con el id de la base de datos

      return {
        ...medicine,
        id: insertId,
      };

    } catch (error) {
      console.error("Error creating the medicine:", error);
      throw new Error("Unable to create the medicine");
    }
  }

  public static async deleteMedicine(medicine: Medicine): Promise<void> {
    try {
      if (!medicine.id) {
        throw new Error("Medicine ID not provided");
      }

      await pool.query("DELETE FROM medicines WHERE id = ?", [medicine.id]);
    } catch (error) {
      console.error("Error deleting the medicine:", error);
      throw new Error("Unable to delete the medicine");
    }
  }

  public static async updateMedicine(medicine: Medicine): Promise<Medicine> {
    try {
      if (!medicine.id) {
        throw new Error("Medicine ID not provided");
      }

      const [result] = await pool.query(
        `UPDATE medicines 
         SET name = ?, quantity = ?, expiration_date = ?, price = ? 
         WHERE id = ?`,
        [
          medicine.name,
          medicine.quantity,
          medicine.expireDate,
          medicine.price,
          medicine.id,
        ]
      );

      if ((result as any).affectedRows === 0) {
        throw new Error("Medicine not found for update");
      }

      const [rows] = await pool.query(`SELECT * FROM medicines WHERE id = ?`, [
        medicine.id,
      ]);

  
      const medicineRows = rows as Medicine[];

      return medicineRows[0];

    } catch (error) {
      console.error("Error updating the medicine:", error);
      throw new Error("Unable to update the medicine");
    }
  }
}