import { Next } from "jsr:@oak/oak/middleware";
import { Context } from "jsr:@oak/oak/context";

const env = Deno.env.toObject();

export const sendHandler = async (
  { response, request }: Context,
  next: Next
) => {
  try {
    const body = await request.body.json();
    const mailingResponse = await fetch(
      `${env.MAILING_SERVICE_URL}${env.LOGIN}`,
      {
        method: "POST",
        headers: {
          Authorization: `sendsay apikey=${env.API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "issue.send",
          letter: {
            subject: env.SUBJECT,
            "from.name": env.SOURCE_NAME,
            "from.email": env.SOURCE_MAIL,
            message: body,
          },
          group: "personal",
          email: env.EMAIL_RECIPIENT,
          sendwhen: "now",
        }),
      }
    );

    const mailingResponseBody = await mailingResponse.json();
    if (mailingResponseBody.errors) {
      response.status = 500;
      response.body = JSON.stringify({ error: mailingResponseBody.error });
    }

    response.status = 200;
  } catch (error) {
    response.status = 503;
    response.body = JSON.stringify({ error: error });
  }

  await next();
};
