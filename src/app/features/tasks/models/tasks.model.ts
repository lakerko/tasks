export interface GenericTask {
  _id?: string;
  name: string;
  type: string;
  fields: {
    [ key: string ]: any;
  };
}