import { Container } from "typescript-ioc";

export * from './hello-world.api';
export * from './hello-world.service';
export * from './convert-to-number.api';
export * from './convert-to-number.service';
export * from './convert-to-roman.api';
export * from './convert-to-roman.service';

import config from './ioc.config';

Container.configure(...config);