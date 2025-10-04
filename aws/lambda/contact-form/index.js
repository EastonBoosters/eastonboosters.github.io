const AWS = require("aws-sdk");
const ses = new AWS.SES();

exports.handler = async (event) => {
  const { name, email, message } = JSON.parse(event.body);

  const params = {
    Destination: {
      ToAddresses: ["info@eastonboosters.org"],
    },
    Message: {
      Body: {
        Text: {
          Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        },
      },
      Subject: {
        Data: "New Contact Form Submission",
      },
    },
    Source: "info@eastonboosters.org",
  };

  try {
    await ses.sendEmail(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send email" }),
    };
  }
};
