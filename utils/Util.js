const { parse } = require('node:path');
const Collection = require('../structures/Collection');

module.exports = class Util {
    static flatten(obj, ...props) {
        if (obj === null || typeof obj !== 'object') return obj;
    
        const objProps = Object.keys(obj)
          .filter(k => !k.startsWith('_'))
          .map(k => ({ [k]: true }));
        props = objProps.length ? Object.assign(...objProps, ...props) : Object.assign({}, ...props);
    
        const out = {};
    
        for (let [prop, newProp] of Object.entries(props)) {
          if (!newProp) continue;
          newProp = newProp === true ? prop : newProp;
          const element = obj[prop];
          const elemIsObj = obj !== null && typeof obj === 'object';
          const valueOf = elemIsObj && typeof element?.valueOf === 'function' ? element.valueOf() : null;
          
          if (element instanceof Collection) out[newProp] = Array.from(element.keys());
          else if (valueOf instanceof Collection) out[newProp] = Array.from(valueOf.keys());
          else if (Array.isArray(element)) out[newProp] = element.map(e => Util.flatten(e));
          else if (typeof valueOf !== 'object') out[newProp] = valueOf;
          else if (!elemIsObj) out[newProp] = element;
        }
        return out;
      }
      static to_snake_case(text){
        const toFormate = text
        return toFormate.replace(/(?:^|\.?)([A-Z0-9])/g, function (_, y){return "_" + y.toLowerCase()}).replace(/^_/, "");
      }
      static basename(path, ext) {
        const res = parse(path);
        return ext && res.ext.startsWith(ext) ? res.name : res.base.split('?')[0];
      }
      static toAPI(obj){
        if (obj === null || typeof obj !== 'object') return obj;
        if(Array.isArray(obj)) return obj.map(o => this.toAPI(o))
        let out = {}
        for(let [k, v] of Object.entries(obj)){
          if(k.startsWith('_')) continue
          const formattedKey = this.to_snake_case(k)
          out[formattedKey] = this.toAPI(v?.toJSON?.() ?? v ?? null)
        }
        return out
      }
}