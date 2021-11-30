import {GET, Path, QueryParam, Errors } from 'typescript-rest';
import {Inject} from 'typescript-ioc';
import {ConvertToRomanApi} from '../services';
import {LoggerApi} from '../logger';

@Path('/to-roman')
export class ConvertToRomanController {

  @Inject
  service: ConvertToRomanApi;
  @Inject
  _baseLogger: LoggerApi;

  get logger() {
    return this._baseLogger.child('ConvertToRomanController');
  }

  @GET
  async convertToRoman(@QueryParam('value') value: string): Promise<string> {
    this.logger.info(`Trying to convert ${value}`);

    // return this.service.answer(value);
    let ret = this.service.answer(value);
    if ((await ret).startsWith('ERROR')) {
      throw new Errors.BadRequestError('ERROR: ' + ret);
    } else {
      return ret;
    }
  }

}
