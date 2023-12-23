// import type { SendEmailCommandInput } from '@aws-sdk/client-sesv2';
// import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
// import { renderedTemplate } from './templates/apple-receipt';
import { server } from './server';

// const client = new SESv2Client({
//   region: 'us-west-2',
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

// const html = renderedTemplate();

// const input: SendEmailCommandInput = {
//   // SendEmailRequest
//   FromEmailAddress: 'amanuelodicho@amanuel.dev',
//   Destination: {
//     // Destination
//     ToAddresses: [
//       // EmailAddressList
//       'tintech2013@gmail.com',
//     ],
//   },
//   // ReplyToAddresses: [""],
//   // FeedbackForwardingEmailAddress: "STRING_VALUE",
//   // FeedbackForwardingEmailAddressIdentityArn: "STRING_VALUE",
//   Content: {
//     // EmailContent
//     Simple: {
//       // Message
//       Subject: {
//         // Content
//         Data: "Mailnow's first email", // required
//         Charset: 'UTF-8',
//       },
//       Body: {
//         // Body
//         // Text: {
//         //   Data: "Hello world!", // required
//         //   Charset: "UTF-8",
//         // },
//         Html: {
//           Data: html, // required
//           Charset: 'UTF-8',
//         },
//       },
//     },
//   },
//   // ConfigurationSetName: "STRING_VALUE",
//   // ListManagementOptions: { // ListManagementOptions
//   //   ContactListName: "STRING_VALUE", // required
//   //   TopicName: "STRING_VALUE",
//   // },
// };

// server.get('/send', async (_, reply) => {
//   const response = await client.send(new SendEmailCommand(input));

//   return reply.status(200).send(response);
// });

async function main() {
	try {
		const address = await server.listen({ host: '0.0.0.0', port: 3000 });
		console.log(`Server listening at ${address}`);
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
}

main();
