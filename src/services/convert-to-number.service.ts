import {ConvertToNumberApi} from './convert-to-number.api';
import {Inject} from 'typescript-ioc';
import {LoggerApi} from '../logger';

export class ConvertToNumberService implements ConvertToNumberApi {
  logger: LoggerApi;

  constructor(
    @Inject
    logger: LoggerApi,
  ) {
    this.logger = logger.child('ConvertToNumberService');
  }

  // check if num1 > num2
  async greaterThan(num1:string, num2:string): Promise<boolean> {
    if (num1 === 'M') {
      return true;
    } else if (num1 === 'D' && num2 != 'M') {
      return true;
    } else if (num1 === 'C' && (num2 === 'L' || num2 === 'X' || num2 === 'V' || num2 === 'I')) {
      return true;
    } else if (num1 === 'L' && (num2 === 'X' || num2 === 'V' || num2 === 'I')) {
      return true;
    } else if (num1 === 'X' && (num2 === 'V' || num2 === 'I')) {
      return true;
    } else if (num1 === 'V' && num2 === 'I') {
      return true;
    }

    return false;
  };

  // convert roman numeral character to number
  async getNumber(numeral:string): Promise<number> {
    if (numeral === 'M') {
      return 1000;
    } else if (numeral === 'D') {
      return 500;
    } else if (numeral === 'C') {
      return 100;
    } else if (numeral === 'L') {
      return 50;
    } else if (numeral === 'X') {
      return 10;
    } else if (numeral === 'V') {
      return 5;
    } else if (numeral === 'I') {
      return 1;
    } else {
      return 0;
    }
  };

  // convert roman numeral value to number
  async answer(value: string = null): Promise<string> {
    this.logger.info(`Generating number from Roman numeral ${value}`);
    if (!value ) {
      return 'ERROR - blank param';
    }

    let val = value.toUpperCase();
    let total = 0;
    let subtotal = 0;
    let repeatingChars = 1;

    let idx = 0;
    while (idx < val.length) {
      if (idx + 1 === val.length) {
        // check if on the last char
        total = total + (await this.getNumber(val[idx]));
      } else if (val[idx] === val[idx+1]) {
        // if next char is the same, keep a subtotal until different (e.g. XXL)
        subtotal = subtotal + (await this.getNumber(val[idx]));
        repeatingChars = repeatingChars + 1;
        if (repeatingChars > 3) {
          return 'ERROR - invalid roman numeral';
        }
      } else if (await this.greaterThan(val[idx+1], val[idx])) {
        // if next char is greater, then we subtract subtotal from the next number (e.g IX)
        subtotal = subtotal + (await this.getNumber(val[idx]));
        total = total + (await this.getNumber(val[idx+1])) - subtotal;
        subtotal = 0;
        repeatingChars = 1;
        // increment pointer past next char
        idx++;
      } else {
        // if next char is less, then we increment subtotal and add to total (e.g. XXI)
        subtotal = subtotal + (await this.getNumber(val[idx]));
        total = total + subtotal;
        subtotal = 0;
        repeatingChars = 1;
      }
      idx++;
    }

    total = total + subtotal;
    return total.toString(); 
  }
}
