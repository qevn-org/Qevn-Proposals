import crypto from 'crypto';

// Secret key for HMAC session signature (server only, never exposed to client)
const AUTH_SECRET = process.env.AUTH_SECRET || 'qevn_super_secret_enterprise_auth_key_2026_x99!';

export interface AuthorizedUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'sales_lead' | 'proposal_engineer';
  roleTitle: string;
  initials: string;
  organization: string;
  passwordHash: string; // Salted SHA-256 hash
  salt: string;
}

// Helper to hash password with salt
function hashPassword(password: string, salt: string): string {
  return crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(password + salt)
    .digest('hex');
}

// 4 STRICT AUTHORIZED USERS ONLY (Server-side only)
// Passwords configured:
// 1. dhruv@qevn.in     -> Dhruv@Qevn2026!
// 2. growth@qevn.in    -> Growth@Qevn2026!
// 3. engineer@qevn.in  -> Engineer@Qevn2026!
// 4. admin@qevn.in     -> Master@Qevn2026!

const SALTS = {
  dhruv: 'qevn_salt_dhruv_99182',
  growth: 'qevn_salt_growth_33819',
  engineer: 'qevn_salt_engineer_44921',
  admin: 'qevn_salt_admin_88192'
};

export const AUTHORIZED_TEAM: AuthorizedUser[] = [
  {
    id: 'usr-1',
    email: 'dhruv@qevn.in',
    name: 'Dhruv Pathak',
    role: 'admin',
    roleTitle: 'Founder & Admin',
    initials: 'DP',
    organization: 'QEVN AI',
    salt: SALTS.dhruv,
    passwordHash: hashPassword(process.env.QEVN_PASS_DHRUV || 'Dhruv@Qevn2026!', SALTS.dhruv)
  },
  {
    id: 'usr-2',
    email: 'growth@qevn.in',
    name: 'QEVN Growth Lead',
    role: 'sales_lead',
    roleTitle: 'Senior Growth Consultant',
    initials: 'GL',
    organization: 'QEVN AI',
    salt: SALTS.growth,
    passwordHash: hashPassword(process.env.QEVN_PASS_GROWTH || 'Growth@Qevn2026!', SALTS.growth)
  },
  {
    id: 'usr-3',
    email: 'engineer@qevn.in',
    name: 'AI Solutions Architect',
    role: 'proposal_engineer',
    roleTitle: 'Lead AI Engineer',
    initials: 'AE',
    organization: 'QEVN AI',
    salt: SALTS.engineer,
    passwordHash: hashPassword(process.env.QEVN_PASS_ENGINEER || 'Engineer@Qevn2026!', SALTS.engineer)
  },
  {
    id: 'usr-4',
    email: 'admin@qevn.in',
    name: 'QEVN Master Admin',
    role: 'admin',
    roleTitle: 'Executive Access',
    initials: 'MA',
    organization: 'QEVN AI',
    salt: SALTS.admin,
    passwordHash: hashPassword(process.env.QEVN_PASS_ADMIN || 'Master@Qevn2026!', SALTS.admin)
  }
];

/**
 * Validates credentials strictly on the server against the 4 authorized users.
 * Uses timing-safe string comparison to prevent timing attacks.
 */
export function verifyCredentials(email: string, passwordAttempt: string): Omit<AuthorizedUser, 'passwordHash' | 'salt'> | null {
  const cleanEmail = email.trim().toLowerCase();
  const user = AUTHORIZED_TEAM.find((u) => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    return null;
  }

  const attemptHash = hashPassword(passwordAttempt, user.salt);

  // Constant-time comparison to prevent timing attacks
  const hashBuffer = Buffer.from(user.passwordHash, 'hex');
  const attemptBuffer = Buffer.from(attemptHash, 'hex');

  if (hashBuffer.length !== attemptBuffer.length) {
    return null;
  }

  if (!crypto.timingSafeEqual(hashBuffer, attemptBuffer)) {
    return null;
  }

  const { passwordHash, salt, ...safeUser } = user;
  return safeUser;
}

/**
 * Creates a cryptographically signed session token for the user.
 */
export function createSignedToken(user: Omit<AuthorizedUser, 'passwordHash' | 'salt'>): string {
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    roleTitle: user.roleTitle,
    initials: user.initials,
    organization: user.organization,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * Verifies and parses a signed session token.
 */
export function verifySignedToken(token: string): Omit<AuthorizedUser, 'passwordHash' | 'salt'> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [payloadB64, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', AUTH_SECRET)
      .update(payloadB64)
      .digest('base64url');

    const sigA = Buffer.from(signature);
    const sigB = Buffer.from(expectedSignature);

    if (sigA.length !== sigB.length || !crypto.timingSafeEqual(sigA, sigB)) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));
    if (payload.exp < Date.now()) {
      return null; // Expired
    }

    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      roleTitle: payload.roleTitle,
      initials: payload.initials,
      organization: payload.organization
    };
  } catch {
    return null;
  }
}
