import { Request, Response } from 'express';
import connection from '../../database/dbcon'; // Import the connection
import { MemberQueries } from './mysql';
import { MemberLogic } from './businesslogic';
import { calculateEndDate } from '../../util/dateUtil';
import { formatDateToDMY } from '../../util/dateUtil';

export class MemberController {
  private queries: MemberQueries;
  private logic : MemberLogic;

  constructor() {
    this.queries = new MemberQueries();
    this.logic = new MemberLogic();

  }

  // Function to get all members
  public getAllMembers(req: Request, res: Response) {
    connection.query(this.queries.getAllMembersQuery(), (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
  
      const members = results as { [key: string]: any }[];
      const formattedResults = this.logic.formatMembersDOB(members);
      res.json(formattedResults);
    });
  }
  
  

  // Function to get a member by ID
  public getMemberById(req: Request, res: Response) {
    const { id } = req.params;
    connection.query(this.queries.getMemberByIdQuery(), [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      if ((results as any).length === 0) {
        return res.status(404).json({ message: 'Member not found' });
      }
      const members = results as { [key: string]: any }[];
      const formattedResults = this.logic.formatMembersDOB(members);
      res.json((formattedResults as any)[0]);
    });
  }


  // Function to get a member by name (supports partial matching)
  public getMemberByName(req: Request, res: Response) {
    const { name } = req.params; // Get 'name' from the request params
    const searchPattern = `%${name}%`; // Create a pattern for partial matching
    connection.query(this.queries.getMemberByNameQuery(), [searchPattern], (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      if ((results as any).length === 0) {
        return res.status(404).json({ message: 'No members found matching the given name' });
      }
      res.json(results);
    });
  }

  // Function to create a new member
  public createMember(req: Request, res: Response) {
    const { Name, DOB, ContactNo, Email,PersonalTrainer,TrainerID, PlanName, PlanDurationMonths, 
      PlanDurationYears, PlanAmount, AmountPaid, AddedBy } = req.body;
      
      const RenewalDate = calculateEndDate(new Date(),parseInt(PlanDurationYears),parseInt(PlanDurationMonths));
      const Pending = parseInt(PlanAmount) - parseInt(AmountPaid)
    connection.query(this.queries.insertMemberQuery(), [ Name, DOB, ContactNo, Email,PersonalTrainer,
      TrainerID, PlanName, PlanDurationMonths, PlanDurationYears,RenewalDate, PlanAmount, AmountPaid, Pending, AddedBy], (error, results) => {
      if (error) {
        console.log(error)
        return res.status(500).json({ error });
      }
      res.status(201).json({ message: 'Member added successfully', memberId: (results as any).insertId });
    });
  }

  // Function to update a member
  public updateMember(req: Request, res: Response) {
    const { id } = req.params;
  
    const allowedFields = [
      "Name",
      "DOB",
      "ContactNo",
      "Email",
      "PersonalTrainer",
      "TrainerID",
    ];
  
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];
  
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        fieldsToUpdate.push(`${field} = ?`);
        values.push(req.body[field]);
      }
    });
  
    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({ message: "No valid fields provided for update." });
    }
  
    values.push(id); // for WHERE ID = ?
  
    connection.query(this.queries.updateMemberQuery(fieldsToUpdate), values, (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.json({ message: "Member updated successfully" });
    });
  }
  

  public renewMembership(req: Request, res: Response) {
    const { id } = req.params;
    const { PlanName, PlanAmount, PlanDurationYears, PlanDurationMonths, AmountPaid } = req.body;
  
    const durationYears = parseInt(PlanDurationYears);
    const durationMonths = parseInt(PlanDurationMonths);
    const paid = parseInt(AmountPaid);
    const amount = parseInt(PlanAmount);
    console.log(paid,amount)
  
    if (!PlanName || isNaN(durationYears) || isNaN(durationMonths) || isNaN(amount)) {
      return res.status(400).json({ message: "Missing or invalid fields." });
    }
  
    // Step 1: Fetch current RenewalDate and Pending
    connection.query(
      this.queries.getMembershipByID(),
      [id],
      (err, results : any) => {
        if (err || results.length === 0) {
          return res.status(500).json({ error: err || "Member not found" });
        }
  
        const { RenewalDate: currentRenewalDateStr, Pending: existingPending } = results[0];
  
        // Step 2: Calculate base date
        const currentDate = new Date(currentRenewalDateStr);
        const day = String(currentDate.getDate()).padStart(2, "0");
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const year = currentDate.getFullYear();
        const currentRenewalDate = new Date(`${year}-${month}-${day}`);
        const today = new Date();
        const baseDate = currentRenewalDate > today ? currentRenewalDate : today;
  
        // Step 3: Calculate new RenewalDate
        const formattedRenewalDate = calculateEndDate(baseDate,durationYears,durationMonths)
  
        // Step 4: Calculate new pending
        const difference = amount - paid;
        let newPending = parseInt(existingPending) + difference;
        console.log(newPending)
        newPending = newPending < 0 ? 0 : newPending;
  
        // Step 5: Update member
        const values = [PlanName, durationYears, durationMonths, amount, paid, newPending, formattedRenewalDate, id];
  
        connection.query(this.queries.updateMembershipByID(), values, (err2, result) => {
          if (err2) {
            console.log(err2)
            return res.status(500).json({ error: err2 });
          }
          res.json({ message: "Membership renewed successfully" });
        });
      }
    );
  }

  public updatePending(req: Request, res: Response) {
    const { id } = req.params;
    const { Pending } = req.body;
  
    if (Pending === undefined || isNaN(Pending)) {
      return res.status(400).json({ message: "Invalid or missing pending amount." });
    }
  
    connection.query(this.queries.updatePending(), [Pending, id], (error, results) => {
      if (error) {
        console.error("DB Error:", error);
        return res.status(500).json({ error: "Failed to update pending amount." });
      }
  
      if ((results as any).affectedRows === 0) {
        return res.status(404).json({ message: "Member not found." });
      }
  
      res.json({ message: "Pending amount updated successfully." });
    });
  }
  
  
  

  // Function to delete a member
  public deleteMember(req: Request, res: Response) {
    const { id } = req.params;
    connection.query(this.queries.deleteMemberQuery(), [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.json({ message: 'Member deleted successfully' });
    });
  }
}
