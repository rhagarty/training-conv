import {ConvertToRomanApi} from './convert-to-roman.api';
import {Inject} from 'typescript-ioc';
import {LoggerApi} from '../logger';

export class ConvertToRomanService implements ConvertToRomanApi {
  logger: LoggerApi;

  constructor(
    @Inject
    logger: LoggerApi,
  ) {
    this.logger = logger.child('ConvertToRomanService');
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

  // generate string of repeating roman numerals
  async repeatChar(char:string, count:number): Promise<string> {
    let value = '';
    for (let i = 0; i < count; i++) {
      value = value + char;
    }
    return value;
  };

  // generate string that reduces the roman numeral
  async reduceNumber(baseChar:string, lowerChar:string, count:number): Promise<string> {
    let repeatChars = (await this.repeatChar(lowerChar, count));
    return repeatChars + baseChar;
  };

  // generate string that increases the roman numeral
  async increaseNumber(baseChar:string, higherChar:string, count:number): Promise<string> {
    let repeatChars = (await this.repeatChar(higherChar, count));
    return baseChar + repeatChars;
  };

  // convert roman numeral value to number
  async answer(value: string = null): Promise<string> {
    this.logger.info(`Generating Roman numeral from number ${value}`);
    if (!value ) {
      return 'ERROR - blank param';
    }

    let num = parseInt(value);
    if (num > 3999) {
      return 'ERROR - number must be < 4000';
    }

    // separate out numbers from value
    let ones = parseInt(value.slice(value.length - 1));
    let tens = 0;
    let hundreds = 0;
    let thousands = 0;

    if (value.length > 1) {
      tens = parseInt(value.slice(value.length - 2, value.length - 1));
    }
    if (value.length > 2) {
      hundreds  = parseInt(value.slice(value.length - 3, value.length - 2));
    }
    if (value.length > 3) {
      thousands  = parseInt(value.slice(value.length - 4, value.length - 3));
    }

    let result = '';

    if (ones <= 3) {
      result = (await this.repeatChar('I', ones));
    } else if (ones <= 5) {
      result = (await this.reduceNumber('V', 'I', (5 - ones)));
    } else if (ones <= 8) {
      result = (await this.increaseNumber('V', 'I', (ones - 5)));
    } else {
      result = (await this.reduceNumber('X', 'I', (10 - ones)));
    }

    if (tens > 0) {
      if (tens <= 3) {
        result = (await this.repeatChar('X', tens)).concat(result);
      } else if (tens <= 5) {
        result = (await this.reduceNumber('L', 'X', (5 - tens))).concat(result);
      } else if (tens <= 8) {
        result = (await this.increaseNumber('L', 'X', (tens - 5))).concat(result);
      } else {
        result = (await this.reduceNumber('L', 'C', (10 - tens))).concat(result);
      }  
    }

    if (hundreds > 0) {
      if (hundreds <= 3) {
        result = (await this.repeatChar('C', hundreds)).concat(result);
      } else if (hundreds <= 5) {
        result = (await this.reduceNumber('D', 'C', (5 - hundreds))).concat(result);
      } else if (hundreds <= 8) {
        result = (await this.increaseNumber('D', 'C', (hundreds - 5))).concat(result);
      } else {
        result = (await this.reduceNumber('M', 'C', (10 - hundreds))).concat(result);
      }
    }
        
    if (thousands > 0) {
      result = (await this.repeatChar('M', thousands)).concat(result);
    }

    return result;
  };
}
