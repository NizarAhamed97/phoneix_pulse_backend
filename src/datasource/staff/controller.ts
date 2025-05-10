import { Request, Response } from 'express';
import connection from '../../database/dbcon'; // Import the connection
import { StaffQueries } from './mysql';

export class StaffController {
  private queries: StaffQueries;

  constructor() {
    this.queries = new StaffQueries();
  }

  public getAllStaff(req: Request, res: Response) {
    connection.query(this.queries.getAllStaffQuery(), (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
  
      const staff = results as { [key: string]: any }[];
  
      const formattedResults = staff.map((member) => {
        if (member.DOB) {
          const date = new Date(member.DOB);
          const formattedDOB = date.toLocaleDateString("en-GB"); // DD/MM/YYYY
          return { ...member, DOB: formattedDOB };
        }
        return member;
      });
  
      res.json(formattedResults);
    });
  }
  

  public getStaffById(req: Request, res: Response) {
    const { id } = req.params;
    connection.query(this.queries.getStaffByIdQuery(), [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      if ((results as any).length === 0) {
        return res.status(404).json({ message: 'Staff not found' });
      }
      res.json(results);
    });
  }

  public getStaffByName(req: Request, res: Response) {
    const { name } = req.params;
    const searchPattern = `%${name}%`;
    connection.query(this.queries.getStaffByNameQuery(), [searchPattern], (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      if ((results as any).length === 0) {
        return res.status(404).json({ message: 'No staff found matching the given name' });
      }
      res.json(results);
    });
  }

  public getTrainerStaffs(req: Request, res: Response) { 
    connection.query(this.queries.getTrainerStaffQuery(), (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.status(200).json(results);
    });
  }
  

  public createStaff(req: Request, res: Response) {
    const { Name, DOB, Mobile, Email, Role } = req.body;
    connection.query(
      this.queries.insertStaffQuery(),
      [Name, DOB, Mobile, Email, Role],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error });
        }
        res.status(201).json({ message: 'Staff created successfully', id: (results as any).insertId });
      }
    );
  }

  public updateStaff(req: Request, res: Response) {
    const { id } = req.params;
    const { Name, DOB, ContactNo, Email, Role } = req.body;
    connection.query(
      this.queries.updateStaffQuery(),
      [Name, DOB, ContactNo, Email, Role, id],
      (error) => {
        if (error) {
          return res.status(500).json({ error });
        }
        res.json({ message: 'Staff updated successfully' });
      }
    );
  }

  public deleteStaff(req: Request, res: Response) {
    const { id } = req.params;
    connection.query(this.queries.deleteStaffQuery(), [id], (error) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.json({ message: 'Staff deleted successfully' });
    });
  }
}
