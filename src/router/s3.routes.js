const router = require("express").Router();
const { s3Controller } = require("../controller");

// Create object into a bucket
router.post(
  "/create-object/:bucketName/:objectKey",
  s3Controller.createObjectInBucket
);

// List buckets (in this simplified example, we only have one bucket)
router.get("/list-buckets", s3Controller.listBucket);

// List objects in a bucket
router.get("/list-objects/:bucketName", s3Controller.listObjectsInBucket);

// Get object from a bucket
router.get(
  "/get-object/:bucketName/:objectKey",
  s3Controller.getObjectInBucket
);

// Delete object from a bucket
router.delete(
  "/delete-object/:bucketName/:objectKey",
  s3Controller.deleteObjectFromBucket
);

module.exports = router;
