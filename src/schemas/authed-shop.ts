export interface SipAffiliateShop {
  region: string;
  affi_shop_id: number;
}

export interface AuthedShop {
  region: string;
  shop_id: number;
  auth_time: number;
  expire_time: number;
  sip_affi_shops: SipAffiliateShop[];
}
