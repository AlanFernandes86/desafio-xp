/* eslint-disable class-methods-use-this */
import { ValueTransformer } from 'typeorm';

class StringToDecimal implements ValueTransformer {
  to(value: number): string {
    return value.toString();
  }

  from(value: string): number {
    return Number.parseFloat(value);
  }
}

export default StringToDecimal;
