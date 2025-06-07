export class MemberQueries {
    // Function to get all members
    public getAllMembersQuery(): string {
      return 'SELECT ID, Name, PlanName, RenewalDate, Pending FROM members';
    }
  
    // Function to get a member by ID
    public getMemberByIdQuery(): string {
      return 'SELECT * FROM members WHERE ID = ?';
    }

    // Function to get a member by Name
    public getMemberByNameQuery(): string {
      return 'SELECT * FROM members WHERE Name LIKE ?';
    }
  
    // Function to insert a new member
    public insertMemberQuery(): string {
      return `INSERT INTO members ( Name, DOB, ContactNo, Email,PersonalTrainer,TrainerID, PlanName, PlanDurationMonths, 
      PlanDurationYears,RenewalDate,PlanAmount, AmountPaid, Pending, AddedBy) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?)`;
    }

    public getMembershipByID(): string {
      return `SELECT RenewalDate, Pending FROM members WHERE ID = ?`;
    }

    public updateMembershipByID(): string {
      return  `UPDATE members SET PlanName = ?, PlanDurationYears = ?, PlanDurationMonths = ?, PlanAmount = ?, AmountPaid = ?, Pending = ?, RenewalDate = ?
      WHERE ID = ?`;
    }

    public updatePending(): string {
      return `UPDATE members SET Pending = ? WHERE ID = ?`;;
    }
  
    // Function to update a member
    public updateMemberQuery(fieldsToUpdate: any[]): string {
      return `UPDATE members SET ${fieldsToUpdate.join(", ")} WHERE ID = ?`;
    }
  
    // Function to delete a member
    public deleteMemberQuery(): string {
      return 'DELETE FROM members WHERE ID = ?';
    }
  }
  