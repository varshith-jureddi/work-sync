import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { countByStatus } from "@/app/dashboard/page";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form } from "./ui/form";
// import { createInviteLinkAction } from "@/lib/actions/events";
import { createInviteLinkAction } from "@/lib/events";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export async function EventDetailContent({
//   userId,
  eventId,
}: {
  // userId: string;
  eventId: string;
}) {
  const row = await prisma.event.findFirst({
    // where: { id: eventId, ownerUserId: userId },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      event_date: true,
      event_invites: { select: { token: true } },
      rsvps: { select: { status: true } },
    },
  });

  if (!row) {
    notFound();
  }

  const counts = countByStatus(row.rsvps);

  const event = {
    id: row.id,
    title: row.title,
    description: row.description,
    location: row.location,
    event_date: row.event_date ? row.event_date.toISOString() : null,
    inviteToken: row.event_invites?.token ?? null,
    goingCount: counts.goingCount,
    maybeCount: counts.maybeCount,
    notGoingCount: counts.notGoingCount,
  };

  const rsvpRows = await prisma.eventRsvp.findMany({
    where: { eventId },
    orderBy: { responded_at: "desc" },
    select: {
      id: true,
    //   name: true,
    //   email: true,
      status: true,
      responded_at: true,
    },
  });

  const rsvps = rsvpRows.map((r) => ({
    id: r.id,
    // name: r.name,
    // email: r.email,
    status: r.status,
    respondedAt: r.responded_at.toISOString(),
  }));

  const createInviteActionForEvent = createInviteLinkAction.bind(
    null,
    event.id,
  );

  const inviteUrl = event.inviteToken
    ? `${process.env.APP_URL ?? ""}/invite/${event.inviteToken}`
    : null;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            {event.title}
          </h1>
          <p>
            {event.event_date
              ? new Date(event.event_date).toLocaleString()
              : "No date selected"}

            {event.location ? ` - ${event.location}` : ""}
          </p>
          {event.description && (
            <p className="max-w-2xl text-sm text-[var(--muted-foreground)]">
              {event.description}
            </p>
          )}
        </div>
        <Button asChild variant="outline">
          <Link href={"/dashboard"}>Back</Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <Badge>Going: {event.goingCount}</Badge>
        <Badge variant="secondary"> Maybe: {event.maybeCount}</Badge>
        <Badge variant="outline"> Not Going: {event.notGoingCount}</Badge>
      </div>

      <Card>
        <CardHeader>Invite Link</CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-[var(--muted-foreground)]">
            Share this link with guests so they can RSVP without creating an
            account.
          </p>
          {inviteUrl ? (
            <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-3 text-sm">
              {inviteUrl}
            </div>
          ) : (
            <p className="text-sm text-[var(--muted-foreground)]">
              No invite link generated yet.
            </p>
          )}

          <Form action={createInviteActionForEvent}>
            <Button type="submit">Generate Link</Button>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attendees</CardTitle>
        </CardHeader>
        <CardContent>
          {rsvps.length === 0 ? (
            <p className="text-sm text-[var(--muted-foreground)]">
              No responses yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rsvps.map((rsvp) => (
                  <TableRow key={rsvp.id}>
                    {/* <TableCell>{rsvp.name}</TableCell>
                    <TableCell>{rsvp.email}</TableCell> */}
                    <TableCell>
                      <Badge variant="secondary">
                        {rsvp.status === "not_going"
                          ? "Not Going"
                          : rsvp.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(rsvp.respondedAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
