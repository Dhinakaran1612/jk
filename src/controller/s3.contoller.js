const asyncHandler = require("express-async-handler");

// Basic storage to store bucket and it's details
const s3Storage = {};

const createObjectInBucket = asyncHandler((req, res) => {
  const { bucketName, objectKey } = req.params;

  if (!s3Storage[bucketName]) {
    s3Storage[bucketName] = {};
  }

  s3Storage[bucketName][objectKey] = req.body;

  return res.status(201).json({
    success: true,
    message: "Object Created",
  });
});

const listBucket = asyncHandler((req, res) => {
  const buckets = Object.keys(s3Storage);

  return res.status(200).json({
    success: true,
    result: {
      buckets,
    },
  });
});

const listObjectsInBucket = asyncHandler((req, res) => {
  const { bucketName } = req.params;

  if (s3Storage[bucketName]) {
    const objects = Object.keys(s3Storage[bucketName]);

    return res.status(200).json({
      success: true,
      result: {
        bucketName,
        objects,
      },
    });
  } else {
    return res.status(404).send("Bucket not found");
  }
});

const getObjectInBucket = asyncHandler((req, res) => {
  const { bucketName, objectKey } = req.params;

  if (s3Storage[bucketName] && s3Storage[bucketName][objectKey]) {
    const object = s3Storage[bucketName][objectKey];

    return res.status(200).json({
      success: true,
      result: {
        bucketName,
        objectName: objectKey,
        object,
      },
    });
  } else {
    return res.status(404).send("Object not found");
  }
});

const deleteObjectFromBucket = asyncHandler((req, res) => {
  const { bucketName, objectKey } = req.params;

  if (s3Storage[bucketName] && s3Storage[bucketName][objectKey]) {
    delete s3Storage[bucketName][objectKey];

    return res.status(200).json({
      success: true,
      message: "Object Deleted",
    });
  } else {
    return res.status(404).send("Object not found");
  }
});

module.exports = {
  createObjectInBucket,
  listBucket,
  listObjectsInBucket,
  getObjectInBucket,
  deleteObjectFromBucket,
};
