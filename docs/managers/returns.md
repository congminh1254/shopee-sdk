# ReturnsManager

The ReturnsManager handles return and refund requests, including negotiations, disputes, and evidence management.

## Overview

The Returns module allows sellers to:
- View and manage return/refund requests
- Negotiate solutions with buyers
- Handle disputes and upload evidence
- Track return logistics
- Manage shipping proof for seller-arranged returns

## Quick Start

```typescript
import { ShopeeSDK } from '@congminh1254/shopee-sdk';

const sdk = new ShopeeSDK({
  partner_id: YOUR_PARTNER_ID,
  partner_key: 'YOUR_PARTNER_KEY',
  shop_id: YOUR_SHOP_ID,
  region: ShopeeRegion.SINGAPORE,
});

// Get list of returns
const returns = await sdk.returns.getReturnList({
  page_no: 1,
  page_size: 20,
  status: 'REQUESTED',
});

// Get details of a specific return
const returnDetail = await sdk.returns.getReturnDetail({
  return_sn: 'RETURN_SERIAL_NUMBER',
});

// Confirm a return
await sdk.returns.confirm({
  return_sn: 'RETURN_SERIAL_NUMBER',
});
```

## Methods

### getReturnList()

Get a paginated list of return/refund requests for your shop.

**Parameters:**
- `page_no` (number, required): Page number starting from 1
- `page_size` (number, required): Number of items per page (max 100)
- `create_time_from` (number, optional): Filter by creation timestamp (from)
- `create_time_to` (number, optional): Filter by creation timestamp (to)
- `update_time_from` (number, optional): Filter by update timestamp (from)
- `update_time_to` (number, optional): Filter by update timestamp (to)
- `status` (string, optional): Filter by return status (REQUESTED, PROCESSING, ACCEPTED, COMPLETED, CANCELLED)
- `negotiation_status` (string, optional): Filter by negotiation status
- `seller_proof_status` (string, optional): Filter by proof status
- `seller_compensation_status` (string, optional): Filter by compensation status

**Returns:** List of returns with pagination info

**Example:**
```typescript
const returns = await sdk.returns.getReturnList({
  page_no: 1,
  page_size: 50,
  create_time_from: Math.floor(Date.now() / 1000) - 86400 * 7, // Last 7 days
  create_time_to: Math.floor(Date.now() / 1000),
  status: 'REQUESTED',
});

console.log(`Found ${returns.response.return.length} returns`);
console.log(`More pages available: ${returns.response.more}`);
```

### getReturnDetail()

Get detailed information about a specific return request.

**Parameters:**
- `return_sn` (string, required): The return serial number

**Returns:** Complete return information including items, user info, negotiation status, etc.

**Example:**
```typescript
const detail = await sdk.returns.getReturnDetail({
  return_sn: '200203171852695',
});

console.log('Return Status:', detail.response.status);
console.log('Refund Amount:', detail.response.refund_amount);
console.log('Buyer:', detail.response.user.username);
console.log('Items:', detail.response.item.length);
```

### confirm()

Confirm and accept a return/refund request.

**Parameters:**
- `return_sn` (string, required): The return serial number

**Returns:** Confirmation response with return_sn

**Example:**
```typescript
const result = await sdk.returns.confirm({
  return_sn: '200203171852695',
});

console.log('Return confirmed:', result.response.return_sn);
```

### dispute()

Raise a dispute for a return request. Can be used when return_status is REQUESTED, PROCESSING, or ACCEPTED.

**Parameters:**
- `return_sn` (string, required): The return serial number
- `email` (string, required): Contact email
- `dispute_reason` (number, required): Dispute reason ID
- `dispute_text_reason` (string, optional): Additional text explanation
- `images` (string[], optional): Evidence image URLs

**Returns:** Dispute response with return_sn

**Example:**
```typescript
// First, get available dispute reasons
const reasons = await sdk.returns.getReturnDisputeReason({
  return_sn: '200203171852695',
});

// Then dispute with a reason
const result = await sdk.returns.dispute({
  return_sn: '200203171852695',
  email: 'seller@example.com',
  dispute_reason: reasons.response.dispute_reason[0].reason_id,
  dispute_text_reason: 'Product was not damaged when shipped',
  images: ['https://cf.shopee.sg/file/evidence.jpg'],
});
```

### offer()

Make a counter-offer during negotiation with the buyer.

**Parameters:**
- `return_sn` (string, required): The return serial number
- `solution` (number, required): Solution type (0: Return and Refund, 1: Refund Only)
- `refund_amount` (number, optional): Proposed refund amount

