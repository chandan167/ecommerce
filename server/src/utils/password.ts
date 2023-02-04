import bcrypt from 'bcrypt';
export class Password {
  private saltRound = 10;

  autoGenerate() {
    return 'password';
  }

  setSaltRound(saltRound: number): this {
    this.saltRound = saltRound;
    return this;
  }
  async hash(text) {
    const salt = await bcrypt.genSalt(this.saltRound);
    return await bcrypt.hash(text, salt);
  }
}
