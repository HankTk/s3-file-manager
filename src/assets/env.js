(function(window) {
  window.__env = window.__env || {};
  
  // Environment variables
  window.__env.aws = {
    region: window.__env.AWS_REGION,
    bucketName: window.__env.AWS_BUCKET_NAME,
    endpoint: window.__env.AWS_ENDPOINT,
    accessKeyId: window.__env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: window.__env.AWS_SECRET_ACCESS_KEY || ''
  };
})(this); 