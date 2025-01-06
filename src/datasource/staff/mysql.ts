export class StaffQueries {
    getAllStaffQuery(): string {
      return 'SELECT * FROM Staff';
    }
  
    getStaffByIdQuery(): string {
      return 'SELECT * FROM Staff WHERE ID = ?';
    }
  
    getStaffByNameQuery(): string {
      return 'SELECT * FROM Staff WHERE Name LIKE ?';
    }
  
    insertStaffQuery(): string {
      return 'INSERT INTO Staff (Name, DOB, ContactNo, Email, Role) VALUES (?, ?, ?, ?, ?)';
    }
  
    updateStaffQuery(): string {
      return 'UPDATE Staff SET Name = ?, DOB = ?, ContactNo = ?, Email = ?, Role = ? WHERE ID = ?';
    }
  
    deleteStaffQuery(): string {
      return 'DELETE FROM Staff WHERE ID = ?';
    }
  }
  