import {
  SESv2Client,
  SendEmailCommand,
  SendEmailCommandInput,
} from "@aws-sdk/client-sesv2";
import fastify from "fastify";
import { renderedTemplate } from "./templates/apple-receipt";

const server = fastify();

const client = new SESv2Client({
  region: "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const html = renderedTemplate();

const input: SendEmailCommandInput = {
  // SendEmailRequest
  FromEmailAddress: "amanuelodicho@amanuel.dev",
  Destination: {
    // Destination
    ToAddresses: [
      // EmailAddressList
      "tintech2013@gmail.com",
    ],
  },
  // ReplyToAddresses: [""],
  // FeedbackForwardingEmailAddress: "STRING_VALUE",
  // FeedbackForwardingEmailAddressIdentityArn: "STRING_VALUE",
  Content: {
    // EmailContent
    Simple: {
      // Message
      Subject: {
        // Content
        Data: "Mailnow's first email", // required
        Charset: "UTF-8",
      },
      Body: {
        // Body
        // Text: {
        //   Data: "Hello world!", // required
        //   Charset: "UTF-8",
        // },
        Html: {
          Data: html, // required
          Charset: "UTF-8",
        },
      },
    },
  },
  // ConfigurationSetName: "STRING_VALUE",
  // ListManagementOptions: { // ListManagementOptions
  //   ContactListName: "STRING_VALUE", // required
  //   TopicName: "STRING_VALUE",
  // },
};

server.get("/send", async (request, reply) => {
  const response = await client.send(new SendEmailCommand(input));

  return reply.status(200).send(response);
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
