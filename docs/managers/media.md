# MediaManager

The MediaManager handles media upload operations including images and videos for the Shopee API.

## Overview

The MediaManager provides methods for:
- **Image Upload**: Upload images for various business scenarios (returns, product images, descriptions)
- **Video Upload**: Multi-part video upload with transcoding support
- **Upload Management**: Track upload status, cancel uploads

## Quick Start

```typescript
// Upload product images
const imageResult = await sdk.media.uploadImage({
  image: ['/path/to/image1.jpg', '/path/to/image2.jpg'],
  scene: 'normal',
  ratio: '1:1'
});

// Upload a video
const initResult = await sdk.media.initVideoUpload({
  file_md5: '2abf0b6e5ff90ff24437a0808f171a93',
  file_size: 1261876
});

// Check video status
const statusResult = await sdk.media.getVideoUploadResult({
  video_upload_id: initResult.response.video_upload_id
});
```

## Methods

### uploadMediaImage()

**API Documentation:** [v2.media.upload_image](https://open.shopee.com/documents/v2/v2.media.upload_image?module=130&type=1)

Upload images for specific business scenarios like returns.

```typescript
const result = await sdk.media.uploadMediaImage({
  business: 2, // Returns
  scene: 1, // Return Seller Self Arrange Pickup Proof
  images: ['/path/to/proof1.jpg', '/path/to/proof2.jpg']
});

console.log('Uploaded images:');
result.response.image_list.forEach(img => {
  console.log(`ID: ${img.image_id}, URL: ${img.image_url}`);
});
```

**Parameters:**
- `business` (required): Business type
  - `2` = Returns
- `scene` (required): Scene within business type
  - If business = 2: `1` = Return Seller Self Arrange Pickup Proof Image
- `images` (required): Image file(s) to upload (path, buffer, or array)

**Image Restrictions (business=2, scene=1):**
- Maximum: 3 images
- Maximum size: 10MB per image
- Formats: JPG, JPEG, PNG

**Use Cases:**
- Upload proof images for return self-pickup
- Document return processes

---

### uploadImage()

**API Documentation:** [v2.media_space.upload_image](https://open.shopee.com/documents/v2/v2.media_space.upload_image?module=91&type=1)

Upload multiple image files for general use (product images, descriptions).

```typescript
// Upload product images (with square processing)
const productImages = await sdk.media.uploadImage({
  image: ['/path/to/product1.jpg', '/path/to/product2.jpg'],
  scene: 'normal',
  ratio: '1:1'
});

// Upload description images (no processing)
const descImages = await sdk.media.uploadImage({
  image: '/path/to/description.jpg',
  scene: 'desc'
});

// Process results
productImages.response.image_info_list.forEach(info => {
  if (info.error) {
    console.error(`Image ${info.id} failed:`, info.message);
  } else {
    console.log(`Image ${info.id} ID:`, info.image_info.image_id);
    console.log('Regional URLs:', info.image_info.image_url_list);
  }
});
```

**Parameters:**
- `image` (required): Image file(s) to upload (path, buffer, or array)
- `scene` (optional): Processing scene
  - `"normal"` (default): Process as square image (recommended for item images)
  - `"desc"`: No processing (recommended for extended descriptions)
- `ratio` (optional): Image aspect ratio (whitelisted sellers only)
  - `"1:1"` (default): Square
  - `"3:4"`: Portrait

**Image Requirements:**
- Maximum: 9 images per request
- Maximum size: 10MB per image
- Formats: JPG, JPEG, PNG

**Response Structure:**
- `image_info_list`: Array of upload results
  - `id`: Index of the image
  - `error`: Error code if upload failed
  - `message`: Error details
  - `image_info`: Image data (if successful)
    - `image_id`: Unique image identifier
    - `image_url_list`: URLs for different regions

**Use Cases:**
- Upload product listing images
- Upload extended description images
- Batch upload multiple product images

---

### initVideoUpload()

**API Documentation:** [v2.media_space.init_video_upload](https://open.shopee.com/documents/v2/v2.media_space.init_video_upload?module=91&type=1)

Initiate a video upload session before uploading video parts.

```typescript
import crypto from 'crypto';
import fs from 'fs';

// Read video file and calculate MD5
const videoBuffer = fs.readFileSync('/path/to/video.mp4');
const fileMd5 = crypto.createHash('md5').update(videoBuffer).digest('hex');

const result = await sdk.media.initVideoUpload({
  file_md5: fileMd5,
  file_size: videoBuffer.length
});

const videoUploadId = result.response.video_upload_id;
console.log('Video upload session started:', videoUploadId);
```

**Parameters:**
- `file_md5` (required): MD5 hash of the entire video file
- `file_size` (required): Size of video file in bytes

**Video Requirements:**
- Duration: 10-60 seconds (inclusive)
- Maximum size: 30MB
- Must upload by parts after initialization

**Returns:**
- `video_upload_id`: Session identifier for subsequent operations

**Use Cases:**
- Start video upload process for product videos
- Initialize before uploading video parts

---

### uploadVideoPart()

**API Documentation:** [v2.media_space.upload_video_part](https://open.shopee.com/documents/v2/v2.media_space.upload_video_part?module=91&type=1)

Upload video file in parts (4MB chunks).

```typescript
import crypto from 'crypto';
import fs from 'fs';

const PART_SIZE = 4 * 1024 * 1024; // 4MB
const videoBuffer = fs.readFileSync('/path/to/video.mp4');

// Calculate number of parts
const partCount = Math.ceil(videoBuffer.length / PART_SIZE);

// Upload each part
for (let i = 0; i < partCount; i++) {
  const start = i * PART_SIZE;
  const end = Math.min(start + PART_SIZE, videoBuffer.length);
  const partBuffer = videoBuffer.slice(start, end);
  
  const partMd5 = crypto.createHash('md5').update(partBuffer).digest('hex');
  
  await sdk.media.uploadVideoPart({
    video_upload_id: videoUploadId,
    part_seq: i,
    content_md5: partMd5,
    part_content: partBuffer
  });
  
  console.log(`Uploaded part ${i + 1}/${partCount}`);
}
```

**Parameters:**
- `video_upload_id` (required): Session ID from initVideoUpload
- `part_seq` (required): Sequence number starting from 0
- `content_md5` (required): MD5 hash of this part
- `part_content` (required): Part data (buffer or file path)

**Part Requirements:**
- Part size: Exactly 4MB except for the last part
- Upload parts sequentially starting from 0
- Provide MD5 hash for each part

**Use Cases:**
- Upload large video files in chunks
- Resume upload on failure

---

### completeVideoUpload()

**API Documentation:** [v2.media_space.complete_video_upload](https://open.shopee.com/documents/v2/v2.media_space.complete_video_upload?module=91&type=1)

Complete the video upload and start transcoding process.

```typescript
const startTime = Date.now();

// ... upload all video parts ...

const uploadCost = Date.now() - startTime;

await sdk.media.completeVideoUpload({
  video_upload_id: videoUploadId,
  part_seq_list: [0, 1, 2, 3], // All uploaded part sequences
  report_data: {
    upload_cost: uploadCost // Upload time in milliseconds
  }
});

console.log('Video upload completed, transcoding started');
```

**Parameters:**
- `video_upload_id` (required): Session ID from initVideoUpload
- `part_seq_list` (required): Array of all uploaded part sequence numbers
- `report_data` (required): Performance tracking data
  - `upload_cost`: Total upload time in milliseconds

**Flow:**
1. Upload all parts via uploadVideoPart
2. Call completeVideoUpload with all part sequences
3. Transcoding begins automatically
4. Poll getVideoUploadResult to check status

**Use Cases:**
- Finalize video upload after all parts uploaded
- Trigger transcoding process

---

### getVideoUploadResult()

**API Documentation:** [v2.media_space.get_video_upload_result](https://open.shopee.com/documents/v2/v2.media_space.get_video_upload_result?module=91&type=1)

Query the upload status and result of a video upload.

```typescript
// Poll for transcoding completion
async function waitForTranscoding(videoUploadId: string) {
  let status = 'TRANSCODING';
  let attempts = 0;
  const maxAttempts = 60; // 5 minutes with 5-second intervals
  
  while (status === 'TRANSCODING' || status === 'INITIATED') {
    if (attempts >= maxAttempts) {
      throw new Error('Transcoding timeout');
    }
    
    const result = await sdk.media.getVideoUploadResult({
      video_upload_id: videoUploadId
    });
    
    status = result.response.status;
    
    if (status === 'SUCCEEDED') {
      console.log('Video ready!');
      console.log('Duration:', result.response.video_info.duration);
      console.log('Video URLs:', result.response.video_info.video_url_list);
      return result.response.video_info;
    } else if (status === 'FAILED') {
      throw new Error(`Transcoding failed: ${result.response.message}`);
    } else if (status === 'CANCELLED') {
      throw new Error('Upload was cancelled');
    }
    
    // Wait 5 seconds before next check
    await new Promise(resolve => setTimeout(resolve, 5000));
    attempts++;
  }
}

const videoInfo = await waitForTranscoding(videoUploadId);
```

**Parameters:**
- `video_upload_id` (required): Session ID from initVideoUpload

**Upload Status:**
- `INITIATED`: Waiting for parts or complete_video_upload call
- `TRANSCODING`: Transcoding in progress
- `SUCCEEDED`: Video ready to use
- `FAILED`: Upload/transcoding failed (check `message` field)
- `CANCELLED`: Upload was cancelled

**Response (when SUCCEEDED):**
- `status`: Upload status
- `video_info`: Transcoded video information
  - `video_url_list`: Video URLs for different regions
  - `thumbnail_url_list`: Thumbnail URLs for different regions
  - `duration`: Video duration in seconds
- `message`: Error message (if FAILED)

**Use Cases:**
- Check transcoding progress
- Get video URLs for product listing
- Handle upload failures

---

### cancelVideoUpload()

**API Documentation:** [v2.media_space.cancel_video_upload](https://open.shopee.com/documents/v2/v2.media_space.cancel_video_upload?module=91&type=1)

Cancel a video upload session.

```typescript
try {
  // Start upload
  const result = await sdk.media.initVideoUpload({
    file_md5: fileMd5,
    file_size: fileSize
  });
  
  const videoUploadId = result.response.video_upload_id;
  
  // ... upload some parts ...
  
  // Cancel on error or user request
  await sdk.media.cancelVideoUpload({
    video_upload_id: videoUploadId
  });
  
  console.log('Upload cancelled successfully');
} catch (error) {
  console.error('Failed to cancel:', error.message);
}
```

**Parameters:**
- `video_upload_id` (required): Session ID from initVideoUpload

**Use Cases:**
- Cancel upload on user request
- Cancel on upload timeout or error
- Free resources for failed uploads

**Note:** Cannot cancel uploads that are already completed (status = SUCCEEDED).

---

## Complete Video Upload Example

```typescript
import crypto from 'crypto';
import fs from 'fs';

async function uploadVideo(videoPath: string) {
  const PART_SIZE = 4 * 1024 * 1024; // 4MB
  
  // Read video file
  const videoBuffer = fs.readFileSync(videoPath);
  const fileMd5 = crypto.createHash('md5').update(videoBuffer).digest('hex');
  
  console.log(`Video size: ${videoBuffer.length} bytes`);
  console.log(`MD5: ${fileMd5}`);
  
  try {
    // 1. Initialize upload
    const initResult = await sdk.media.initVideoUpload({
      file_md5: fileMd5,
      file_size: videoBuffer.length
    });
    
    const videoUploadId = initResult.response.video_upload_id;
    console.log('Upload session started:', videoUploadId);
    
    // 2. Upload parts
    const startTime = Date.now();
    const partCount = Math.ceil(videoBuffer.length / PART_SIZE);
    const partSeqList: number[] = [];
    
    for (let i = 0; i < partCount; i++) {
      const start = i * PART_SIZE;
      const end = Math.min(start + PART_SIZE, videoBuffer.length);
      const partBuffer = videoBuffer.slice(start, end);
      const partMd5 = crypto.createHash('md5').update(partBuffer).digest('hex');
      
      await sdk.media.uploadVideoPart({
        video_upload_id: videoUploadId,
        part_seq: i,
        content_md5: partMd5,
        part_content: partBuffer
      });
      
      partSeqList.push(i);
      console.log(`Uploaded part ${i + 1}/${partCount}`);
    }
    
    const uploadCost = Date.now() - startTime;
    
    // 3. Complete upload
    await sdk.media.completeVideoUpload({
      video_upload_id: videoUploadId,
      part_seq_list: partSeqList,
      report_data: {
        upload_cost: uploadCost
      }
    });
    
    console.log('Upload completed, starting transcoding...');
    
    // 4. Wait for transcoding
    let transcoding = true;
    while (transcoding) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const result = await sdk.media.getVideoUploadResult({
        video_upload_id: videoUploadId
      });
      
      console.log('Status:', result.response.status);
      
      if (result.response.status === 'SUCCEEDED') {
        console.log('Video ready!');
        console.log('Duration:', result.response.video_info.duration, 'seconds');
        console.log('Video ID:', videoUploadId);
        return result.response.video_info;
      } else if (result.response.status === 'FAILED') {
        throw new Error(`Transcoding failed: ${result.response.message}`);
      } else if (result.response.status === 'CANCELLED') {
        throw new Error('Upload was cancelled');
      }
    }
  } catch (error) {
    console.error('Video upload failed:', error);
    throw error;
  }
}

// Usage
const videoInfo = await uploadVideo('/path/to/product-video.mp4');
```

## Best Practices

### 1. Image Upload

```typescript
// Batch upload multiple product images at once
const images = [
  '/path/to/main-image.jpg',
  '/path/to/detail-1.jpg',
  '/path/to/detail-2.jpg'
];

const result = await sdk.media.uploadImage({
  image: images,
  scene: 'normal',
  ratio: '1:1'
});

// Check each upload result
const imageIds = result.response.image_info_list
  .filter(info => !info.error)
  .map(info => info.image_info.image_id);

console.log('Successfully uploaded:', imageIds.length);
```

### 2. Error Handling

```typescript
try {
  const result = await sdk.media.uploadImage({
    image: '/path/to/image.jpg',
    scene: 'normal'
  });
  
  // Check individual image results
  result.response.image_info_list.forEach(info => {
    if (info.error) {
      console.error(`Image ${info.id} failed: ${info.message}`);
    }
  });
} catch (error) {
  if (error.error === 'error_param') {
    console.error('Invalid parameters');
  } else if (error.error === 'error_file_size') {
    console.error('File too large');
  } else {
    console.error('Upload failed:', error.message);
  }
}
```

### 3. Video Upload with Retry

```typescript
async function uploadVideoPartWithRetry(
  params: any,
  maxRetries = 3
): Promise<void> {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      await sdk.media.uploadVideoPart(params);
      return; // Success
    } catch (error) {
      lastError = error;
      console.log(`Part ${params.part_seq} failed, attempt ${attempt + 1}/${maxRetries}`);
      
      if (attempt < maxRetries - 1) {
        // Wait before retry (exponential backoff)
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }
  }
  
  throw new Error(`Failed to upload part ${params.part_seq} after ${maxRetries} attempts: ${lastError.message}`);
}
```

### 4. Validate Before Upload

```typescript
import fs from 'fs';

function validateVideo(filePath: string) {
  const stats = fs.statSync(filePath);
  const maxSize = 30 * 1024 * 1024; // 30MB
  
  if (stats.size > maxSize) {
    throw new Error(`Video size ${stats.size} exceeds maximum ${maxSize}`);
  }
  
  // Check file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  return true;
}

// Use before upload
validateVideo('/path/to/video.mp4');
```

## Integration Examples

### Product Image Upload

```typescript
// Upload main product image and detail images
async function uploadProductImages(
  mainImage: string,
  detailImages: string[]
) {
  // Upload main image
  const mainResult = await sdk.media.uploadImage({
    image: mainImage,
    scene: 'normal',
    ratio: '1:1'
  });
  
  const mainImageId = mainResult.response.image_info_list[0].image_info.image_id;
  
  // Upload detail images
  const detailResult = await sdk.media.uploadImage({
    image: detailImages,
    scene: 'normal'
  });
  
  const detailImageIds = detailResult.response.image_info_list
    .filter(info => !info.error)
    .map(info => info.image_info.image_id);
  
  return {
    main_image_id: mainImageId,
    detail_image_ids: detailImageIds
  };
}
```

### Video Upload Progress Tracking

```typescript
async function uploadVideoWithProgress(
  videoPath: string,
  onProgress?: (percent: number) => void
) {
  const PART_SIZE = 4 * 1024 * 1024;
  const videoBuffer = fs.readFileSync(videoPath);
  const partCount = Math.ceil(videoBuffer.length / PART_SIZE);
  
  // ... initialize upload ...
  
  // Upload with progress tracking
  for (let i = 0; i < partCount; i++) {
    // ... upload part ...
    
    const progress = ((i + 1) / partCount) * 100;
    if (onProgress) {
      onProgress(progress);
    }
  }
  
  // ... complete upload and wait for transcoding ...
}

// Usage
await uploadVideoWithProgress('/path/to/video.mp4', (percent) => {
  console.log(`Upload progress: ${percent.toFixed(1)}%`);
});
```

## Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `error_param` | Invalid parameters | Check required fields and formats |
| `error_file_size` | File size too large | Ensure images ≤10MB, videos ≤30MB |
| `error_invalid_upload_id` | Invalid upload_id | Verify video_upload_id from initVideoUpload |
| `error_invalid_part_seq` | Invalid part sequence | Ensure parts are uploaded sequentially from 0 |
| `error_invalid_part_size` | Invalid part size | Parts must be exactly 4MB except last part |
| `error_already_completed` | Upload already completed | Cannot modify completed uploads |
| `error_tier_img_partial` | Internal image error | Contact Shopee support |

## Related

- [ProductManager](./product.md) - Managing products that use uploaded media
- [Authentication Guide](../guides/authentication.md) - Authenticating API requests
- [Setup Guide](../guides/setup.md) - SDK initialization
