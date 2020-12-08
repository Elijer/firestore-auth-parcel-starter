import { rword } from 'rword';

export function name(){
    var name = rword.generate(4) + " " + rword.generate(4) + " " + rword.generate(4);
}