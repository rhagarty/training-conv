import {ConvertToRomanApi} from './convert-to-roman.api';
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

export class ConvertToRomanService implements ConvertToRomanApi {
  logger: LoggerApi;
  constructor(
    @Inject
    logger: LoggerApi,
  ) {
    this.logger = logger.child('ConvertToRomanService');
  }

  /**
   * Generate string of repeating roman numerals
   * @param char 
   * @param count 
   */
  async repeatChar(char:string, count:number): Promise<string> {
    let value = '';
    for (let i = 0; i < count; i++) {
      value = value + char;
    }
    return value;
  };

  /**
   * Generate string that reduces the roman numeral
   * @param baseChar 
   * @param lowerChar 
   * @param count 
   */
  async reduceNumber(baseChar:string, lowerChar:string, count:number): Promise<string> {
    let repeatChars = (await this.repeatChar(lowerChar, count));
    return repeatChars + baseChar;
  };

  /**
   * Generate string that increases the roman numeral
   * @param baseChar 
   * @param higherChar 
   * @param count 
   */
  async increaseNumber(baseChar:string, higherChar:string, count:number): Promise<string> {
    let repeatChars = (await this.repeatChar(higherChar, count));
    return baseChar + repeatChars;
  };

  /**
   * Parse out each denomination from the number we are trying to convert
   * @param value
   * @param index 
   */
  async parseOutDenomination(value:string, index:number): Promise<number> {
    let result = 0;
    
    if (value.length >= index) {
      result = parseInt(value.slice(value.length - index, value.length - (index - 1)));
    }

    return result;
  }
      
  /**
   * Convert the single denomination value to its roman numeral equivalent
   * @param denomination 
   * @param baseRoman 
   * @param higherRoman 
   * @param highestRoman 
   */
  async convertDenomination(denomination:number, baseRoman:string, higherRoman:string, highestRoman: string): Promise<string> {
    let result = '';
    if (denomination) {
      if (denomination <= 3) {
        // simply repeat the baseRoman char up to 3 times
        result = (await this.repeatChar(baseRoman, denomination));
      } else if (denomination <= 5) {
        // jump to next roman char and reduce
        result = (await this.reduceNumber(higherRoman, baseRoman, (5 - denomination)));
      } else if (denomination <= 8) {
        // jump to next roman char and increase
        result = (await this.increaseNumber(higherRoman, baseRoman, (denomination - 5)));
      } else {
        // jump 2 levels up and reduce
        result = (await this.reduceNumber(highestRoman, baseRoman, (10 - denomination)));
      }
    }
    return result;
  }

  /**
   * Ensure the passed number to convert is valid
   * @param value 
   */
  async isValid(value:string): Promise<ValidCheckResult> {
    let result = new ValidCheckResult(true, '');

    if (!value) {
      result.isValid = false;
      result.errorString = 'ERROR - blank param';
    }

    let num = parseInt(value);

    if (num > 3999) {
      result.isValid = false;
      result.errorString = 'ERROR - number must be < 4000';
    }

    if (num < 0) {
      result.isValid = false;
      result.errorString = 'ERROR - number must be positive';
    }
    
    return result;
  }

  /**
   * Convert number value to roman numeral
   * @param value 
   */
  async answer(value: string = null): Promise<string> {
    this.logger.info(`Generating Roman numeral from number ${value}`);
    
    // first check if we have a valid number
    let validCheckResult = await this.isValid(value);
    if (!validCheckResult.isValid) {
      return validCheckResult.errorString;
    }
    
    // or is a special case
    let num = parseInt(value);
    if (num == 0) {
      return 'nulla';
    }

    // parse out denominations from the value
    let ones = await this.parseOutDenomination(value, 1);
    let tens = await this.parseOutDenomination(value, 2);
    let hundreds = await this.parseOutDenomination(value, 3);
    let thousands = await this.parseOutDenomination(value, 4);

    let result = '';

    // convert each denomination to a number
    result = await this.convertDenomination(ones, 'I', 'V', 'X');
    result = (await this.convertDenomination(tens, 'X', 'L', 'C')).concat(result);
    result = (await this.convertDenomination(hundreds, 'C', 'D', 'M')).concat(result);
    result = (await this.convertDenomination(thousands, 'M', '', '')).concat(result);

    return result;
  };
}
