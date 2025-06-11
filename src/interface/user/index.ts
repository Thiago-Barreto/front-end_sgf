export type sector =
  | "System Developer"
  | "Test Engineering"
  | "Product Engineering"
  | "Process Engineering";

export interface LinkItem {
  id: number;
  title_link: string;
  location?: string;
  class: string;
}

export interface UsersData {
  ID: number;
  UserID: number;
  CompleteName: string;
  AccessLevel: string;
  email: string;
  Status: string;
  sector: string;
  hierarchy: string;
  profile: string;
  isOnline: string;
  factory: string;
  locality: string;
}

export interface UserProfile {
  UserID: string;
  CompleteName: string;
  email: string;
  AccessPassword: string;
  AccessLevel: string;
  sector: sector;
  hierarchy: string;
  profile: string;
  dateLogin: string;
  factory: string;
  locality: string;
}

export interface UserResponse {
  message: string;
  users: UsersData[];
}
