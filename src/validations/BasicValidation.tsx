export class BasicValidation {
  static isValidEmail(email: string) {
    return (
      email.match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      ) != null
    );
  }
  static isValidMaxLength(text: string, maxLength: number) {
    return text.length <= maxLength;
  }
  static isEqualLength(text: string, maxLength: number) {
    return text.length == maxLength;
  }
  static isEqual(value1: string, value2: string) {
    return value1 === value2;
  }
}
