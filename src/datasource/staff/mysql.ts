export class StaffQueries {
    getAllStaffQuery(): string {
      return `SELECT staff.ID, staff.Name, staff.Email, staff.DOB, staff.Mobile, staff_role.Role FROM staff
      JOIN staff_role ON staff.FK_StaffRole = staff_role.ID`;
    }
  
    getStaffByIdQuery(): string {
      return 'SELECT * FROM staff WHERE ID = ?';
    }
  
    getStaffByNameQuery(): string {
      return 'SELECT * FROM staff WHERE Name LIKE ?';
    }

    getTrainerStaffQuery(): string {
      return `SELECT ST.ID, ST.Name FROM staff AS ST JOIN staff_role AS SR ON 
      ST.FK_StaffRole = SR.ID WHERE SR.ID = 1`;
    }

    getStaffRolesQuery(): string {
      return `SELECT ID, Role FROM staff_role`;
    }
  
    insertStaffQuery(): string {
      return 'INSERT INTO staff (Name, DOB, Mobile, Email, FK_StaffRole ) VALUES (?, ?, ?, ?, ?)';
    }
  
    updateStaffQuery(): string {
      return 'UPDATE staff SET Name = ?, DOB = ?, Mobile = ?, Email = ?, Role = ? WHERE ID = ?';
    }
  
    deleteStaffQuery(): string {
      return 'DELETE FROM staff WHERE ID = ?';
    }
  }
  