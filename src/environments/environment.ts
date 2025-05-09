declare global {
  interface Window {
    __env: {
      aws: {
        region: string;
        bucketName: string;
        endpoint: string;
        accessKeyId: string;
        secretAccessKey: string;
      }
    };
  }
}

export const environment = {
  production: false,
  aws: {
    region: window.__env?.aws?.region || '',
    bucketName: window.__env?.aws?.bucketName || '',
    endpoint: window.__env?.aws?.endpoint || '',
    accessKeyId: window.__env?.aws?.accessKeyId || '',
    secretAccessKey: window.__env?.aws?.secretAccessKey || ''
  }
}; 
