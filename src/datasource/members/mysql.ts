export class MemberQueries {
    // Function to get all members
    public getAllMembersQuery(): string {
      return 'SELECT * FROM Members';
    }
  
    // Function to get a member by ID
    public getMemberByIdQuery(): string {
      return 'SELECT * FROM Members WHERE ID = ?';
    }

    // Function to get a member by Name
    public getMemberByNameQuery(): string {
      return 'SELECT * FROM Members WHERE Name LIKE ?';
    }
  
    // Function to insert a new member
    public insertMemberQuery(): string {
      return 'INSERT INTO Members (Name, DOB, Mobile, Email, AddedBy) VALUES (?, ?, ?, ?, ?)';
    }
  
    // Function to update a member
    public updateMemberQuery(): string {
      return 'UPDATE Members SET Name = ?, DOB = ?, Mobile = ?, Email = ?, AddedBy = ? WHERE ID = ?';
    }
  
    // Function to delete a member
    public deleteMemberQuery(): string {
      return 'DELETE FROM Members WHERE ID = ?';
    }
  }
  