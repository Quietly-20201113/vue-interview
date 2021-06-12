/**
 * 判断数据类型
 * @param {*类型名首字母必须大写} type
 * @param {*传入数据} data
 */
 export const isType = (type, data) => `[object ${type}]` === Object.prototype.toString.call(data);

 /**
  * 判断数据是否不为空
  * @param {*传入数据} data
  */
 export const isNotNull = data => {
 
     if (isType("Array", data)) return data.length > 0 ? true : false;
     if (isType("Object", data)) return Object.keys(data).length > 0 ? true : false;
     if (isType("Undefined", data)) return false;
     if (isType("undefined", data)) return false;
     if (isType("Null", data)) return false;
     if (isType("String", data)) {
         if (data.trim() == "undefined") return false;
         if (data.trim() == 'NAN') return false;
         if (data.trim() == '') return false;
         if (data.trim() == 'null') return false;
         if (data.trim() == 'false') return false;
 
     }
     if (isType("Number", data)) {
         if (data == 0) return false;
     }
     if (isType('boolean', data)) return data;
     return true;
 
 };