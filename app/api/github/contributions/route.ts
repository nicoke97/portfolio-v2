import { emptyGithubContributions, getGithubContributions } from "@/lib/github-contributions";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json(await getGithubContributions());
  } catch {
    return Response.json(emptyGithubContributions());
  }
}
