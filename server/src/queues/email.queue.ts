import { EmailOption, sendMail } from "@utils/email";
import { logger } from "@utils/logger";
import { createQueue } from "@utils/queue";

const queueName = 'Email Queue'

export enum EmailQueue {
    UserSignUp = 'UserSignUp',
}

export const emailQueue = createQueue(queueName)

emailQueue.process(EmailQueue.UserSignUp,3,async function(job){
    const data: EmailOption = job.data;
    const info = await sendMail(data)
    job.progress(100)
    return info
})

emailQueue.on('error', (error) =>{
    logger.error([`${queueName} failed `, error])
})

emailQueue.on('failed', (job, error) => {
    logger.error([JSON.stringify(job), error])
})

emailQueue.on('completed', (job) =>{
    logger.info(JSON.stringify(job.returnvalue))
    logger.info(['preview url ', job.returnvalue?.previewUrl])
})