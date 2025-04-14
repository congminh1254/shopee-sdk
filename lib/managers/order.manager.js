import { BaseManager } from './base.manager.js';
import { ShopeeFetch } from '../fetch.js';
export class OrderManager extends BaseManager {
    constructor(config) {
        super(config);
    }
    async getOrderList(params) {
        const response = await ShopeeFetch.fetch(this.config, '/order/get_order_list', {
            method: 'GET',
            params,
            auth: true,
        });
        return response;
    }
    async getOrdersDetail(params) {
        const response = await ShopeeFetch.fetch(this.config, `/order/get_order_detail`, {
            method: 'GET',
            auth: true,
            params: {
                ...params,
                order_sn_list: params.order_sn_list.join(','),
            },
        });
        return response;
    }
}
//# sourceMappingURL=order.manager.js.map