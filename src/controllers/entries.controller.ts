import { Request, Response } from 'express';
import pool from '../db';

export const getAllEntries = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT entries.* habits.name, habits.category FROM entries JOIN habits ON entries.habit_id = habits.id');
         if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Entradas no encontradas' });
        }
        res.json({ message: 'Entradas encontradas', entries: result.rows });
    } catch (error) {
        console.error('Error al obtener entradas:', error);
        res.status(500).json({ message: 'Error al obtener entradas' });
    }
};


export const getEntriesByHabitId = async (req: Request, res: Response) => {
    try {
        const habitId = req.params.id;
        const result = await pool.query('SELECT * FROM entries WHERE id = $1', [habitId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Entradas no encontradas' });
        }
        res.json({ message: 'Entrada encontrada', entry: result.rows[0] });
    } catch (error) {
        console.error('Error al obtener entradas:', error);
        res.status(500).json({ message: 'Error al obtener entradas' });
    }

};



export const createEntry = async (req: Request, res: Response) => {
    const habitId = req.params.id;
    const { date, completed } = req.body;

    try {
        const result = await pool.query('INSERT INTO entries (habit_id, date, completed) VALUES ($1, $2, $3) RETURNING *', [habitId, date, completed]);
        res.status(201).json({ message: 'Entrada creada', entry: result.rows[0] });
    } catch (error) {
        console.error('Error al crear entrada:', error);
        res.status(500).json({ message: 'Error al crear entrada' });
    }

};

export const deleteEntry = async (req: Request, res: Response) => {
        const habitId = req.params.id;

        try {
            const result = await pool.query('DELETE FROM entries WHERE habit_id = $1 RETURNING *', [habitId]);
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Entrada no encontrada' });
            }

        }catch (error) {
            console.error('Error al eliminar entrada:', error);
            res.status(500).json({ message: 'Error al eliminar entrada' });
        }
}