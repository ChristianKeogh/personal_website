import ClientSideCongress, { Member } from "./client-side-congress";
import { CongressApiResponse } from "./types";

export const dynamic = "force-dynamic";

async function fetchAllMembers(): Promise<Member[]> {
  const apiKey = process.env.CONGRESS_KEY;
  let apiUrl = `https://api.congress.gov/v3/member?api_key=${apiKey}`;
  let members: Member[] = [];

  try {
    while (apiUrl) {
      const res = await fetch(apiUrl, { cache: "no-store" });
      if (!res.ok) throw new Error(`Error fetching members: ${res.statusText}`);
      const data: CongressApiResponse = await res.json();
      console.log(data);
      members = [...members, ...data.members];

      // Update next page if it exists
      apiUrl = data.pagination?.next || "";
    }
  } catch (error) {
    console.error("Error fetching Congress members:", error);
  }

  return members;
}

export default async function CongressPage() {
  const members = await fetchAllMembers();
  return <ClientSideCongress members={members} />;
}
