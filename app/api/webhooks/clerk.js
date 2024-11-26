import { Webhook } from "svix";
import { db } from "../../../utils/dbConfig"; // Adjust the import based on your structure
import { User } from "../../../utils/schema"; // Adjust the import based on your structure

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

async function validateRequest(request) {
  const payloadString = await request.text();
  const svixHeaders = {
    "svix-id": request.headers.get("svix-id"),
    "svix-timestamp": request.headers.get("svix-timestamp"),
    "svix-signature": request.headers.get("svix-signature"),
  };

  const wh = new Webhook(webhookSecret);
  return wh.verify(payloadString, svixHeaders);
}

export async function POST(request) {
  const payload = await validateRequest(request);

  if (payload.type === "user.created") {
    const { id, email, firstName, lastName } = payload.data;

    // Insert user into your database
    await db.insert(User).values({
      user_name: `${firstName} ${lastName}`,
      email: email,
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ message: "User created" }), { status: 200 });
  }

  return new Response(JSON.stringify({ message: "Event not handled" }), { status: 400 });
}