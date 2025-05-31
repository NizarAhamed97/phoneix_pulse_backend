import { Request, Response } from 'express';
import connection from '../../database/dbcon'; // Import the connection
import { DashboardQueries } from './mysql';

export class DashboardController {
  private queries: DashboardQueries;

  constructor() {
    this.queries = new DashboardQueries();
  }

  public getActivity(req: Request, res: Response) {
    connection.query(this.queries.getActivityQuery(), (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
  
      type MemberActivity = {
        ID: number;
        Name: string;
        LastCheckIn: number; // in days ago
      };
  
      const activeMembers: MemberActivity[] = [];
      const inactiveMembers: MemberActivity[] = [];
      const rows = results as any;
      rows.forEach((member: any) => {
        const daysSince = member.LastCheckIn; // assuming query already returns days
        const formatted: MemberActivity = {
          ID: member.ID,
          Name: member.Name,
          LastCheckIn: daysSince,
        };
  
        if (daysSince <= 7) {
          activeMembers.push(formatted);
        } else {
          inactiveMembers.push(formatted);
        }
      });
  
      // Sort descending: most recent check-in (fewest days ago) first
      activeMembers.sort((a, b) => a.LastCheckIn - b.LastCheckIn);
      inactiveMembers.sort((a, b) => a.LastCheckIn - b.LastCheckIn);
 
      res.json({
        activeMembers,
        inactiveMembers,
      });
    });
  }
  
  
  

  public getMemberships(req: Request, res: Response) {
    connection.query(this.queries.getMembershipsQuery(), (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
  
      // Organize results into expirySoon and overdue arrays
      const expirySoon : any= [];
      const overdue : any = [];
  
      (results as any).forEach((membership : any) => {
        if (membership.Status === 'Coming Soon' && membership.DaysToBeExpired <= 7) {
          expirySoon.push(membership);
        } else if (membership.Status === 'Expired') {
          overdue.push(membership);
        }
      });
  
      // Return the response in the desired format
      res.json({
        expirySoon,
        overdue,
      });
    });
  }
  
 
}
