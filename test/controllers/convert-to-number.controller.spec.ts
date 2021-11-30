import {Application} from 'express';
import {default as request} from 'supertest';
import {Container, Scope} from 'typescript-ioc';

import {ConvertToNumberApi} from '../../src/services';
import {buildApiServer} from '../helper';

class MockConvertToNumberService implements ConvertToNumberApi {
  answer = jest.fn().mockName('meeting');
}

describe('convert-to-number.controller', () => {

  let app: Application;
  let mockAnswer: jest.Mock;

  beforeEach(() => {
    const apiServer = buildApiServer();

    app = apiServer.getApp();

    Container.bind(ConvertToNumberApi).scope(Scope.Singleton).to(MockConvertToNumberService);

    const mockService: ConvertToNumberApi = Container.get(ConvertToNumberApi);
    mockAnswer = mockService.answer as jest.Mock;
  });

  test('canary validates test infrastructure', () => {
    expect(true).toBe(true);
  });

  describe('Given /to-number?value=I', () => {
    const expectedResponse = '1';

    beforeEach(() => {
      mockAnswer.mockReturnValueOnce(Promise.resolve(expectedResponse));
    });

    test('should return "1"', done => {
      request(app).get('/to-number?value=I').expect(200).expect(expectedResponse, done);
    });
  });

  describe('Given /to-number?value=II', () => {
    const expectedResponse = '2';

    beforeEach(() => {
      mockAnswer.mockReturnValueOnce(Promise.resolve(expectedResponse));
    });

    test('should return "2"', done => {
      request(app).get('/to-number?value=II').expect(200).expect(expectedResponse, done);
    });
  });
});
