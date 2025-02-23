import { Member } from "./client-side-congress";

export interface CongressApiResponse {
  members: Member[];
  pagination?: {
    next?: string;
  };
}
