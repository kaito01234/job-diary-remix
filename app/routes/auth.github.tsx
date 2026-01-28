import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  return authenticator.authenticate("github", request);
}

export async function loader() {
  throw new Response("Method Not Allowed", { status: 405 });
}
