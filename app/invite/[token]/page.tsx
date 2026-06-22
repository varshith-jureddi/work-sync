
import { EventDetailContent } from "@/components/event-detail";
import { InviteRsvpContent } from "@/components/invite-content";

export default async function InvitePage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ submitted?: string }>;
}) {
  const { token } = await params;
  const query = await searchParams;

  return (
    <div>
        {/* Invite page */}

        <InviteRsvpContent token={token} submitted={query.submitted === "1"} />
    </div>
    
  );
}
