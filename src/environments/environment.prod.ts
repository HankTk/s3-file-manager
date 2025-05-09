export const environment = {
  production: true,
  aws: {
    region: window.__env?.aws?.region || '',
    bucketName: window.__env?.aws?.bucketName || '',
    endpoint: window.__env?.aws?.endpoint || '',
    accessKeyId: window.__env?.aws?.accessKeyId || '',
    secretAccessKey: window.__env?.aws?.secretAccessKey || ''
  }
}; 
