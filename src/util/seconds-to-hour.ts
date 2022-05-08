import { Injectable } from '@nestjs/common';
import * as moment from "moment";

@Injectable()
export class SecondsToHour {

    constructor() { }

    diff(inicio: Date, fin: Date): { inicioAt: string, finAt: string, hourToString: String, secondsToNumber: Number, millisecondsToNumber: Number } {
        const val_Inicio = moment(inicio);
        const val_Fin = moment(fin);
        const diffSeconds = val_Fin.diff(val_Inicio, 'seconds');
        const diffMilliseconds = diffSeconds <= 2 ? val_Fin.diff(val_Inicio, 'milliseconds'): 0;
        return {
            inicioAt: moment(inicio).toISOString(),
            finAt: moment(fin).toISOString(),
            hourToString: this.transform(diffSeconds),
            secondsToNumber: diffSeconds,
            millisecondsToNumber: diffMilliseconds
        }
    }

    transform(seconds: number): string {
        seconds = Number(seconds);
        let negative = "";
        if (seconds < 0) {
            seconds = seconds * -1;
            negative = "-";
        }
        var h = Math.floor(seconds / 3600);
        var m = Math.floor((seconds % 3600) / 60);

        return `${negative}${this.formatNumber(h)}:${this.formatNumber(m)}`;
    }

    formatNumber(n: number) {
        if (n < 10 && n > 0) {
            return `0${n}`;
        } else if (n == 0) {
            return "00";
        } else if (n > 9) {
            return n;
        }
    }

}