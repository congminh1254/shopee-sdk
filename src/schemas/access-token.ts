export interface AccessToken {
  refresh_token: string;
  access_token: string;
  expire_in: number;
  request_id: string;
  error: string;
  message: string;
  shop_id?: number;
  merchant_id_list?: number[];
  shop_id_list?: number[];
  supplier_id_list?: number[];
}

export interface RefreshedAccessToken extends Omit<AccessToken, 'merchant_id_list' | 'shop_id_list' | 'supplier_id_list'> {
  partner_id: number;
  shop_id?: number;
  merchant_id?: number;
}

export interface TokenByResendCode {
  request_id: string;
  error: string;
  message: string;
  shop_id_list?: number[];
  merchant_id_list?: number[];
  refresh_token: string;
  access_token: string;
  expire_in: number;
} 