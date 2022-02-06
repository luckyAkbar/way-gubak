export default class Util {
  static removeObjProp(obj: any, propName: string): any {
    delete obj[propName];

    return obj;
  }

  static removeObjPropFromArrOfObj(arrOfObj: any[], propName: string): any[] {
    for (let i = 0; i < arrOfObj.length; i++) {
      delete arrOfObj[i][propName];
    }

    return arrOfObj;
  }
}