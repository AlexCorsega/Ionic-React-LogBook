class VisitorDetailsModel {
  firstname: string;
  lastname: string;
  logtype: string;
  signature: string;
  date: string;
  note: string;
  description: string;
  created: string;
  /**
   *
   */
  constructor(
    name: string,
    logtype: string,
    signature: string,
    date: string,
    note: string,
    lastname: string,
    description: string,
    created: string
  ) {
    this.firstname = name;
    this.logtype = logtype;
    this.signature = signature;
    this.date = date;
    this.note = note;
    this.lastname = lastname;
    this.description = description;
    this.created = created;
  }
}
export default VisitorDetailsModel;
