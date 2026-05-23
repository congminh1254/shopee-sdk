# MediaSpaceManager

The MediaSpaceManager handles media file uploads (images and videos) to Shopee's media space for use in product listings and other content.

## Overview

The MediaSpaceManager provides methods for:
- Uploading product images with different scenes and aspect ratios
- Multi-part video upload with session management
- Video transcoding status tracking
- Video upload cancellation

## Quick Start

```typescript
// Upload an image
const imageResult = await sdk.mediaSpace.uploadImage({
  scene: 'normal',
  ratio: '1:1',
});

// Initialize video upload
const initResult = await sdk.mediaSpace.initVideoUpload({
  file_md5: '2abf0b6e5ff90ff24437a0808f171a93',
  file_size: 1261876,
});

// Check video transcoding status
const statusResult = await sdk.mediaSpace.getVideoUploadResult({
  video_upload_id: initResult.response.video_upload_id,
});
```

## Methods

### uploadImage()

**API Documentation:** [v2.media_space.upload_image](https://open.shopee.com/documents/v2/v2.media_space.upload_image?module=91&type=1)

Upload multiple image files to MediaSpace (up to 9 images).

```typescript
const response = await sdk.mediaSpace.uploadImage({
  scene: 'normal', // 'normal' or 'desc'
  ratio: '1:1',    // '1:1' or '3:4' (whitelisted sellers only)
});

// Access uploaded images
response.response.image_info_list?.forEach((imageInfo) => {
  console.log('Image ID:', imageInfo.image_info?.image_id);
  console.log('URLs:', imageInfo.image_info?.image_url_list);
});
```

**Parameters:**
- `scene` (optional): 
  - `'normal'` - Process as square image (recommended for item images)
  - `'desc'` - Don't process image (recommended for descriptions)
- `ratio` (optional): `'1:1'` (default) or `'3:4'` (whitelisted sellers only)
- `image` (optional): Image file(s) - Max 10MB each, formats: JPG, JPEG, PNG

**Use Cases:**
- Upload product main images
- Upload product description images
- Upload product variant images

---

### initVideoUpload()

**API Documentation:** [v2.media_space.init_video_upload](https://open.shopee.com/documents/v2/v2.media_space.init_video_upload?module=91&type=1)

Initiate a video upload session. Video duration should be between 10s and 60s.

```typescript
const response = await sdk.mediaSpace.initVideoUpload({
  file_md5: '2abf0b6e5ff90ff24437a0808f171a93',
  file_size: 1261876, // Size in bytes, max 30MB
});

const uploadId = response.response.video_upload_id;
console.log('Upload session ID:', uploadId);
```

**Parameters:**
- `file_md5`: MD5 hash of the video file
- `file_size`: Size of video file in bytes (maximum 30MB)

**Use Cases:**
- Start video upload for product listing
- Initialize video session before uploading parts

---

### uploadVideoPart()

**API Documentation:** [v2.media_space.upload_video_part](https://open.shopee.com/documents/v2/v2.media_space.upload_video_part?module=91&type=1)

Upload video file by parts. Part size should be exactly 4MB except for the last part.

```typescript
await sdk.mediaSpace.uploadVideoPart({
  video_upload_id: 'sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000',
  part_seq: 0, // Sequence number starting from 0
  content_md5: '3bb08579fffbfc13ed9d23cda8bbb46d',
  // part_content would be the actual file data
});
```

**Parameters:**
- `video_upload_id`: The upload ID from initVideoUpload
- `part_seq`: Sequence number of the part, starting from 0
- `content_md5`: MD5 hash of this part
- `part_content`: The file content (handled as multipart/form-data)

**Use Cases:**
- Upload large videos in chunks
- Resume failed uploads by uploading missing parts

---

### completeVideoUpload()

**API Documentation:** [v2.media_space.complete_video_upload](https://open.shopee.com/documents/v2/v2.media_space.complete_video_upload?module=91&type=1)

Complete the video upload and start transcoding when all parts are uploaded.

```typescript
await sdk.mediaSpace.completeVideoUpload({
  video_upload_id: 'sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000',
  part_seq_list: [0, 1, 2, 3],
  report_data: {
    upload_cost: 11832, // Time in milliseconds
  },
});
```

**Parameters:**
- `video_upload_id`: The upload ID from initVideoUpload
- `part_seq_list`: Array of all uploaded part sequence numbers
- `report_data.upload_cost`: Upload time in milliseconds for tracking

**Use Cases:**
- Finalize video upload after all parts are uploaded
- Trigger video transcoding process

---

### getVideoUploadResult()

**API Documentation:** [v2.media_space.get_video_upload_result](https://open.shopee.com/documents/v2/v2.media_space.get_video_upload_result?module=91&type=1)

Query the upload status and result of video transcoding.

```typescript
const response = await sdk.mediaSpace.getVideoUploadResult({
  video_upload_id: 'sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000',
});

console.log('Status:', response.response.status);

if (response.response.status === 'SUCCEEDED') {
  console.log('Video URLs:', response.response.video_info?.video_url_list);
  console.log('Thumbnails:', response.response.video_info?.thumbnail_url_list);
  console.log('Duration:', response.response.video_info?.duration);
}
```

**Video Status Values:**
- `INITIATED` - Waiting for parts or complete call
- `TRANSCODING` - Transcoding in progress
- `SUCCEEDED` - Ready for use
- `FAILED` - Upload failed (check message field)
- `CANCELLED` - Upload was cancelled

**Use Cases:**
- Poll for video transcoding completion
- Get video URLs after successful transcoding
- Check for upload failures

---

### cancelVideoUpload()

**API Documentation:** [v2.media_space.cancel_video_upload](https://open.shopee.com/documents/v2/v2.media_space.cancel_video_upload?module=91&type=1)

Cancel an ongoing video upload session.

```typescript
await sdk.mediaSpace.cancelVideoUpload({
  video_upload_id: 'sg_90ce045e-fd92-4f0b-97a4-eda40546cd9f_000000',
});
```

**Parameters:**
- `video_upload_id`: The upload ID to cancel

**Use Cases:**
- Cancel failed or unwanted uploads
- Clean up incomplete upload sessions

## Integration Examples

### Complete Image Upload Workflow

```typescript
async function uploadProductImages(imageFiles: File[]) {
  try {
    // Upload images as product images (normal scene)
    const result = await sdk.mediaSpace.uploadImage({
      scene: 'normal',
      ratio: '1:1',
    });
    
    // Extract image IDs for product creation
    const imageIds = result.response.image_info_list?.map(
      (info) => info.image_info?.image_id
    ).filter(Boolean) || [];
    
    console.log('✅ Uploaded images:', imageIds);
    return imageIds;
  } catch (error) {
    console.error('❌ Image upload failed:', error);
    throw error;
  }
}
```

### Complete Video Upload Workflow

```typescript
async function uploadProductVideo(videoFile: Buffer) {
  const crypto = require('crypto');
  
  // Calculate MD5 hash
  const fileMd5 = crypto.createHash('md5').update(videoFile).digest('hex');
  const fileSize = videoFile.length;
  
  try {
    // Step 1: Initialize video upload
    console.log('🔄 Initializing video upload...');
    const initResult = await sdk.mediaSpace.initVideoUpload({
      file_md5: fileMd5,
      file_size: fileSize,
    });
    
    const uploadId = initResult.response.video_upload_id;
    console.log('✅ Upload session created:', uploadId);
    
    // Step 2: Split file into 4MB chunks and upload
    const CHUNK_SIZE = 4 * 1024 * 1024; // 4MB
    const chunks = Math.ceil(fileSize / CHUNK_SIZE);
    const startTime = Date.now();
    
    console.log(`🔄 Uploading ${chunks} parts...`);
    
    for (let i = 0; i < chunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, fileSize);
      const chunk = videoFile.slice(start, end);
      const chunkMd5 = crypto.createHash('md5').update(chunk).digest('hex');
      
      await sdk.mediaSpace.uploadVideoPart({
        video_upload_id: uploadId,
        part_seq: i,
        content_md5: chunkMd5,
        // part_content: chunk would be passed here
      });
      
      console.log(`  ✅ Part ${i + 1}/${chunks} uploaded`);
    }
    
    // Step 3: Complete upload
    const uploadCost = Date.now() - startTime;
    console.log('🔄 Completing upload...');
    
    await sdk.mediaSpace.completeVideoUpload({
      video_upload_id: uploadId,
      part_seq_list: Array.from({ length: chunks }, (_, i) => i),
      report_data: { upload_cost: uploadCost },
    });
    
    console.log('✅ Upload complete, transcoding started');
    
    // Step 4: Poll for transcoding completion
    console.log('🔄 Waiting for transcoding...');
    
    let status: string = 'INITIATED';
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes with 5-second intervals
    
    while (status !== 'SUCCEEDED' && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      
      const result = await sdk.mediaSpace.getVideoUploadResult({
        video_upload_id: uploadId,
      });
      
      status = result.response.status;
      console.log(`  Status: ${status}`);
      
      if (status === 'FAILED') {
        throw new Error(`Transcoding failed: ${result.response.message}`);
      }
      
      if (status === 'CANCELLED') {
        throw new Error('Upload was cancelled');
      }
      
      attempts++;
    }
    
    if (status !== 'SUCCEEDED') {
      throw new Error('Transcoding timeout');
    }
    
    // Step 5: Get video information
    const finalResult = await sdk.mediaSpace.getVideoUploadResult({
      video_upload_id: uploadId,
    });
    
    console.log('✅ Video ready!');
    console.log('Video ID:', uploadId);
    console.log('Duration:', finalResult.response.video_info?.duration, 'seconds');
    
    return {
      video_upload_id: uploadId,
      video_info: finalResult.response.video_info,
    };
  } catch (error) {
    console.error('❌ Video upload failed:', error);
    
    // Attempt to cancel on error
    try {
      await sdk.mediaSpace.cancelVideoUpload({
        video_upload_id: uploadId!,
      });
      console.log('🗑️  Upload cancelled');
    } catch (cancelError) {
      // Ignore cancel errors
    }
    
    throw error;
  }
}
```

### Retry Failed Video Parts

```typescript
async function uploadVideoPartsWithRetry(
  uploadId: string,
  chunks: Buffer[],
  maxRetries: number = 3
) {
  const crypto = require('crypto');
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const chunkMd5 = crypto.createHash('md5').update(chunk).digest('hex');
    
    let attempt = 0;
    let uploaded = false;
    
    while (attempt < maxRetries && !uploaded) {
      try {
        await sdk.mediaSpace.uploadVideoPart({
          video_upload_id: uploadId,
          part_seq: i,
          content_md5: chunkMd5,
          // part_content: chunk
        });
        
        uploaded = true;
        console.log(`✅ Part ${i + 1}/${chunks.length} uploaded`);
      } catch (error) {
        attempt++;
        console.warn(`⚠️  Part ${i + 1} failed (attempt ${attempt}/${maxRetries})`);
        
        if (attempt >= maxRetries) {
          throw new Error(`Failed to upload part ${i} after ${maxRetries} attempts`);
        }
        
        // Wait before retry with exponential backoff
        await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
      }
    }
  }
}
```

## Best Practices

### 1. Calculate MD5 Correctly

```typescript
import crypto from 'crypto';

function calculateFileMd5(fileBuffer: Buffer): string {
  return crypto.createHash('md5').update(fileBuffer).digest('hex');
}

function calculatePartMd5(partBuffer: Buffer): string {
  return crypto.createHash('md5').update(partBuffer).digest('hex');
}
```

### 2. Handle Upload Errors

```typescript
async function safeUploadVideo(videoFile: Buffer) {
  try {
    return await uploadProductVideo(videoFile);
  } catch (error) {
    if (error.error === 'error_file_size') {
      console.error('Video file too large (max 30MB)');
    } else if (error.error === 'error_invalid_upload_id') {
      console.error('Invalid or expired upload session');
    } else if (error.error === 'error_invalid_part_seq') {
      console.error('Invalid part sequence number');
    } else {
      console.error('Upload failed:', error);
    }
    return null;
  }
}
```

### 3. Implement Upload Progress Tracking

```typescript
class VideoUploadProgress {
  private totalParts: number;
  private uploadedParts: number = 0;
  
  constructor(fileSize: number) {
    const CHUNK_SIZE = 4 * 1024 * 1024;
    this.totalParts = Math.ceil(fileSize / CHUNK_SIZE);
  }
  
  onPartUploaded() {
    this.uploadedParts++;
    const progress = (this.uploadedParts / this.totalParts) * 100;
    console.log(`Progress: ${progress.toFixed(1)}%`);
  }
  
  getProgress(): number {
    return (this.uploadedParts / this.totalParts) * 100;
  }
}
```

### 4. Poll Transcoding Status Efficiently

```typescript
async function waitForTranscoding(
  uploadId: string,
  onProgress?: (status: string) => void
): Promise<void> {
  const delays = [2000, 3000, 5000, 5000, 10000]; // Progressive delay
  let delayIndex = 0;
  
  while (true) {
    const result = await sdk.mediaSpace.getVideoUploadResult({
      video_upload_id: uploadId,
    });
    
    const status = result.response.status;
    onProgress?.(status);
    
    if (status === 'SUCCEEDED') {
      return;
    }
    
    if (status === 'FAILED') {
      throw new Error(`Transcoding failed: ${result.response.message}`);
    }
    
    if (status === 'CANCELLED') {
      throw new Error('Upload was cancelled');
    }
    
    // Use progressive delays
    const delay = delays[Math.min(delayIndex, delays.length - 1)];
    await new Promise((resolve) => setTimeout(resolve, delay));
    delayIndex++;
  }
}
```

### 5. Clean Up Failed Uploads

```typescript
async function uploadWithCleanup(videoFile: Buffer) {
  let uploadId: string | undefined;
  
  try {
    const result = await uploadProductVideo(videoFile);
    return result;
  } catch (error) {
    // Clean up on error
    if (uploadId) {
      try {
        await sdk.mediaSpace.cancelVideoUpload({
          video_upload_id: uploadId,
        });
      } catch (cleanupError) {
        console.warn('Failed to cancel upload:', cleanupError);
      }
    }
    throw error;
  }
}
```

## Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `error_file_size` | File too large | Video must be < 30MB |
| `error_param` | Invalid parameters | Check file_md5 format and file_size value |
| `error_invalid_upload_id` | Invalid or expired upload ID | Start a new upload session |
| `error_invalid_part_seq` | Invalid part sequence | Ensure part_seq starts from 0 and is sequential |
| `error_invalid_part_size` | Invalid part size | Each part must be 4MB except the last part |
| `error_already_completed` | Upload already completed | Cannot modify completed upload |
| `error_tier_img_partial` | Image upload error | Contact support |

## Related

- [ProductManager](./product.md) - Use uploaded media in products
- [Authentication Guide](../guides/authentication.md) - API authentication
- [Shopee Media Requirements](https://open.shopee.com/documents) - Official media specifications
