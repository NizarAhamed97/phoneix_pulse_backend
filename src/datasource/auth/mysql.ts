export class AuthQueries {
    public getAdminByUsernameQuery(): string {
      return 'SELECT * FROM admin WHERE Username = ?';
    }

    public insertAdminQuery(): string {
      return 'INSERT INTO admin (Username, Password, Country, GymName) VALUES (?, ?, ?, ?)';
    }
  }
  