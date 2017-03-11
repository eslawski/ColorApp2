export class Color {
    public hexCode: String;
    public red: number;
    public green: number;
    public blue: number;
    public isLight: boolean;

    constructor(hexCode: String) {
        this.hexCode = hexCode;

        // Extract the parts of the hex code into their rgb counterparts.
        const BASE_16 = 16;
        this.red = parseInt(hexCode.substr(0, 2), BASE_16);
        this.green = parseInt(hexCode.substr(2, 2), BASE_16);
        this.blue = parseInt(hexCode.substr(4, 2), BASE_16);
        
        // Formula for calculating if the color is considered "light" or "dark". Primarily used
        // to determine what font color should be used when displaying it.
        this.isLight = (1 - (.299 * this.red + .587 * this.green + .114 * this.blue) / 255) < .5;
    }
}