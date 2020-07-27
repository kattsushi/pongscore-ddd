import { Injectable } from '@nestjs/common';
import { en, GenericClass, transformObjectToPath } from '@pongscore/api-interfaces';

@Injectable()
export class Translations extends GenericClass<typeof en>() {
  constructor() {
    super();
    Object.assign(this, transformObjectToPath('', en));
  }
}

