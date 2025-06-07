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
    const { mobile, password } = req.body;

    console.log(mobile)
    connection.query(this.queries.getAdminByUsernameQuery(), [mobile], async (error, results : any) => {
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

      const token = jwt.sign({ id: user.ID, username: user.Username, gymName : user.GymName }, JWT_SECRET, { expiresIn: '1d' });

      res.json({ token });
    });
  };

  public signup = async (req: Request, res: Response) => {
    const { mobile, password, country, gymName} = req.body;
  
    if (!mobile || !password || !country) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      // Check if user already exists
      connection.query(this.queries.getAdminByUsernameQuery(), [mobile], async (error: any, results: any) => {
        if (error) {
          return res.status(500).json({ message: 'Database error', error });
        }
  
        if (results.length > 0) {
          return res.status(409).json({ message: 'Mobile number already registered' });
        }
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Insert the new user
        connection.query(
          this.queries.insertAdminQuery(),
          [mobile, hashedPassword, country, gymName],
          (err: any, insertResult: any) => {
            if (err) {
              return res.status(500).json({ message: 'Insert failed', error: err });
            }
  
            res.status(201).json({ message: 'Signup successful' });
          }
        );
      });
    } catch (err) {
      res.status(500).json({ message: 'Unexpected error', error: err });
    }
  };
  
}
