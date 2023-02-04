import { Types } from 'mongoose';
import { BadRequest } from 'http-errors';
export function checkMongooseId(id: string) {
    if (Types.ObjectId.isValid(id)) {
        return id;
    }
    throw BadRequest(`Invalid id: ${id}`)

}

export function checkMongooseIds(ids: [string]) {
    return ids.map(id => {
        return checkMongooseId(id)
    })
}

export function hasNextPage(skip: number, limit: number, count: number): boolean {
    return ((skip / limit) < count) ? true : false;
}