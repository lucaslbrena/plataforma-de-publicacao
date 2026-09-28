import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtEncodeKey = new TextEncoder().encode(jwtSecretKey);

const loginExpSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const loginExpString = process.env.LOGIN_EXPIRATION_STRING || "1d";
const loginCookieName = process.env.LOGIN_COOKIE_NAME || "loginSession";

type jwtPayload = {
  username: string;
  expiresAt: Date;
};

export async function createLoginSession(username: string) {
  const expiresAt = new Date(Date.now() + loginExpSeconds * 1000);
  const loginSession = await signJWT({ username, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: expiresAt,
  });
}
export async function deleteLoginSession() {
  const cookieStore = await cookies();
  cookieStore.set(loginCookieName, "", { expires: new Date(0) });
  cookieStore.delete(loginCookieName);
}

export async function getLoginSession() {
  const cookieStore = await cookies();

  const jwt = cookieStore.get(loginCookieName)?.value;

  if (!jwt) return false;

  return verifyJwt(jwt);
}

export async function verifyLoginSession() {
  const jwtPayload = await getLoginSession();

  if (!jwtPayload) return false;

  return jwtPayload.username === process.env.LOGIN_USER;
}

export async function requireLoginSessionOrRedirect() {
  const isAuthenticated = await getLoginSession();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }
}

export async function signJWT(jwtPayload: jwtPayload) {
  return new SignJWT(jwtPayload)
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuedAt()
    .setExpirationTime(loginExpString)
    .sign(jwtEncodeKey);
}

export async function verifyJwt(jwt: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(jwt, jwtEncodeKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    console.error("Invalid token");
    return false;
  }
}
