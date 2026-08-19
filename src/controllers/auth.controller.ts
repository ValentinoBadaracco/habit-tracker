import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import pool from '../db';
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query('INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at', [username, email, hashedPassword]);

        res.status(201).json({ message: 'Usuario registrado', user: result.rows[0] });

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        const user = result.rows[0];
        const passwordsMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordsMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        );
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // solo HTTPS en producción
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días en milisegundos
        });

        res.json({ message: 'Login exitoso', user: { id: user.id, username: user.username, email: user.email } });


    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
}

