import pool from './db';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    return;
  }

  try {
  
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    return;
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = (rows as any[])[0];

    if (!user) {
      res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos.' });
      return;
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso.', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión.' });
  }
};