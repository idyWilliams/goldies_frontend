// types/api.ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword?: string;
  version: number;
}
export interface Admin {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword?: string;
  version: number;
}

export interface AuthResponse {
  error: boolean;
  message: string;
  user: User;
  token?: string; // Add token for login response
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

// export interface GetUserResponse {
//   data: any;
//   user: User;
//   message: string;
// }

export interface ForgotPassword {
  email: string;
}
export interface ResetPassword {
  password: string;
  token: string;
}

// Interfaces for the admin signup and invite admin
export interface CreateAdmin {
  userName: string;
  email: string;
  refCode: string;
  password: string;
}

export interface LoginAdmin {
  email: string;
  password: string;
}

export interface VerificationOtp {
  email: string;
  otp: string;
}

export interface InviteAdmin {
  email: string;
}

export interface Users {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword?: string;
  version: number;
}
export interface GetUserResponse {
  // id: string;
  // firstName: string;
  // lastName: string;
  // email: string;
  // data: any;
  user: User;
  message: string;
  token:string
}
export interface Category {
  [x: string]: any;
  name: string;
  description: string;
  image: string;
  categorySlug: string;
  status: boolean;
}
export interface SubCategory {
  [x: string]: any;
  name: string;
  description: string;
  image: string;
  status: boolean;
  categoryId?: string | null;
}

export interface CategoryId {
  categoryId: string | null;
}

export interface EditCategory extends Category {
  categoryId?: string;
}

export interface SubCategoryId {
  subCategoryId: string | null;
}

export interface EditSubCategory {
  subCategory: SubCategory;
  subCategoryId: SubCategoryId;
}
