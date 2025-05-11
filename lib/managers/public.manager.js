import { ShopeeFetch } from "../fetch.js";
import { BaseManager } from "./base.manager.js";
export class PublicManager extends BaseManager {
    constructor(config) {
        super(config);
    }
    async getShopsByPartner(params) {
        const response = await ShopeeFetch.fetch(this.config, "/public/get_shops_by_partner", {
            method: "GET",
            params: {
                partner_id: this.config.partner_id,
                ...params,
            },
        });
        return response;
    }
    async getMerchantsByPartner(params) {
        const response = await ShopeeFetch.fetch(this.config, "/public/get_merchants_by_partner", {
            method: "GET",
            params: {
                partner_id: this.config.partner_id,
                ...params,
            },
        });
        return response;
    }
    async getShopeeIpRange() {
        const response = await ShopeeFetch.fetch(this.config, "/public/get_shopee_ip_ranges", {
            method: "GET",
        });
        return response;
    }
}
//# sourceMappingURL=public.manager.js.map