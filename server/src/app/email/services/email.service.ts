import { EmailOption } from "@utils/email"
import { EmailQueue, emailQueue } from "@queues/email.queue"


export class EmailService{

    sendSignUpEmail(options:EmailOption){
        emailQueue.add(EmailQueue.UserSignUp, options)
    }
}