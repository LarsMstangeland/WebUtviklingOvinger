import pool from './mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Task = {
  id: number;
  title: string;
  done: boolean;
  description: string;
};

class TaskService {
  /**
   * Get task with given id.
   */
  get(id: number) {
    return new Promise<Task | undefined>((resolve, reject) => {
      pool.query('SELECT * FROM Tasks WHERE id = ?', [id], (error, results: RowDataPacket[]) => {
        if (error) return reject(error);

        resolve(results[0] as Task);
      });
    });
  }

  /**
   * Get all tasks.
   */
  getAll() {
    return new Promise<Task[]>((resolve, reject) => {
      pool.query('SELECT * FROM Tasks', (error, results: RowDataPacket[]) => {
        if (error) return reject(error);

        resolve(results as Task[]);
      });
    });
  }

  /**
   * Create new task having the given title.
   *
   * Resolves the newly created task id.
   */
  create(title: string, description: string) {
    return new Promise<number>((resolve, reject) => {
      pool.query('INSERT INTO Tasks SET title=?, description=?', [title,description], (error, results: ResultSetHeader) => {
        if (error) return reject(error);
        resolve(results.insertId);
      });
    });
  }

  /**
   * Delete task with given id.
   */
  delete(id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query('DELETE FROM Tasks WHERE id = ?', [id], (error, results: ResultSetHeader) => {
        if (error) return reject(error);
        if (results.affectedRows == 0) return reject(new Error('No row deleted'));
        resolve();
      });
    });
  }

  update(task:Task){
    return new Promise<void>((resolve, reject) => {
      pool.query('UPDATE Tasks SET done=?, description=? WHERE id=?', [task.done, task.description, task.id], (error, results: ResultSetHeader) => {
        if(error) return reject(error)
        resolve();
      });
    });
  }
}

const taskService = new TaskService();
export default taskService;
