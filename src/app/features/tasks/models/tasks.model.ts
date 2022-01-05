import { FieldBase } from "src/app/shared/field-definitions/field-base";

export interface TaskPayload {
  name: string;
  type: string;
  fields: {
    [key: string]: any;
  };
}
export interface GenericTask extends TaskPayload {
  _id?: string;
}

export interface TasksDefinitions {
  [key: string]: TaskDefinition;
}

export interface TaskDefinition {
  fields: TaskFields;
}

export interface TaskFields {
  [key: string]: Partial<FieldBase>;
}

export enum DialogMode {
  CREATE = 'create',
  EDIT = 'edit',
}