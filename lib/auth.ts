import { SignJWT, jwtVerify, type JWTPayload } from "jose";

interface TokenPayload extends JWTPayload {
  sub: string;
  ext: string;
  email: string;
  plan: string;
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "dev-secret-change-me");

export async function signToken(payload: {
  userId: string;
  externalId: string;
  email: string;
  plan: string;
}): Promise<string> {
  return new SignJWT({
    sub: payload.userId,
    ext: payload.externalId,
    email: payload.email,
    plan: payload.plan,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  const { payload } = await jwtVerify(token, secret);
  return payload as TokenPayload;
}

export async function getUserFromRequest(req: Request): Promise<TokenPayload | null> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  try {
    return await verifyToken(authHeader.slice(7));
  } catch {
    return null;
  }
}
