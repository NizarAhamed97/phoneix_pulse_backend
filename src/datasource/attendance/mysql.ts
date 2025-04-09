export class AttendanceQueries {
  // Member Queries
  getPresentMembersQuery() {
    return `
      SELECT members.ID, members.Name, members.Mobile, attendance.CheckIn, attendance.CheckOut 
      FROM members 
      JOIN attendance ON members.ID = attendance.FK_MemberID 
      WHERE DATE(attendance.CheckIn) = CURDATE()
    `;
  }

  getAbsentMembersQuery() {
    return `
      SELECT ID, Name, Mobile 
      FROM members 
      WHERE ID NOT IN (
        SELECT FK_MemberID 
        FROM attendance 
        WHERE DATE(CheckIn) = CURDATE()
      )
    `;
  }

  insertAttendanceQuery() {
    return "INSERT INTO attendance (FK_MemberID, CheckIn) VALUES (?, NOW())";
  }

  updateCheckoutQuery() {
    return `
      UPDATE attendance 
      SET CheckOut = NOW() 
      WHERE FK_MemberID = ? AND CheckOut IS NULL AND DATE(CheckIn) = CURDATE()
    `;
  }

  // Staff Queries
  getPresentStaffQuery() {
    return `
      SELECT staff.ID, staff.Name, staff.Mobile 
      FROM staff 
      JOIN staff_attendance ON staff.ID = staff_attendance.FK_StaffID 
      WHERE DATE(staff_attendance.CheckIn) = CURDATE()
    `;
  }

  getAbsentStaffQuery() {
    return `
      SELECT ID, Name, Mobile 
      FROM staff 
      WHERE ID NOT IN (
        SELECT FK_StaffID 
        FROM staff_attendance 
        WHERE DATE(CheckIn) = CURDATE()
      )
    `;
  }

  insertStaffAttendanceQuery() {
    return "INSERT INTO staff_attendance (FK_StaffID, CheckIn) VALUES (?, NOW())";
  }

  updateStaffCheckoutQuery() {
    return `
      UPDATE staff_attendance 
      SET CheckOut = NOW() 
      WHERE FK_StaffID = ? AND CheckOut IS NULL AND DATE(CheckIn) = CURDATE()
    `;
  }
}