**Returns:** Offer response with return_sn

**Example:**
```typescript
// Check available solutions first
const solutions = await sdk.returns.getAvailableSolutions({
  return_sn: '200203171852695',
});

// Make an offer
const result = await sdk.returns.offer({
  return_sn: '200203171852695',
  solution: 0, // Return and Refund
  refund_amount: 50.00,
});
```

### acceptOffer()

Accept an offer made by the buyer during negotiation.

**Parameters:**
- `return_sn` (string, required): The return serial number

**Returns:** Accept offer response with return_sn

**Example:**
```typescript
const result = await sdk.returns.acceptOffer({
  return_sn: '200203171852695',
});

console.log('Offer accepted for:', result.response.return_sn);
```

### getAvailableSolutions()

Get the available return solutions that can be offered to buyers.

**Parameters:**
- `return_sn` (string, required): The return serial number

**Returns:** List of available solutions with maximum refund amounts

**Example:**
```typescript
const solutions = await sdk.returns.getAvailableSolutions({
  return_sn: '200203171852695',
});

solutions.response.solution.forEach(s => {
  console.log(`Solution ${s.solution}: Max refund ${s.max_refund_amount}`);
});
```

### cancelDispute()

Cancel a compensation dispute. Only applicable for compensation disputes (when return_status is ACCEPTED and compensation_status is COMPENSATION_REQUESTED).

**Parameters:**
- `return_sn` (string, required): The return serial number

**Returns:** Cancel dispute response with return_sn

**Example:**
```typescript
const result = await sdk.returns.cancelDispute({
  return_sn: '200203171852695',
});

console.log('Dispute cancelled for:', result.response.return_sn);
```

### getReturnDisputeReason()

Get the available dispute reasons for a return.

**Parameters:**
- `return_sn` (string, required): The return serial number

**Returns:** List of dispute reasons with IDs and text descriptions

**Example:**
```typescript
const reasons = await sdk.returns.getReturnDisputeReason({
  return_sn: '200203171852695',
});

console.log('Available dispute reasons:');
reasons.response.dispute_reason.forEach(r => {
  console.log(`- [${r.reason_id}] ${r.reason_text}`);
});
```

### convertImage()

Convert image files to URLs for use in evidence submission. Supports images within 10MB.

**Parameters:**
- `images` (array, required): Array of image objects with base64-encoded image data

**Returns:** Array of converted image URLs

**Example:**
```typescript
const result = await sdk.returns.convertImage({
  images: [
    { image: 'base64_encoded_image_data_here' },
  ],
});

const imageUrls = result.response.images.map(img => img.url);
console.log('Converted images:', imageUrls);
```

### uploadProof()

Upload evidence for a return, including text, images, and videos.

**Parameters:**
- `return_sn` (string, required): The return serial number
- `proof_text` (array, optional): Array of text evidence
- `proof_image` (array, optional): Array of image URLs
- `proof_video` (array, optional): Array of video URLs

**Returns:** Upload proof response with return_sn

**Example:**
```typescript
// First convert images if needed
const converted = await sdk.returns.convertImage({
  images: [{ image: 'base64_data' }],
});

// Then upload proof
const result = await sdk.returns.uploadProof({
  return_sn: '200203171852695',
  proof_text: [
    { text: 'Product was properly packaged and not damaged when shipped' },
  ],
  proof_image: [
    { url: converted.response.images[0].url },
  ],
});
```

### queryProof()

Query evidence that was previously uploaded for a return.

**Parameters:**
- `return_sn` (string, required): The return serial number

**Returns:** Uploaded proof including text, images, and videos

**Example:**
```typescript
const proof = await sdk.returns.queryProof({
  return_sn: '200203171852695',
});

if (proof.response.proof_text) {
  console.log('Text evidence:', proof.response.proof_text);
}
if (proof.response.proof_image) {
  console.log('Image evidence:', proof.response.proof_image);
}
```

### getShippingCarrier()

Get the list of shipping carriers for seller-arranged returns. Only for TW and BR regions with `is_seller_arrange = true`.

**Parameters:**
- `return_sn` (string, required): The return serial number

**Returns:** List of available carriers with required fields

**Example:**
```typescript
const carriers = await sdk.returns.getShippingCarrier({
  return_sn: '200203171852695',
});

carriers.response.carrier_list.forEach(carrier => {
  console.log(`Carrier: ${carrier.carrier_name}`);
  console.log('Required fields:', carrier.required_fields);
});
```

