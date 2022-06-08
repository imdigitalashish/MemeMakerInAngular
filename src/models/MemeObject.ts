import { Meme } from "./meme";




export interface Data {
    memes: Meme[];
}

export interface MemeObject {
    success: boolean;
    data: Data;
}


