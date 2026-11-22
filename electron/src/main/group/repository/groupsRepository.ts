import type Database from 'better-sqlite3';
import type { Group } from '../../../renderer/src/pages/Home/Shared/Group';

export function listGroupsFromDb(
  db: Database.Database,
  search?: string
): Group[] {
  const trimmed = search?.trim();

  if (trimmed) {
    return db
      .prepare('SELECT id, name FROM groups WHERE name LIKE ? ORDER BY name ASC')
      .all(`%${trimmed}%`) as Group[];
  }

  return db
    .prepare('SELECT id, name FROM groups ORDER BY name ASC')
    .all() as Group[];
}