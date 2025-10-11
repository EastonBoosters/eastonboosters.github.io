// Mock AWS SDK
const mockPut = jest.fn();
const mockSendEmail = jest.fn();

jest.mock("aws-sdk", () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => ({
        put: mockPut,
      })),
    },
    SES: jest.fn(() => ({
      sendEmail: mockSendEmail,
    })),
  };
});

const { handler } = require("./index");

describe("Contact Form Lambda", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockPut.mockClear();
    mockSendEmail.mockClear();

    // Set up mock implementations for promises
    mockPut.mockReturnValue({ promise: () => Promise.resolve() });
    mockSendEmail.mockReturnValue({ promise: () => Promise.resolve() });

    // Set environment variables
    process.env.TABLE_NAME = "test-table";
    process.env.SES_EMAIL = "test@example.com";
  });

  const validEvent = {
    httpMethod: "POST",
    body: JSON.stringify({
      name: "Test User",
      email: "test@example.com",
      message: "This is a test message.",
    }),
  };

  it("should save to DynamoDB and send an email on valid submission", async () => {
    const response = await handler(validEvent);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe("Submission successful!");

    // Check if DynamoDB's put was called
    expect(mockPut).toHaveBeenCalledTimes(1);
    const dynamoParams = mockPut.mock.calls[0][0];
    expect(dynamoParams.TableName).toBe("test-table");
    expect(dynamoParams.Item.name).toBe("Test User");

    // Check if SES's sendEmail was called
    expect(mockSendEmail).toHaveBeenCalledTimes(1);
    const sesParams = mockSendEmail.mock.calls[0][0];
    expect(sesParams.Destination.ToAddresses[0]).toBe("test@example.com");
    expect(sesParams.Source).toBe("test@example.com");
  });

  it("should return 400 if required fields are missing", async () => {
    const event = {
      httpMethod: "POST",
      body: JSON.stringify({ name: "Test User" }), // Missing email and message
    };
    const response = await handler(event);

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toContain(
      "Missing required fields"
    );
    expect(mockPut).not.toHaveBeenCalled();
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it("should return 500 if DynamoDB put fails", async () => {
    // Suppress console.error for this test
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mockPut.mockReturnValue({
      promise: () => Promise.reject(new Error("DynamoDB error")),
    });

    const response = await handler(validEvent);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body).message).toContain("internal error");
    expect(mockPut).toHaveBeenCalledTimes(1);
    expect(mockSendEmail).not.toHaveBeenCalled();

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  it("should return 500 if SES sendEmail fails", async () => {
    // Suppress console.error for this test
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mockSendEmail.mockReturnValue({
      promise: () => Promise.reject(new Error("SES error")),
    });

    const response = await handler(validEvent);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body).message).toContain("internal error");
    expect(mockPut).toHaveBeenCalledTimes(1);
    expect(mockSendEmail).toHaveBeenCalledTimes(1);

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});
