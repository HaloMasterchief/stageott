// scripts/initialData.ts
import mongoose from "mongoose";
import User from "../models/Users";
import Movie from "../models/Movie";
import TVShow from "../models/TVShow";
import MyListItem from "../models/MyListItem";

async function createInitialData() {
  // Connect to MongoDB
  await mongoose.connect("mongodb://localhost:27017/stage", {});

  // Create sample users
  const user2 = await User.create({
    id: "user2",
    username: "user2",
    preferences: {
      favoriteGenres: ["Action", "SciFi"],
      dislikedGenres: ["Horror"],
    },
    watchHistory: [],
  });

  // Create sample movies
  const movie2 = await Movie.create({
    id: "movie2",
    title: "Movie 1",
    description: "Description for Movie 1",
    genres: ["Action", "SciFi"],
    releaseDate: new Date(),
    director: "Director 1",
    actors: ["Actor 1", "Actor 2"],
  });

  // Create sample TV shows
  const tvShow2 = await TVShow.create({
    id: "tvShow2",
    title: "TV Show 1",
    description: "Description for TV Show 1",
    genres: ["Action", "SciFi"],
    episodes: [
      {
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date(),
        director: "Director 1",
        actors: ["Actor 1", "Actor 2"],
      },
    ],
  });

  // Create sample list items
  await MyListItem.create({ userId: user2.id, contentId: movie2.id });
  await MyListItem.create({ userId: user2.id, contentId: tvShow2.id });

  console.log("Initial data created successfully");
}

// Call the function to create initial data
createInitialData().then(() => {
  // Close MongoDB connection after data creation
  mongoose.connection.close();
});
