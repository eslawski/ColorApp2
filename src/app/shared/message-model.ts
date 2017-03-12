export class Message {
    public text: string;
    public isError: boolean;

    constructor(text: string, isError: boolean) {
        this.text = text;
        this.isError = isError;
    }
}