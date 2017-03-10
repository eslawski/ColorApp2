export class Color {
    public id: number;
    public hexCode: String;
    public red: number;
    public green: number;
    public blue: number;
    public isLight: boolean;

    constructor(hexCode: String) {
        this.hexCode = hexCode;
        this.id = null; //TODO figiure this out

        // Extract the parts of the hex code into their rgb counterparts.
        // Ignore the '#' symbol.
        const BASE_16 = 16;
        this.red = parseInt(hexCode.substr(1, 2), BASE_16);
        this.green = parseInt(hexCode.substr(3, 2), BASE_16);
        this.blue = parseInt(hexCode.substr(5, 2), BASE_16);
        
        // Formula for calculating if the color is considered "light" or "dark". Primarily used
        // to determine what font color should be used when displaying it.
        this.isLight = (1 - (.299 * this.red + .587 * this.green + .114 * this.blue) / 255) < .5;
    }
}