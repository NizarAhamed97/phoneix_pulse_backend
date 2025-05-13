export class AuthQueries {
    getAdminByUsernameQuery(): string {
      return 'SELECT * FROM admin WHERE Username = ?';
    }
  }
  