export default class PrintLog {
  private readonly content: string[];

  constructor() {
    this.content = [];
  }

  log(...val: string[]) {
    val.forEach((el) => {
      this.content.push(el);
      console.log(el);
    });
  }

  getArr(): string[] {
    return this.content;
  }
}
