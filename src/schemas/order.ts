export interface OrderItem {
  item_id: number;
  item_name: string;
  item_sku: string;
  model_id: number;
  model_name: string;
  model_sku: string;
  model_quantity_purchased: number;
  model_original_price: number;
  model_discounted_price: number;
  wholesale: boolean;
  weight: number;
  add_on_deal: boolean;
  main_item: boolean;
  add_on_deal_id: number;
  promotion_type: string;
  promotion_id: number;
  order_item_id: number;
  promotion_group_id: number;
  image_info: {
    image_url: string;
  };
  product_location_id: string[];
  is_prescription_item: boolean;
  is_b2c_owned_item: boolean;
}

export interface PackageItem {
  item_id: number;
  model_id: number;
  model_quantity: number;
  order_item_id: number;
  product_location_id: string;
  promotion_group_id: number;
}

export interface Package {
  package_number: string;
  logistics_status: string;
  logistics_channel_id: number;
  shipping_carrier: string;
  allow_self_design_awb: boolean;
  item_list: PackageItem[];
  parcel_chargeable_weight_gram?: number;
  group_shipment_id?: number;
  virtual_contact_number?: string;
  package_query_number?: string;
}

export interface RecipientAddress {
  name: string;
  phone: string;
  town: string;
  district: string;
  city: string;
  state: string;
  region: string;
  zipcode: string;
  full_address: string;
}

export interface InvoiceData {
  number: string;
  series_number: string;
  access_key: string;
  issue_date: number;
  total_value: number;
  products_total_value: number;
  tax_code: string;
}

export interface Order {
  order_sn: string;
  region: string;
  currency: string;
  cod: boolean;
  total_amount: number;
  pending_terms: string[];
  order_status: string;
  shipping_carrier: string;
  payment_method: string;
  estimated_shipping_fee: number;
  message_to_seller: string;
  create_time: number;
  update_time: number;
  days_to_ship: number;
  ship_by_date: number;
  buyer_user_id: number;
  buyer_username: string;
  recipient_address: RecipientAddress;
  actual_shipping_fee: number;
  goods_to_declare: boolean;
  note: string;
  note_update_time: number;
  item_list: OrderItem[];
  pay_time: number;
  dropshipper?: string;
  dropshipper_phone?: string;
  split_up: boolean;
  buyer_cancel_reason: string;
  cancel_by: string;
  cancel_reason: string;
  actual_shipping_fee_confirmed: boolean;
  buyer_cpf_id?: string;
  fulfillment_flag: string;
  pickup_done_time: number;
  package_list: Package[];
  checkout_shipping_carrier: string;
  reverse_shipping_fee: number;
  order_chargeable_weight_gram: number;
  prescription_images?: string[];
  prescription_check_status?: number;
  edt_from?: number;
  edt_to?: number;
  booking_sn?: string;
  advance_package?: boolean;
  return_request_due_date?: number;
  invoice_data?: InvoiceData;
}

export interface GetOrderListParams {
  timeRangeField: string;
  timeFrom: number;
  timeTo: number;
  pageSize: number;
  cursor?: string;
} 