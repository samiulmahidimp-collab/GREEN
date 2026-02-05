export enum UserRole {
  ADMIN = 'ADMIN',
  BUYER = 'BUYER',
  SELLER = 'SELLER', // UCO Donor
  EMPLOYEE = 'EMPLOYEE'
}

export type BuyerPurpose = 'garments' | 'factories' | 'petrol_pump' | 'own' | 'international';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  balance: number;
  purpose?: BuyerPurpose;
}

export interface Order {
  id: string;
  date: string;
  amountLiters: number;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled' | 'in-review';
  type: 'purchase' | 'collection' | 'glycerin_inquiry';
  paymentMethod?: string;
  location?: string;
}

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  deadline: string;
}