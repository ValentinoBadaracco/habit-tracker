import { Request, Response } from 'express';
import pool from '../db';

export const getHabits = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM habits');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener hábitos:', error);
        res.status(500).json({ message: 'Error al obtener hábitos' });
    }

};

export const getHabitsById = async (req: Request, res: Response) => {
    try {
        const habitId = req.params.id;
        const result = await pool.query('SELECT * FROM habits WHERE id = $1', [habitId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Hábito no encontrado' });
        }
        res.json({ message: 'Hábito encontrado', habit: result.rows[0] });
    } catch (error) {
        console.error('Error al obtener hábitos:', error);
        res.status(500).json({ message: 'Error al obtener hábitos' });
    }

};



export const postHabit = async (req: Request, res: Response) => {
    const habit = req.body
    try {
        const result = await pool.query('INSERT INTO habits (name, description, category, priority) VALUES ($1, $2, $3, $4) RETURNING *', [habit.name, habit.description, habit.category, habit.priority]);
        res.status(201).json({ message: 'Hábito creado', habit: result.rows[0] });
    } catch (error) {
        console.error('Error al crear hábito:', error);
        res.status(500).json({ message: 'Error al crear hábito' });
    }

};

export const updateHabit = async (req: Request, res: Response) => {
    const habitId = req.params.id;
    const updatedHabit = req.body;
    try {
        const result = await pool.query('UPDATE habits SET name = $1, description = $2, category = $3, priority = $4 WHERE id = $5 RETURNING *', [updatedHabit.name, updatedHabit.description, updatedHabit.category, updatedHabit.priority, habitId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Hábito no encontrado' });
        }
        res.status(200).json({ message: 'Hábito actualizado', habit: result.rows[0] });
    } catch (error) {
        console.error('Error al editar hábito:', error);
        res.status(500).json({ message: 'Error al editar hábito' });
    }



};

export const deleteHabit = async (req: Request, res: Response) => {
    const habitId = req.params.id;
    try {
        const result = await pool.query('DELETE FROM habits WHERE id = $1 RETURNING *', [habitId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Hábito no encontrado' });
        }
        res.status(200).json({ message: 'Hábito eliminado', habit: result.rows[0] });
    } catch (error) {
        console.error('Error al editar hábito:', error);
        res.status(500).json({ message: 'Error al editar hábito' });
    }

};


export const postEntries = (req: Request, res: Response) => {
    const habitId = req.params.id;

    res.json({ message: 'Hábito eliminado', habitId });
};