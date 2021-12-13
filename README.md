# TypeScript Microservice or Backend for Frontend with Node.js

Built using Cloud Native Starter Kit Template - specifically the template for TypeScript node.js services.

## Service API

`https://host/to-roman?value=<number>`
`https://host/to-number?value=<roman-numeral>`

For example:
`https://host/to-roman?value=21`
`https://host/to-number?value=XVI>`

## Key files

I divided my service into 2 classes:

* `ConvertToNumberService`
* `ConvertToRomanService`

Which are represented in the following files:

`/src/controllers`

* `calculator-to-number-controller.ts`
* `calculator-to-roman-controller.ts`

`/src/services`

* `calculator-to-number-service.ts`
* `calculator-to-roman-service.ts`

## Jest unit tests

Tests are all located in:

* `/test/controllers`
* `/test/services`

## GitHub repos and OpenShift projects

* Conversion service - https://github.com/rhagarty/training-conv
* Conversion service project - `training-rhagarty-conv`
* Calculator service - https://github.com/rhagarty/training-calc
* Calculator service project - `training-rhagarty-calc`

## License

This sample application is licensed under the Apache License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1](https://developercertificate.org/) and the [Apache License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache License FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)



