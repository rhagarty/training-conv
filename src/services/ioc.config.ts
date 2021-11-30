import {ContainerConfiguration, Scope} from 'typescript-ioc';
import {HelloWorldApi} from './hello-world.api';
import {HelloWorldService} from './hello-world.service';
import {ConvertToNumberApi} from './convert-to-number.api';
import {ConvertToNumberService} from './convert-to-number.service';
import {ConvertToRomanApi} from './convert-to-roman.api';
import {ConvertToRomanService} from './convert-to-roman.service';

const config: ContainerConfiguration[] = [
  {
    bind: HelloWorldApi,
    to: HelloWorldService,
    scope: Scope.Singleton
  },
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