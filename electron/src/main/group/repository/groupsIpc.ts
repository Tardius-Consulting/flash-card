import { ipcMain } from 'electron';
import type Database from 'better-sqlite3';
import { listGroupsFromDb } from './groupsRepository';

export function registerGroupIpcHandlers(db: Database.Database) {
  ipcMain.handle('groups:list', (_event, search?: string) => {
  const term = search?.trim();

  if (term) {
    return db
      .prepare('SELECT id, name FROM groups WHERE name LIKE ? ORDER BY name ASC')
      .all(`%${term}%`);
  }

  return db
    .prepare('SELECT id, name FROM groups ORDER BY name ASC')
    .all();
});
}