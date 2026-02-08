export enum Role {
    BUYER = "buyer",
    SELLER = "seller",
    ADMIN = "admin"
}

// or
// export const Role = {
//   BUYER: 'buyer',
//   SELLER: 'seller',
//   ADMIN: 'admin',
// } as const;

// export type Role = (typeof Role)[keyof typeof Role];

export type User = {
    name?: string;
    email: string;
    password?: string;
    role: Role;
    phone?: string;
    avatar?: string;
}
export type SafeUser = Omit<User, 'password'>


