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

  describe('Given answer()', () => {
    context('when "I" provided', () => {
      const value = 'I';
      test('then return "1"', async () => {
        expect(await service.answer(value)).toEqual('1');
      });
    });

    context('when "II" provided', () => {
      const value = 'II';
      test('then return "2"', async () => {
        expect(await service.answer(value)).toEqual('2');
      });
    });

    context('when "III" provided', () => {
      const value = 'III';
      test('then return "3"', async () => {
        expect(await service.answer(value)).toEqual('3');
      });
    });

    context('when "V" provided', () => {
      const value = 'V';
      test('then return "5"', async () => {
        expect(await service.answer(value)).toEqual('5');
      });
    });

    context('when "X" provided', () => {
      const value = 'X';
      test('then return "10"', async () => {
        expect(await service.answer(value)).toEqual('10');
      });
    });

    context('when "IX" provided', () => {
      const value = 'IX';
      test('then return "9"', async () => {
        expect(await service.answer(value)).toEqual('9');
      });
    });

    context('when "IIX" provided', () => {
      const value = 'IIX';
      test('then return "8"', async () => {
        expect(await service.answer(value)).toEqual('8');
      });
    });

    context('when "VIII" provided', () => {
      const value = 'VIII';
      test('then return "8"', async () => {
        expect(await service.answer(value)).toEqual('8');
      });
    });

    context('when "CD" provided', () => {
      const value = 'CD';
      test('then return "400"', async () => {
        expect(await service.answer(value)).toEqual('400');
      });
    });

    context('when "XXL" provided', () => {
      const value = 'XXL';
      test('then return "30"', async () => {
        expect(await service.answer(value)).toEqual('30');
      });
    });

    context('when "MMMCMXCIX" provided', () => {
      const value = 'MMMCMXCIX';
      test('then return "3999"', async () => {
        expect(await service.answer(value)).toEqual('3999');
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
