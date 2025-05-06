export class MemberQueries {
    // Function to get all members
    public getAllMembersQuery(): string {
      return 'SELECT * FROM members';
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
      return 'INSERT INTO members (Name, DOB, Mobile, Email, AddedBy) VALUES (?, ?, ?, ?, ?)';
    }
  
    // Function to update a member
    public updateMemberQuery(): string {
      return 'UPDATE members SET Name = ?, DOB = ?, Mobile = ?, Email = ?, AddedBy = ? WHERE ID = ?';
    }
  
    // Function to delete a member
    public deleteMemberQuery(): string {
      return 'DELETE FROM members WHERE ID = ?';
    }
  }
  