### uploadShippingProof()

Upload shipping proof for seller-arranged returns. Only for TW and BR regions with `is_seller_arrange = true`.

**Parameters:**
- `return_sn` (string, required): The return serial number
- `carrier_id` (number, required): Shipping carrier ID
- `tracking_number` (string, required): Tracking number
- Additional dynamic fields as required by the carrier

**Returns:** Upload shipping proof response with return_sn

**Example:**
```typescript
// First get carrier information
const carriers = await sdk.returns.getShippingCarrier({
  return_sn: '200203171852695',
});

// Upload shipping proof with required fields
const result = await sdk.returns.uploadShippingProof({
  return_sn: '200203171852695',
  carrier_id: carriers.response.carrier_list[0].carrier_id,
  tracking_number: 'TRACK123456',
  // Add any additional required fields here
});
```

## Use Cases

### Handling New Return Requests

```typescript
async function processNewReturns() {
  // Get returns that need attention
  const returns = await sdk.returns.getReturnList({
    page_no: 1,
    page_size: 50,
    status: 'REQUESTED',
  });

  for (const returnItem of returns.response.return) {
    // Get full details
    const detail = await sdk.returns.getReturnDetail({
      return_sn: returnItem.return_sn,
    });

    console.log(`Return ${detail.response.return_sn}:`);
    console.log(`- Reason: ${detail.response.reason}`);
    console.log(`- Amount: ${detail.response.refund_amount}`);
    console.log(`- Due date: ${new Date(detail.response.due_date * 1000)}`);

    // Decide whether to confirm or dispute
    if (shouldAutoApprove(detail)) {
      await sdk.returns.confirm({
        return_sn: detail.response.return_sn,
      });
      console.log('✓ Auto-approved');
    } else {
      console.log('⚠ Requires manual review');
    }
  }
}

function shouldAutoApprove(detail: any): boolean {
  // Your business logic here
  return detail.response.refund_amount < 20 && 
         detail.response.reason === 'NOT_RECEIPT';
}
```

### Disputing a Return with Evidence

```typescript
async function disputeReturnWithEvidence(returnSn: string) {
  // Get available dispute reasons
  const reasons = await sdk.returns.getReturnDisputeReason({
    return_sn: returnSn,
  });

  // Convert images to URLs
  const images = await sdk.returns.convertImage({
    images: [
      { image: readImageAsBase64('evidence1.jpg') },
      { image: readImageAsBase64('evidence2.jpg') },
    ],
  });

  const imageUrls = images.response.images.map(img => img.url);

  // Dispute the return
  await sdk.returns.dispute({
    return_sn: returnSn,
    email: 'disputes@myshop.com',
    dispute_reason: reasons.response.dispute_reason[0].reason_id,
    dispute_text_reason: 'Product was properly packaged with bubble wrap and tracking shows no damage during shipping',
    images: imageUrls,
  });

  // Upload additional proof
  await sdk.returns.uploadProof({
    return_sn: returnSn,
    proof_text: [
      { text: 'Shipping packaging checklist was followed' },
      { text: 'Product quality control passed before shipping' },
    ],
    proof_image: imageUrls.map(url => ({ url })),
  });

  console.log('Dispute submitted with evidence');
}
```

### Negotiating Return Solutions

```typescript
async function negotiateReturn(returnSn: string) {
  // Get return details
  const detail = await sdk.returns.getReturnDetail({
    return_sn: returnSn,
  });

  // Check if negotiation is possible
  if (detail.response.negotiation?.negotiation_status === 'PENDING_RESPOND') {
    // Get available solutions
    const solutions = await sdk.returns.getAvailableSolutions({
      return_sn: returnSn,
    });

    // Offer partial refund instead of full refund
    const partialRefund = detail.response.refund_amount * 0.7;

    if (partialRefund <= solutions.response.solution[0].max_refund_amount) {
      await sdk.returns.offer({
        return_sn: returnSn,
        solution: 1, // Refund only, no return needed
        refund_amount: partialRefund,
      });

      console.log(`Offered ${partialRefund} refund without return`);
    }
  }
}
```

### Managing Seller-Arranged Returns (TW/BR)

