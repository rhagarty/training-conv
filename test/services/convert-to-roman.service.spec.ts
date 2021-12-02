import {Container} from 'typescript-ioc';

import {ConvertToRomanService} from '../../src/services';
import {ApiServer} from '../../src/server';
import {buildApiServer} from '../helper';

describe('Convert to Number service', () =>{

  let app: ApiServer;
  let service: ConvertToRomanService;
  beforeAll(() => {
    app = buildApiServer();

    service = Container.get(ConvertToRomanService);
  });

  test('canary test verifies test infrastructure', () => {
    expect(service).not.toBeUndefined();
  });

  let cases = [
    ['3','III'],
    ['4','IV'],
    ['8','VIII'],
    ['9','IX'],
    ['10','X'],
    ['13','XIII'],
    ['19','XIX'],
    ['24','XXIV'],
    ['28','XXVIII'],
    ['33','XXXIII'],
    ['50','L'],
    ['78','LXXVIII'],
    ['99','XCIX'],
    ['100','C'],
    ['167','CLXVII'],
    ['333','CCCXXXIII'],
    ['511','DXI'],
    ['623','DCXXIII'],
    ['974','CMLXXIV'],
    ['1000','M'],
    ['1041','MXLI'],
    ['3274','MMMCCLXXIV'],
  ];

  describe('Given answer()', () => {
    cases.forEach(element => {
      context('when ' + element[0] + ' provided', () => {
        const value = element[0];
        test('then return ' + element[1], async () => {
          expect(await service.answer(value)).toEqual(element[1]);
        });
      });
    });

    context('when "4000" provided', () => {
      const value = '4000';
      test('then return "ERROR - number must be < 4000"', async () => {
        expect(await service.answer(value)).toEqual('ERROR - number must be < 4000');
      });
    });

    context('when "-6" provided', () => {
      const value = '-6';
      test('then return "ERROR - number must be positive"', async () => {
        expect(await service.answer(value)).toEqual('ERROR - number must be positive');
      });
    });

    context('when "0" provided', () => {
      const value = '0';
      test('then return "nulla"', async () => {
        expect(await service.answer(value)).toEqual('nulla');
      });
    });

  });
});
