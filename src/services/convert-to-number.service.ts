import {ConvertToNumberApi} from './convert-to-number.api';
import {Inject} from 'typescript-ioc';
import {LoggerApi} from '../logger';

class ValidCheckResult {
  isValid:boolean;
  errorString:string
  constructor(valid: boolean, error:string) {
    this.isValid = valid;
    this.errorString = error;
  }
}

export class ConvertToNumberService implements ConvertToNumberApi {
  logger: LoggerApi;

  constructor(
    @Inject
    logger: LoggerApi,
  ) {
    this.logger = logger.child('ConvertToNumberService');
  }

  /**
   * Return true if num1 > num2
   * @param num1 
   * @param num2 
   */
  async greaterThan(num1:string, num2:string): Promise<boolean> {
    let precedenceOrder = [ 'I', 'V', 'X', 'L', 'C', 'D', 'M' ];
    let num1Idx = 0;
    let num2Idx = 0;

    for (let i = 0; i < precedenceOrder.length; i++) {
      if (num1 == precedenceOrder[i]) {
        num1Idx = i;
      }
      if (num2 == precedenceOrder[i]) {
        num2Idx = i;
      }
    }

    return (num1Idx > num2Idx);
  };

  /**
   * Simple conversion from a roman numeral character to real number
   * @param numeral 
   */
  // convert roman numeral character to number
  async getNumber(numeral:string): Promise<number> {
    let romanNumbers = [ 'M', 'D', 'C', 'L', 'X', 'V', 'I' ];
    let realNumbers = [ 1000, 500, 100, 50, 10, 5, 1 ];

    for (let i = 0; i < romanNumbers.length; i++ ) {
      if (romanNumbers[i] === numeral) {
        return realNumbers[i];
      }
    }

    return 0;
  };

  /**
   * Ensure the passed number to convert is valid
   * @param value 
   */
  async isValid(value:string): Promise<ValidCheckResult> {
    let result = new ValidCheckResult(true, '');

    // this checks for bad characters, order rules, and not having more than 3 consecutive repeats
    // source: google
    let validRoman = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

    if (!value) {
      result.isValid = false;
      result.errorString = 'ERROR - blank param';
    } else {
      let val = value.toUpperCase();
      let isValid = validRoman.test(val);
      if (!isValid) {
        result.isValid = false;
        result.errorString = 'ERROR - invalid roman numeral';
      }
    }

    return result;
  }

  /**
   * Convert roman numeral value to number
   * @param value 
   */
  async answer(value: string = null): Promise<string> {
    this.logger.info(`Generating number from Roman numeral ${value}`);

    // first check if we have a valid number
    let validCheckResult = await this.isValid(value);
    if (!validCheckResult.isValid) {
      return validCheckResult.errorString;
    }

    let val = value.toUpperCase();
    let total = 0;      // running total
    let subtotal = 0;   // adds number of used to add up parts

    let idx = 0;
    while (idx < val.length) {
      if (idx + 1 === val.length) {
        // check if on the last char
        total = total + (await this.getNumber(val[idx]));
      } else if (val[idx] === val[idx+1]) {
        // if next char is the same, keep a subtotal until different
        // (e.g. XX, X = X, so just save off this subtotal and keep going)
        subtotal = subtotal + (await this.getNumber(val[idx]));
      } else if (await this.greaterThan(val[idx+1], val[idx])) {
        // if next char is greater, then we subtract subtotal from the next number 
        // (e.g IX, X > I, so 10 - 1)
        subtotal = subtotal + (await this.getNumber(val[idx]));
        total = total + (await this.getNumber(val[idx+1])) - subtotal;
        subtotal = 0;
        // increment pointer past next char
        idx++;
      } else {
        // if next char is less, then we increment subtotal and add to total
        // (e.g. XI, I < X, so 10 + 1)
        subtotal = subtotal + (await this.getNumber(val[idx]));
        total = total + subtotal;
        subtotal = 0;
      }
      idx++;
    }

    total = total + subtotal;
    return total.toString(); 
  }
}
