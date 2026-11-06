export interface User {
  email: string;
  password: string;
}

export const users = {
  standard: {
    email: 'hameed@bowls.com',
    password: process.env.STANDARD_USER_PASSWORD ?? '',
  },
  admin: {
    email: 'admin@lakeview.club',
    password: process.env.ADMIN_USER_PASSWORD ?? '',
  },
  randomStandard: {
    email: 'user-${crypto.randomUUID()}@testing.com',
    password: '${crypto.randomUUID()}',
  }
} satisfies Record<string, User>;

export interface Club {
  clubSlug: string;
}

export const clubs= {
    clubSlug: 'lakeview-bowls',
}
