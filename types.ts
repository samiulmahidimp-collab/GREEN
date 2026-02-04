export enum UserRole {
  ADMIN = 'ADMIN',
  BUYER = 'BUYER',
  SELLER = 'SELLER' // Restaurant selling UCO
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
}

export interface Order {
  id: string;
  date: string;
  amountLiters: number;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  type: 'purchase' | 'collection'; // Purchase = buying diesel, Collection = selling UCO
}

export interface DashboardStats {
  totalDieselSold: number;
  totalUCOCollected: number;
  revenue: number;
  activeUsers: number;
}
