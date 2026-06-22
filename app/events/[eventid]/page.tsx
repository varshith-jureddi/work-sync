import { EventDetailContent } from "@/components/event-detail";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

//   const session = await getSession();

  return <EventDetailContent eventId={eventId} />;
}
