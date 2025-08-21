import {User} from "@app/shared/models/user";

export interface Auth {
  isValid: boolean;
  token: string;
  record: User | null;
}
