export class ActionForm<T> {
  private action: (formData: FormData) => Promise<T>;
  private message: string;

  constructor(message: string, action: (formData: FormData) => Promise<T>) {
    this.message = message;
    this.action = action;
  }

  async execute(formData: FormData): Promise<T & { message: string }> {
    const data = await this.action(formData);
    return { message: this.message, ...data };
  }
}
