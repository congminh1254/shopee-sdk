import { ShopeeConfig } from "../sdk.js";
import { BaseManager } from "./base.manager.js";
import { GetTrackingInfoParams, GetTrackingInfoResponse, GetChannelListResponse, GetShippingParameterParams, GetShippingParameterResponse, GetTrackingNumberParams, GetTrackingNumberResponse, ShipOrderParams, ShipOrderResponse, GetAddressListResponse, BatchShipOrderParams, BatchShipOrderResponse, MassShipOrderParams, MassShipOrderResponse, ShipBookingParams, ShipBookingResponse, GetBookingShippingParameterParams, GetBookingShippingParameterResponse, GetBookingTrackingInfoParams, GetBookingTrackingInfoResponse, GetBookingTrackingNumberParams, GetBookingTrackingNumberResponse, GetMassShippingParameterParams, GetMassShippingParameterResponse, GetMassTrackingNumberParams, GetMassTrackingNumberResponse, SetAddressConfigParams, SetAddressConfigResponse, DeleteAddressParams, DeleteAddressResponse, CreateShippingDocumentParams, CreateShippingDocumentResponse, DownloadShippingDocumentParams, DownloadShippingDocumentResponse, GetShippingDocumentParameterParams, GetShippingDocumentParameterResponse, GetShippingDocumentResultParams, GetShippingDocumentResultResponse, GetShippingDocumentDataInfoParams, GetShippingDocumentDataInfoResponse, CreateBookingShippingDocumentParams, CreateBookingShippingDocumentResponse, DownloadBookingShippingDocumentParams, DownloadBookingShippingDocumentResponse, GetBookingShippingDocumentParameterParams, GetBookingShippingDocumentParameterResponse, GetBookingShippingDocumentResultParams, GetBookingShippingDocumentResultResponse, GetBookingShippingDocumentDataInfoParams, GetBookingShippingDocumentDataInfoResponse, CreateShippingDocumentJobParams, CreateShippingDocumentJobResponse, DownloadShippingDocumentJobParams, DownloadShippingDocumentJobResponse, GetShippingDocumentJobStatusParams, GetShippingDocumentJobStatusResponse, DownloadToLabelParams, DownloadToLabelResponse, UpdateChannelParams, UpdateChannelResponse, UpdateShippingOrderParams, UpdateShippingOrderResponse, UpdateTrackingStatusParams, UpdateTrackingStatusResponse, UpdateSelfCollectionOrderLogisticsParams, UpdateSelfCollectionOrderLogisticsResponse, GetOperatingHoursParams, GetOperatingHoursResponse, UpdateOperatingHoursParams, UpdateOperatingHoursResponse, GetOperatingHourRestrictionsParams, GetOperatingHourRestrictionsResponse, DeleteSpecialOperatingHourParams, DeleteSpecialOperatingHourResponse, GetMartPackagingInfoParams, GetMartPackagingInfoResponse, SetMartPackagingInfoParams, SetMartPackagingInfoResponse, BatchUpdateTPFWarehouseTrackingStatusParams, BatchUpdateTPFWarehouseTrackingStatusResponse } from "../schemas/logistics.js";
export declare class LogisticsManager extends BaseManager {
    constructor(config: ShopeeConfig);
    /**
     * Use this API to get all supported logistic channels.
     *
     * @returns A promise that resolves to the channel list response containing:
     * - logistics_channel_list: Array of available logistics channels with:
     *   - logistics_channel_id: Channel identifier
     *   - logistics_channel_name: Channel name
     *   - enabled: Whether channel is enabled
     *   - cod_enabled: Whether COD is supported
     *   - fee_type: Fee calculation type
     *   - weight_limit: Weight restrictions
     *   - item_max_dimension: Size restrictions
     *   - and more channel details
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_auth: Invalid access_token
     * - error_permission: No permission
     * - error_server: System error
     */
    getChannelList(): Promise<GetChannelListResponse>;
    /**
     * Use this API to get the parameters required for initializing logistics for an order.
     * This is also known as getParameterForInit in the documentation.
     *
     * @param params - Parameters for getting shipping information
     * @param params.order_sn - Shopee's unique identifier for an order
     * @param params.package_number - Shopee's unique identifier for the package under an order (optional)
     *
     * @returns A promise that resolves to the shipping parameter response containing:
     * - info_needed: Required parameters based on the specific order
     * - dropoff: Logistics information for dropoff mode (if applicable)
     * - pickup: Logistics information for pickup mode (if applicable)
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_auth: Invalid access_token
     * - error_param: Wrong parameters
     * - error_permission: No permission
     * - error_server: System error
     */
    getShippingParameter(params: GetShippingParameterParams): Promise<GetShippingParameterResponse>;
    /**
     * Use this API to get the tracking number of a shipped order.
     *
     * @param params - Parameters for getting tracking number
     * @param params.order_sn - Shopee's unique identifier for an order
     * @param params.package_number - Shopee's unique identifier for the package under an order (optional)
     * @param params.response_optional_fields - Optional fields to include in response (optional)
     *
     * @returns A promise that resolves to the tracking number response containing:
     * - tracking_number: The tracking number of the order
     * - plp_number: Package identifier for BR correios (optional)
     * - first_mile_tracking_number: First mile tracking (Cross Border only)
     * - last_mile_tracking_number: Last mile tracking (Cross Border BR only)
     * - hint: Hint information for special scenarios
     * - pickup_code: Quick identification code (ID local orders only)
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_auth: Invalid access_token
     * - error_param: Wrong parameters
     * - error_permission: No permission
     * - error_server: System error
     */
    getTrackingNumber(params: GetTrackingNumberParams): Promise<GetTrackingNumberResponse>;
    /**
     * Use this API to initiate logistics including arranging pickup, dropoff or shipment for non-integrated channels.
     * This is also known as "Init" in the Shopee API documentation.
     *
     * @param params - Parameters for shipping an order
     * @param params.order_sn - Shopee's unique identifier for an order
     * @param params.package_number - Shopee's unique identifier for the package under an order (optional)
     * @param params.pickup - Pickup information (required if get_shipping_parameter returns "pickup")
     * @param params.dropoff - Dropoff information (required if get_shipping_parameter returns "dropoff")
     * @param params.non_integrated - Non-integrated channel information (optional)
     *
     * @returns A promise that resolves to the ship order response
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_auth: Invalid access_token
     * - error_param: Wrong parameters
     * - error_permission: No permission
     * - error_server: System error
     *
     * @example
     * ```typescript
     * // For pickup mode
     * await sdk.logistics.shipOrder({
     *   order_sn: 'ORDER123',
     *   pickup: {
     *     address_id: 234,
     *     pickup_time_id: 'slot_123',
     *   },
     * });
     *
     * // For dropoff mode
     * await sdk.logistics.shipOrder({
     *   order_sn: 'ORDER456',
     *   dropoff: {
     *     branch_id: 101,
     *   },
     * });
     * ```
     */
    shipOrder(params: ShipOrderParams): Promise<ShipOrderResponse>;
    /**
     * Use this API to get the address list of the shop.
     *
     * @returns A promise that resolves to the address list response containing:
     * - show_pickup_address: Whether to show pickup address
     * - address_list: Array of shop addresses with full details
     *
     * @throws {Error} When the API request fails or returns an error:
     * - error_auth: Invalid access_token
     * - error_permission: No permission
     * - error_server: System error
     *
     * @example
     * ```typescript
     * const response = await sdk.logistics.getAddressList();
     * response.address_list.forEach((addr) => {
     *   console.log('Address ID:', addr.address_id);
     *   console.log('Address:', addr.full_address);
     *   console.log('Flags:', addr.address_flag);
     * });
     * ```
     */
    getAddressList(): Promise<GetAddressListResponse>;
    /**
     * Use this API to get the logistics tracking information of an order.
     *
     * @param params - Parameters for getting tracking information
     * @param params.order_sn - Shopee's unique identifier for an order
     * @param params.package_number - Shopee's unique identifier for the package under an order
     *
     * @returns A promise that resolves to the tracking info response containing:
     * - order_sn: Order identifier
     * - package_number: Package identifier
     * - logistics_status: Current logistics status
     * - tracking_info: Array of tracking events with:
     *   - update_time: Time of status update
     *   - description: Description of the tracking event
     *   - logistics_status: Status code for the event
     *
     * @throws {Error} When the API request fails or returns an error:
     * - logistics.error_param: Order allocation in progress
     * - error_not_found: Wrong parameters
     * - error_permission: No permission
     * - error_server: System error
     * - logistics.invalid_error: Order does not exist
     * - logistics.error_status_limit: Invalid order status
     * - logistics.package_not_exist: Package does not exist
     * - logistics.package_number_not_exist: Package number required for split order
     */
    getTrackingInfo(params: GetTrackingInfoParams): Promise<GetTrackingInfoResponse>;
    /**
     * Use this API to batch initiate logistics for multiple orders.
     */
    batchShipOrder(params: BatchShipOrderParams): Promise<BatchShipOrderResponse>;
    /**
     * Use this API to mass ship orders.
     */
    massShipOrder(params: MassShipOrderParams): Promise<MassShipOrderResponse>;
    /**
     * Use this API to initiate logistics for a booking.
     */
    shipBooking(params: ShipBookingParams): Promise<ShipBookingResponse>;
    /**
     * Use this API to get shipping parameters for a booking.
     */
    getBookingShippingParameter(params: GetBookingShippingParameterParams): Promise<GetBookingShippingParameterResponse>;
    /**
     * Use this API to get tracking info for a booking.
     */
    getBookingTrackingInfo(params: GetBookingTrackingInfoParams): Promise<GetBookingTrackingInfoResponse>;
    /**
     * Use this API to get tracking number for a booking.
     */
    getBookingTrackingNumber(params: GetBookingTrackingNumberParams): Promise<GetBookingTrackingNumberResponse>;
    /**
     * Use this API to get mass shipping parameters.
     */
    getMassShippingParameter(params: GetMassShippingParameterParams): Promise<GetMassShippingParameterResponse>;
    /**
     * Use this API to get mass tracking numbers.
     */
    getMassTrackingNumber(params: GetMassTrackingNumberParams): Promise<GetMassTrackingNumberResponse>;
    /**
     * Use this API to set address configuration.
     */
    setAddressConfig(params: SetAddressConfigParams): Promise<SetAddressConfigResponse>;
    /**
     * Use this API to delete an address.
     */
    deleteAddress(params: DeleteAddressParams): Promise<DeleteAddressResponse>;
    /**
     * Use this API to create shipping document.
     */
    createShippingDocument(params: CreateShippingDocumentParams): Promise<CreateShippingDocumentResponse>;
    /**
     * Use this API to download shipping document.
     */
    downloadShippingDocument(params: DownloadShippingDocumentParams): Promise<DownloadShippingDocumentResponse>;
    /**
     * Use this API to get shipping document parameters.
     */
    getShippingDocumentParameter(params: GetShippingDocumentParameterParams): Promise<GetShippingDocumentParameterResponse>;
    /**
     * Use this API to get shipping document result.
     */
    getShippingDocumentResult(params: GetShippingDocumentResultParams): Promise<GetShippingDocumentResultResponse>;
    /**
     * Use this API to get shipping document data info.
     */
    getShippingDocumentDataInfo(params: GetShippingDocumentDataInfoParams): Promise<GetShippingDocumentDataInfoResponse>;
    /**
     * Use this API to create booking shipping document.
     */
    createBookingShippingDocument(params: CreateBookingShippingDocumentParams): Promise<CreateBookingShippingDocumentResponse>;
    /**
     * Use this API to download booking shipping document.
     */
    downloadBookingShippingDocument(params: DownloadBookingShippingDocumentParams): Promise<DownloadBookingShippingDocumentResponse>;
    /**
     * Use this API to get booking shipping document parameters.
     */
    getBookingShippingDocumentParameter(params: GetBookingShippingDocumentParameterParams): Promise<GetBookingShippingDocumentParameterResponse>;
    /**
     * Use this API to get booking shipping document result.
     */
    getBookingShippingDocumentResult(params: GetBookingShippingDocumentResultParams): Promise<GetBookingShippingDocumentResultResponse>;
    /**
     * Use this API to get booking shipping document data info.
     */
    getBookingShippingDocumentDataInfo(params: GetBookingShippingDocumentDataInfoParams): Promise<GetBookingShippingDocumentDataInfoResponse>;
    /**
     * Use this API to create shipping document job.
     */
    createShippingDocumentJob(params: CreateShippingDocumentJobParams): Promise<CreateShippingDocumentJobResponse>;
    /**
     * Use this API to download shipping document job.
     */
    downloadShippingDocumentJob(params: DownloadShippingDocumentJobParams): Promise<DownloadShippingDocumentJobResponse>;
    /**
     * Use this API to get shipping document job status.
     */
    getShippingDocumentJobStatus(params: GetShippingDocumentJobStatusParams): Promise<GetShippingDocumentJobStatusResponse>;
    /**
     * Use this API to download shipping label.
     */
    downloadToLabel(params: DownloadToLabelParams): Promise<DownloadToLabelResponse>;
    /**
     * Use this API to update logistics channel configuration.
     */
    updateChannel(params: UpdateChannelParams): Promise<UpdateChannelResponse>;
    /**
     * Use this API to update shipping order.
     */
    updateShippingOrder(params: UpdateShippingOrderParams): Promise<UpdateShippingOrderResponse>;
    /**
     * Use this API to update tracking status.
     */
    updateTrackingStatus(params: UpdateTrackingStatusParams): Promise<UpdateTrackingStatusResponse>;
    /**
     * Use this API to update self collection order logistics.
     */
    updateSelfCollectionOrderLogistics(params: UpdateSelfCollectionOrderLogisticsParams): Promise<UpdateSelfCollectionOrderLogisticsResponse>;
    /**
     * Use this API to get operating hours.
     */
    getOperatingHours(params: GetOperatingHoursParams): Promise<GetOperatingHoursResponse>;
    /**
     * Use this API to update operating hours.
     */
    updateOperatingHours(params: UpdateOperatingHoursParams): Promise<UpdateOperatingHoursResponse>;
    /**
     * Use this API to get operating hour restrictions.
     */
    getOperatingHourRestrictions(params: GetOperatingHourRestrictionsParams): Promise<GetOperatingHourRestrictionsResponse>;
    /**
     * Use this API to delete special operating hour.
     */
    deleteSpecialOperatingHour(params: DeleteSpecialOperatingHourParams): Promise<DeleteSpecialOperatingHourResponse>;
    /**
     * Use this API to get mart packaging info.
     */
    getMartPackagingInfo(params: GetMartPackagingInfoParams): Promise<GetMartPackagingInfoResponse>;
    /**
     * Use this API to set mart packaging info.
     */
    setMartPackagingInfo(params: SetMartPackagingInfoParams): Promise<SetMartPackagingInfoResponse>;
    /**
     * Use this API to batch update TPF warehouse tracking status.
     */
    batchUpdateTPFWarehouseTrackingStatus(params: BatchUpdateTPFWarehouseTrackingStatusParams): Promise<BatchUpdateTPFWarehouseTrackingStatusResponse>;
}
