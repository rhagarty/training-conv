import {ContainerConfiguration, Scope} from 'typescript-ioc';
import {ConvertToNumberApi} from './convert-to-number.api';
import {ConvertToNumberService} from './convert-to-number.service';
import {ConvertToRomanApi} from './convert-to-roman.api';
import {ConvertToRomanService} from './convert-to-roman.service';

const config: ContainerConfiguration[] = [
  {
    bind: ConvertToNumberApi,
    to: ConvertToNumberService,
    scope: Scope.Singleton
  },
  {
    bind: ConvertToRomanApi,
    to: ConvertToRomanService,
    scope: Scope.Singleton
  }
];

export default config;