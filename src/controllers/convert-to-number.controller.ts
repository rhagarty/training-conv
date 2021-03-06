import {GET, Path, QueryParam, Errors } from 'typescript-rest';
import {Inject} from 'typescript-ioc';
import {ConvertToNumberApi} from '../services';
import {LoggerApi} from '../logger';

@Path('/to-number')
export class ConvertToNumberController {

  @Inject
  service: ConvertToNumberApi;
  @Inject
  _baseLogger: LoggerApi;

  get logger() {
    return this._baseLogger.child('ConvertToNumberController');
  }

  @GET
  async convertToNumber(@QueryParam('value') value: string): Promise<string> {
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
