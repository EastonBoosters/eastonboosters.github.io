const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES();

exports.handler = async (event) => {
  const { TABLE_NAME, SES_EMAIL } = process.env;

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Allow': 'POST' },
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid JSON format in request body.' }),
    };
  }

  const { name, email, message } = data;

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields: name, email, and message.' }),
    };
  }

  const dynamoParams = {
    TableName: TABLE_NAME,
    Item: {
      id: new Date().toISOString(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    },
  };

  const sesParams = {
    Destination: {
      ToAddresses: [SES_EMAIL],
    },
    Message: {
      Body: {
        Text: {
          Data: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        },
      },
      Subject: {
        Data: 'New Contact Form Submission from Easton Boosters Website',
      },
    },
    Source: SES_EMAIL,
  };

  try {
    await dynamoDb.put(dynamoParams).promise();
    await ses.sendEmail(sesParams).promise();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Enable CORS
      },
      body: JSON.stringify({ message: 'Submission successful!' }),
    };
  } catch (error) {
    console.error('Error processing submission:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Enable CORS for errors too
      },
      body: JSON.stringify({ message: 'An internal error occurred. Please try again later.' }),
    };
  }
};
