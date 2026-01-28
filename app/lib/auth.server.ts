import { redirect } from "@remix-run/node";
import { authenticator, type AuthUser } from "~/services/auth.server";

export async function requireUser(request: Request): Promise<AuthUser> {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    throw redirect("/login");
  }
  return user;
}

export async function getOptionalUser(
  request: Request,
): Promise<AuthUser | null> {
  return authenticator.isAuthenticated(request);
}
