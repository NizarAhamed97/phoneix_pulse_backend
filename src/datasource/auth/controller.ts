import { Request, Response } from 'express';
import connection from '../../database/dbcon'; // your DB connector
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // assuming you hash passwords
import { AuthQueries } from './mysql';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export class AuthController {
  private queries: AuthQueries;

  constructor() {
    this.queries = new AuthQueries();
  }

  public login = (req: Request, res: Response) => {
    const { username, password } = req.body;

    connection.query(this.queries.getAdminByUsernameQuery(), [username], async (error, results : any) => {
      if (error) {
        return res.status(500).json({ error });
      }
      console.log(results)
      const user = results[0];
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const isMatch = await bcrypt.compare(password, user.Password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign({ id: user.ID, username: user.Username }, JWT_SECRET, { expiresIn: '1d' });

      res.json({ token });
    });
  };
}
