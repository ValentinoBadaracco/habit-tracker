import { Request, Response } from 'express';

export const getHabits = (req: Request, res: Response) => {
    res.json({
        habits: [
            { id: 1, name: 'Ejercicio', description: 'Hacer ejercicio diariamente' },
            { id: 2, name: 'Lectura', description: 'Leer un libro por día' },
            { id: 3, name: 'Meditación', description: 'Meditar por 10 minutos al día' }
        ]
    })
};


export const postHabit = (req: Request, res: Response) => {
    console.log(req.body)
    const habit = { ...req.body, id: Date.now() };
    
    res.status(201).json({ message: 'Hábito creado', habit})
};

export const patchHabit = (req: Request, res: Response) => {
    const habitId = req.params.id;
    const updatedHabit = req.body;
    
    res.json({ message: 'Hábito actualizado', updatedHabit });
};

export const deleteHabit = (req: Request, res: Response) => {
    const habitId = req.params.id;
    
    res.json({ message: 'Hábito eliminado', habitId });
};


export const postEntries = (req: Request, res: Response) => {
    const habitId = req.params.id;
    
    res.json({ message: 'Hábito eliminado', habitId });
};