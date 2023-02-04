import { queueConnection } from '@config/queue.config';
import Queue from 'bull';


export function createQueue(qName:string){
    return new Queue(qName, queueConnection)
}