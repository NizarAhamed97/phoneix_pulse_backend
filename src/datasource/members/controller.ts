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
      console.log(formattedResults)
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
    const { Name, DOB, ContactNo, Email, AddedBy } = req.body;
    connection.query(this.queries.updateMemberQuery(), [Name, DOB, ContactNo, Email, AddedBy, id], (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.json({ message: 'Member updated successfully' });
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
