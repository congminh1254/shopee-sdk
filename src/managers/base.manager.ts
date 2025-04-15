import { ShopeeConfig } from '../sdk.js';

export abstract class BaseManager {
  constructor(protected config: ShopeeConfig) {
    this.config = config;
  }
} 