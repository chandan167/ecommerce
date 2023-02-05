import { Types } from 'mongoose';
import ejs from 'ejs';
import { promises as fs } from 'fs';
import { BadRequest } from 'http-errors';
import path from 'path';
export function checkMongooseId(id: string) {
  if (Types.ObjectId.isValid(id)) {
    return id;
  }
  throw BadRequest(`Invalid id: ${id}`);
}

export function checkMongooseIds(ids: [string]) {
  return ids.map(id => {
    return checkMongooseId(id);
  });
}

export function hasNextPage(skip: number, limit: number, count: number): boolean {
  return skip / limit < count ? true : false;
}

export async function renderToString(template: string, data: Record<string, any> | undefined | null = undefined) {
  const filePath: string = path.join(__dirname, '../', '/templates', template) + '.ejs';
  const html: any = await fs.readFile(filePath, 'ascii');
  const rendered = ejs.render(html, data);
  return rendered;
}
