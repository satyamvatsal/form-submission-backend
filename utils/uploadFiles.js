const { BlobServiceClient } = require("@azure/storage-blob");
const fs = require("fs");
require("dotenv").config();

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;
const CONTAINER_NAME = "resumes";

const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING,
);
const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

async function uploadToAzureBlob(localFilePath, blobName) {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const fileStream = fs.createReadStream(localFilePath);

  await blockBlobClient.uploadStream(fileStream);
  return blockBlobClient.url; // Return public URL (if container has public access)
}

module.exports = uploadToAzureBlob;
