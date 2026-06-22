"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
// import { RSVPstatus } from "../generated/prisma/enums";
import { RSVPstatus } from "@/app/generated/prisma/enums";




function parseCreateEvent(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (title.length < 3 || title.length > 120) {
    throw new Error("Title must be between 3 and 120 characters.");
  }
  const description = String(formData.get("description") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const eventDate = String(formData.get("eventDate") ?? "").trim();
  return {
    title,
    description: description.length ? description.slice(0, 2000) : null,
    location: location.length ? location.slice(0, 200) : null,
    eventDate: eventDate.length ? eventDate : null,
  };
}



const RSVP_STATUSES = ["going", "maybe", "not_going"] as const;

function isRsvpStatus(s: string): s is RSVPstatus {
  return (RSVP_STATUSES as readonly string[]).includes(s);
}

function parseRsvp(formData: FormData) {
  // const name = String(formData.get("name") ?? "").trim();
  // if (name.length < 2 || name.length > 120) {
  //   throw new Error("Name must be between 2 and 120 characters.");
  // }
  // const email = String(formData.get("email") ?? "").trim();
  // if (email.length < 3 || email.length > 320 || !email.includes("@")) {
  //   throw new Error("Please enter a valid email.");
  // }
  const status = String(formData.get("status") ?? "").trim();
  if (!isRsvpStatus(status)) {
    throw new Error("Invalid RSVP status.");
  }
  return { status };
}



export async function createEventAction(formData: FormData) {
//   const userId = session.data.user.id;
  const input = parseCreateEvent(formData);

  try {
    const created = await prisma.event.create({
      data: {
        id: randomUUID(),
        owner_uid: "1",
        title: input.title,
        description: input.description,
        location: input.location,
        event_date: input.eventDate ? new Date(input.eventDate) : null,
      },
    });
    redirect(`/events/${created.id}`);
  } catch (err) {
    console.error(err);
  }
}



export async function createInviteLinkAction(eventId: string) {
  // const session = await getSession();
  // const userId = session.data.user.id;

  const owns = await prisma.event.findFirst({
    // where: { id: eventId, ownerUserId: userId },
    select: { id: true },
  });

  if (!owns) {
    throw new Error("Event not found.");
  }

  const token = crypto.randomUUID().replace(/-/g, "");

  await prisma.eventInvite.upsert({
    where: { eventId },
    create: { eventId, token },
    update: { token },
  });
}
  

export async function submitOrUpdateRsvpAction(
  token: string,
  formData: FormData,
) {
  const input = parseRsvp(formData);

  const invite = await prisma.eventInvite.findFirst({
    where: { token },
    select: {
      id: true,
      events: {
        select: { id: true },
      },
    },
  });

  if (!invite) {
    throw new Error("Invite link is invalid.");
  }

  const eventId = invite.events.id;
  // const emailNormalized = input.email.toLowerCase();

  await prisma.eventRsvp.upsert({
    where: {
      // eventId_emailNormalised: {
      //   eventId,
      //   emailNormalized,
      // },
      eventId
    },

    create: {
      eventId,
      inviteId: invite.id,
      // name: input.name,
      // email: input.email,
      // emailNormalized,
      status: input.status as RSVPstatus,
    },
    update: {
      // name: input.name,
      status: input.status as RSVPstatus,
      responded_at: new Date(),
    },
  });

  // await prisma.eventRsvp.upsert({
  //   where:{
  //     eventId
  //   }
  // })

  redirect(`/invite/${token}?submitted=1`);
}
