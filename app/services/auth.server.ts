import { Authenticator } from "remix-auth";
import { GitHubStrategy } from "remix-auth-github";
import { sessionStorage } from "~/services/session.server";
import { prisma } from "~/lib/prisma";

export type AuthUser = {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
};

export const authenticator = new Authenticator<AuthUser>(sessionStorage);

const gitHubStrategy = new GitHubStrategy(
  {
    clientId: process.env.GITHUB_CLIENT_ID || "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    redirectURI:
      process.env.GITHUB_CALLBACK_URL ||
      "http://localhost:5173/auth/github/callback",
    scopes: ["user:email"],
  },
  async ({ profile }) => {
    const email = profile.emails?.[0]?.value || `${profile.id}@github.local`;

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name: profile.displayName || profile.name?.givenName || profile.id,
        image: profile.photos?.[0]?.value,
      },
      create: {
        email,
        name: profile.displayName || profile.name?.givenName || profile.id,
        image: profile.photos?.[0]?.value,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    };
  },
);

authenticator.use(gitHubStrategy);
