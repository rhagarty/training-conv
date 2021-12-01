import {Container} from 'typescript-ioc';

import {ConvertToNumberService} from '../../src/services';
import {ApiServer} from '../../src/server';
import {buildApiServer} from '../helper';

describe('Convert to Number service', () =>{

  let app: ApiServer;
  let service: ConvertToNumberService;
  beforeAll(() => {
    app = buildApiServer();

    service = Container.get(ConvertToNumberService);
  });

  test('canary test verifies test infrastructure', () => {
    expect(service).not.toBeUndefined();
  });

  let cases = [
    ['III', '3'],
    ['IV', '4'],
    ['VIII', '8'],
    ['IX', '9'],
    ['X', '10'],
    ['XIII', '13'],
    ['XIX', '19'],
    ['XXIV', '24'],
    ['XXVIII', '28'],
    ['XXXIII', '33'],
    ['L', '50'],
    ['LXXVIII', '78'],
    ['xcix', '99'],
    ['C', '100'],
    ['CLXVII', '167'],
    ['DCXXIII', '623'],
    ['M', '1000'],
    ['MXLI', '1041'],
    ['MMMCCLXXIV', '3274'],
    ['MMMCMXCIX', '3999']
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

    context('when "MXCXI" provided', () => {
      const value = 'MXCXI';
      test('then return "ERROR - invalid roman numeral"', async () => {
        expect(await service.answer(value)).toEqual('ERROR - invalid roman numeral');
      });
    });

    context('when no value provided', () => {
      test('then return "ERROR - blank param"', async () => {
        expect(await service.answer()).toEqual('ERROR - blank param');
      });
    });

    context('when bad roman numeral provided', () => {
      const value = 'XIIII';
      test('then return "ERROR - invalid roman numeral"', async () => {
        expect(await service.answer(value)).toEqual('ERROR - invalid roman numeral');
      });
    });
  });
});
