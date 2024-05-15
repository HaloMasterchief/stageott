// tests/myList.test.ts
import request from "supertest";
import app from "../app";
import MyListItem from "../models/MyListItem";

describe("My List API", () => {
  let userId: string;

  beforeAll(async () => {
    // Create a user for testing purposes
    const response = await request(app)
      .post("/users")
      .send({ username: "testuser" });
    userId = response.body.id;
  });

  afterAll(async () => {
    // Clean up test data after all tests are finished
    await MyListItem.deleteMany({ userId });
  });

  it("should add an item to the list", async () => {
    const contentId = "movie123"; // Example content ID
    const response = await request(app)
      .post(`/my-list/${userId}/add`)
      .send({ contentId });

    expect(response.status).toBe(201);
    expect(response.body.userId).toBe(userId);
    expect(response.body.contentId).toBe(contentId);
  });

  it("should return an error when adding a duplicate item to the list", async () => {
    const contentId = "movie123"; // Existing content ID from previous test
    const response = await request(app)
      .post(`/my-list/${userId}/add`)
      .send({ contentId });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Item already exists in the list");
  });

  it("should remove an item from the list", async () => {
    const contentId = "movie123"; // Existing content ID from previous tests
    const response = await request(app).delete(
      `/my-list/${userId}/remove/${contentId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.userId).toBe(userId);
    expect(response.body.contentId).toBe(contentId);
  });

  it("should return an error when removing a non-existent item from the list", async () => {
    const nonExistentContentId = "nonexistent123";
    const response = await request(app).delete(
      `/my-list/${userId}/remove/${nonExistentContentId}`
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Item not found in the list");
  });

  it("should list items in the list", async () => {
    // Add items to the list for testing listing
    await MyListItem.create({ userId, contentId: "movie1" });
    await MyListItem.create({ userId, contentId: "movie2" });

    const response = await request(app).get(`/my-list/${userId}/list`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].userId).toBe(userId);
    expect(response.body[1].userId).toBe(userId);
  });

  it("should paginate items in the list", async () => {
    // Add more items to the list for testing pagination
    await MyListItem.create({ userId, contentId: "movie3" });
    await MyListItem.create({ userId, contentId: "movie4" });
    await MyListItem.create({ userId, contentId: "movie5" });

    const response1 = await request(app).get(
      `/my-list/${userId}/list?page=1&limit=2`
    );
    const response2 = await request(app).get(
      `/my-list/${userId}/list?page=2&limit=2`
    );

    expect(response1.status).toBe(200);
    expect(response1.body.length).toBe(2);
    expect(response2.status).toBe(200);
    expect(response2.body.length).toBe(1);
  });
});
