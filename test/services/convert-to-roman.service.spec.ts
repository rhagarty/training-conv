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

  describe('Given answer()', () => {
    context('when "3" provided', () => {
      const value = '3';
      test('then return "III"', async () => {
        expect(await service.answer(value)).toEqual('III');
      });
    });

    context('when "4" provided', () => {
      const value = '4';
      test('then return "IV"', async () => {
        expect(await service.answer(value)).toEqual('IV');
      });
    });

    context('when "5" provided', () => {
      const value = '5';
      test('then return "V"', async () => {
        expect(await service.answer(value)).toEqual('V');
      });
    });

    context('when "8" provided', () => {
      const value = '8';
      test('then return "VIII"', async () => {
        expect(await service.answer(value)).toEqual('VIII');
      });
    });

    context('when "9" provided', () => {
      const value = '9';
      test('then return "IX"', async () => {
        expect(await service.answer(value)).toEqual('IX');
      });
    });

    context('when "10" provided', () => {
      const value = '10';
      test('then return "X"', async () => {
        expect(await service.answer(value)).toEqual('X');
      });
    });

    context('when "13" provided', () => {
      const value = '13';
      test('then return "XIII"', async () => {
        expect(await service.answer(value)).toEqual('XIII');
      });
    });

    context('when "14" provided', () => {
      const value = '14';
      test('then return "XIV"', async () => {
        expect(await service.answer(value)).toEqual('XIV');
      });
    });

    context('when "15" provided', () => {
      const value = '15';
      test('then return "XV"', async () => {
        expect(await service.answer(value)).toEqual('XV');
      });
    });

    context('when "18" provided', () => {
      const value = '18';
      test('then return "XVIII"', async () => {
        expect(await service.answer(value)).toEqual('XVIII');
      });
    });

    context('when "19" provided', () => {
      const value = '19';
      test('then return "XIX"', async () => {
        expect(await service.answer(value)).toEqual('XIX');
      });
    });

    context('when "23" provided', () => {
      const value = '23';
      test('then return "XXIII"', async () => {
        expect(await service.answer(value)).toEqual('XXIII');
      });
    });

    context('when "24" provided', () => {
      const value = '24';
      test('then return "XXIV"', async () => {
        expect(await service.answer(value)).toEqual('XXIV');
      });
    });

    context('when "28" provided', () => {
      const value = '28';
      test('then return "XXVIII"', async () => {
        expect(await service.answer(value)).toEqual('XXVIII');
      });
    });

    context('when "29" provided', () => {
      const value = '29';
      test('then return "XXIX"', async () => {
        expect(await service.answer(value)).toEqual('XXIX');
      });
    });

    context('when "33" provided', () => {
      const value = '33';
      test('then return "XXXIII"', async () => {
        expect(await service.answer(value)).toEqual('XXXIII');
      });
    });

    context('when "38" provided', () => {
      const value = '38';
      test('then return "XXXVIII"', async () => {
        expect(await service.answer(value)).toEqual('XXXVIII');
      });
    });

    context('when "43" provided', () => {
      const value = '43';
      test('then return "XLIII"', async () => {
        expect(await service.answer(value)).toEqual('XLIII');
      });
    });

    context('when "3274" provided', () => {
      const value = '3274';
      test('then return "MMMCCLXXIV"', async () => {
        expect(await service.answer(value)).toEqual('MMMCCLXXIV');
      });
    });

    context('when "4000" provided', () => {
      const value = '4000';
      test('then return "ERROR - number must be < 4000"', async () => {
        expect(await service.answer(value)).toEqual('ERROR - number must be < 4000');
      });
    });

  });
});
