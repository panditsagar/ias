import "server-only";
import { createRemoteJWKSet, jwtVerify } from "jose";

const projectId = process.env.FIREBASE_PROJECT_ID?.trim() || "mir-notebook";
const firebaseKeys = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"),
);

export async function verifyFirebaseRequest(request) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    throw new Error("Authentication required");
  }

  const token = authorization.slice("Bearer ".length);
  const { payload } = await jwtVerify(token, firebaseKeys, {
    audience: projectId,
    issuer: `https://securetoken.google.com/${projectId}`,
  });

  if (!payload.sub) throw new Error("Invalid authentication token");
  return payload;
}
