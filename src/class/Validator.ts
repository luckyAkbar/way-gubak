import UserRequestError from "./Error/UserRequestError";

export default class Validator {
  static isValidDateString(dateString: string): void {
    const date = new Date(dateString);

    if (date.toString().toLowerCase() === 'invalid date') throw new Error('Invalid date supplied');
  }

  static isValidEmailAddres(email: string): void {
    try {
      const emailParts = email.split('@');
      const serverEmail = emailParts[1].split('.');
      const emailComparator = /[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
      const letterComparator = /[a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z]/;

      if (emailParts[0].length > 105 || emailParts[1].length > 105) throw new Error();
      if (emailParts[0].length === 0 || emailParts[1].length === 1) throw new Error();
      if (serverEmail[0].length === 0 || serverEmail[1].length === 0) throw new Error();
      if (!(/[.]/.test(emailParts[1]))) throw new Error();
      if (!(/@/.test(email))) throw new Error();
      if (emailComparator.test(email)) throw new Error();
      if (!letterComparator.test(email)) throw new Error();
    } catch (e: unknown) {
      console.log(e);
      throw new UserRequestError('Your username is invalid. ', 'try supply correct username');
    }
  }
}