export class StaffQueries {
    getAllStaffQuery(): string {
      return 'SELECT * FROM staff';
    }
  
    getStaffByIdQuery(): string {
      return 'SELECT * FROM staff WHERE ID = ?';
    }
  
    getStaffByNameQuery(): string {
      return 'SELECT * FROM staff WHERE Name LIKE ?';
    }
  
    insertStaffQuery(): string {
      return 'INSERT INTO staff (Name, DOB, Mobile, Email, Role) VALUES (?, ?, ?, ?, ?)';
    }
  
    updateStaffQuery(): string {
      return 'UPDATE staff SET Name = ?, DOB = ?, Mobile = ?, Email = ?, Role = ? WHERE ID = ?';
    }
  
    deleteStaffQuery(): string {
      return 'DELETE FROM staff WHERE ID = ?';
    }
  }
  