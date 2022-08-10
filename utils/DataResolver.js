const fs = require('node:fs');
const path = require('node:path');
const stream = require('node:stream');
const { Buffer } = require('node:buffer');
const fetch = require('node-fetch');

module.exports = class DataResolver {
    static async resolveFile(resource) {
        if (Buffer.isBuffer(resource) || resource instanceof stream.Readable) return resource;
        if (typeof resource === 'string') {
          if (/^https?:\/\//.test(resource)) {
            const res = await fetch(resource);
            return res.body;
          }
    
          return new Promise((resolve, reject) => {
            const file = path.resolve(resource);
            fs.stat(file, (err, stats) => {
              if (err) return reject(err);
              if (!stats.isFile()) return reject(new Error('File Not Found'));
              return resolve(fs.createReadStream(file));
            });
          });
        }
    
        throw new TypeError('REQ_RESOURCE_TYPE');
      }
      static async resolveImage(image) {
        if (!image) return null;
        if (typeof image === 'string' && image.startsWith('data:')) {
          return image;
        }
        const file = await this.resolveFileAsBuffer(image);
        return DataResolver.resolveBase64(file);
      }
      static resolveBase64(data) {
        if (Buffer.isBuffer(data)) return `data:image/jpg;base64,${data.toString('base64')}`;
        return data;
      }
      static async resolveFileAsBuffer(resource) {
        const file = await this.resolveFile(resource);
        if (Buffer.isBuffer(file)) return file;
    
        const buffers = [];
        for await (const data of file) buffers.push(data);
        return Buffer.concat(buffers);
      }
}