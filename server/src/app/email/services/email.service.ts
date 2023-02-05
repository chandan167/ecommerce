import { EmailOption } from '@utils/email';
import { EmailQueue, emailQueue } from '@queues/email.queue';
import { renderToString } from '@utils/helper';

export class EmailService {
  private paragraph = [];
  private heading = [];
  private button = [];

  private templateTitle = 'MY SHOP';

  clearAll(): this {
    this.paragraph = [];
    this.heading = [];
    this.button = [];
    return this;
  }
  addLine(text: string): this {
    this.paragraph.push(text);
    return this;
  }
  addHeading(heading: string): this {
    this.heading.push(heading);
    return this;
  }

  addButton(text: string, url: string): this {
    this.button.push({ text, url });
    return this;
  }

  sendSignUpEmail(options: EmailOption) {
    emailQueue.add(EmailQueue.UserSignUp, options);
  }

  async generateTemplate(): Promise<string> {
    return await renderToString('email/email', {
      heading: this.heading,
      paragraph: this.paragraph,
      templateTitle: this.templateTitle,
      button: this.button,
    });
  }
}