```typescript
async function handleSellerArrangedReturn(returnSn: string) {
  // Check if return requires seller arrangement
  const detail = await sdk.returns.getReturnDetail({
    return_sn: returnSn,
  });

  if (detail.response.is_seller_arrange) {
    // Get available shipping carriers
    const carriers = await sdk.returns.getShippingCarrier({
      return_sn: returnSn,
    });

    console.log('Available carriers:');
    carriers.response.carrier_list.forEach(carrier => {
      console.log(`- ${carrier.carrier_name} (ID: ${carrier.carrier_id})`);
      console.log(`  Required: ${carrier.required_fields.join(', ')}`);
    });

    // Arrange pickup and upload proof
    const trackingNumber = await arrangePickup(); // Your logistics integration

    await sdk.returns.uploadShippingProof({
      return_sn: returnSn,
      carrier_id: carriers.response.carrier_list[0].carrier_id,
      tracking_number: trackingNumber,
    });

    console.log('Shipping proof uploaded');
  }
}
```

## Best Practices

### 1. Monitor Return Deadlines

Always check `due_date`, `return_ship_due_date`, and `return_seller_due_date` fields and respond before they expire.

```typescript
const detail = await sdk.returns.getReturnDetail({ return_sn });
const dueDate = new Date(detail.response.due_date * 1000);
const hoursRemaining = (dueDate.getTime() - Date.now()) / (1000 * 60 * 60);

if (hoursRemaining < 24) {
  console.warn(`⚠ Less than 24 hours to respond!`);
}
```

### 2. Provide Complete Evidence

When disputing returns, always provide comprehensive evidence:
- Clear photos showing product condition
- Packaging documentation
- Quality control records
- Shipping proof

### 3. Handle Pagination Properly

When fetching return lists, always check the `more` flag:

```typescript
let pageNo = 1;
const allReturns = [];

while (true) {
  const result = await sdk.returns.getReturnList({
    page_no: pageNo,
    page_size: 100,
  });

  allReturns.push(...result.response.return);

  if (!result.response.more) break;
  pageNo++;
}
```

### 4. Use Filters Effectively

Narrow down returns using multiple filters to process them efficiently:

```typescript
const urgentReturns = await sdk.returns.getReturnList({
  page_no: 1,
  page_size: 50,
  status: 'REQUESTED',
  create_time_from: Math.floor(Date.now() / 1000) - 86400, // Last 24h
  seller_proof_status: 'PENDING',
});
```

### 5. Track Negotiation Status

Monitor negotiation status and respond appropriately:

```typescript
const detail = await sdk.returns.getReturnDetail({ return_sn });

switch (detail.response.negotiation?.negotiation_status) {
  case 'PENDING_RESPOND':
    // Your turn to respond
    console.log('Action needed: Respond to buyer offer');
    break;
  case 'ONGOING':
    // Waiting for buyer response
    console.log('Waiting for buyer response');
    break;
  case 'TERMINATED':
    // Negotiation ended
    console.log('Negotiation completed');
    break;
}
```

## Common Errors

### error_param
- **Cause:** Missing or invalid parameters
- **Solution:** Check all required fields and ensure correct data types

### error_perm
- **Cause:** No permission to perform action
- **Solution:** Verify shop authorization and return ownership

### error_data
- **Cause:** Return not found or invalid state
- **Solution:** Check return exists and is in valid state for the operation

### error_limit
- **Cause:** Rate limit exceeded
- **Solution:** Implement proper request throttling and retry logic

### error_auth
- **Cause:** Invalid access token
- **Solution:** Refresh access token using auth manager

## Return Status Flow

```
REQUESTED → PROCESSING → ACCEPTED → COMPLETED
    ↓
CANCELLED
```

**Status Descriptions:**
- `REQUESTED`: Return request initiated by buyer
- `PROCESSING`: Return being processed
- `ACCEPTED`: Return accepted, awaiting item return
- `COMPLETED`: Return completed and refund issued
- `CANCELLED`: Return cancelled

## Negotiation Flow

1. **Buyer initiates return** → Status: REQUESTED
2. **Seller can:**
   - Accept return (confirm)
   - Dispute return (dispute)
   - Make counter-offer (offer)
3. **Buyer responds:**
   - Accept offer (seller awaits)
   - Make counter-offer (seller can acceptOffer)
4. **Resolution:**
   - Agreement reached → Return processed
   - Shopee mediation → Follow platform decision

## Related

- [Order Manager](./order.md) - Handle order cancellations
- [Logistics Manager](./logistics.md) - Manage return shipping
- [Payment Manager](./payment.md) - Track refund transactions

## API Reference

For detailed API specifications, refer to:
- [Shopee Returns API Documentation](https://open.shopee.com/documents?module=102&type=1&id=608&version=2)
