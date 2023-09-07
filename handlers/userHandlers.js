const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const DB_NAME = "CocktailHub";

// Connect to the MongoDB database
const dbConnect = async () => {
  try {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    return client; // Return the connected client
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

dbConnect();

// Register a new user
const registerUser = async (req, res) => {
  // Extract user registration data from the request body
  const { username, email, password } = req.body;

  // Use your MongoDB client to insert the user data into a collection (e.g., "users")
  const usersCollection = client.db(DB_NAME).collection("users");

  try {
    // Insert the user data into the collection
    const result = await usersCollection.insertOne({ username, email, password });

    // Respond with a success message and the user data
    res.status(201).json({ message: "User registered", data: result.ops[0] });
  } catch (error) {
    // Handle errors, such as duplicate emails or database issues
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  } finally {
    // Close the connection to the database
    client.close();
  }
};
  
// Login an existing user
const loginUser = async (req, res) => {
  // Extract user login credentials from the request body
  const { username, password } = req.body;

  // Use your MongoDB client to query the user data based on username
  const usersCollection = client.db(DB_NAME).collection("users");

  try {
    // Query the database to find the user by username and password (implement your validation logic)
    const user = await usersCollection.findOne({ username, password });

    if (user) {
      // Generate and send a JWT token to the client for authenticated access
      // You may want to use a library like `jsonwebtoken` to generate tokens
      // Example: const token = generateToken(user);
      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    // Handle errors, such as database issues
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login" });
  } finally {
    // Close the connection to the database
    client.close();
  }
};
  
// // Update a user's profile
// const updateUserProfile = async (req, res) => {
//   // Extract user update data from the request body
//   const { userId } = req.params; // Assuming you have a user ID in the route parameters
//   const { name, username, email, newPassword } = req.body;

//   // Use your MongoDB client to update the user's profile information
//   const usersCollection = client.db(DB_NAME).collection("users");

//   console.log("userId:", userId);
//   console.log("name:", name);
//   console.log("username:", username);
//   console.log("email:", email);
//   console.log("newPassword:", newPassword);

//   try {
//     // Update the user's email and/or password based on the provided data
//     const updateData = {};

//     if (name) {
//       updateData.name = name;
//     }

//     if (username) {
//       updateData.username = username;
//     }

//     if (email) {
//       updateData.email = email;
//     }

//     if (newPassword) {
//       updateData.password = newPassword;
//     }

//     // Perform the update operation
//     const result = await usersCollection.updateOne({ _id: userId }, { $set: updateData });

//     if (result.modifiedCount === 1) {
//       res.status(200).json({ message: "User profile updated successfully" });
//     } else {
//       res.status(404).json({ message: "User not found or no changes made" });
//     }
//   } catch (error) {
//     // Handle errors, such as database issues or validation errors
//     console.error("Error updating user profile:", error);
//     res.status(500).json({ message: "Error updating user profile" });
//   }
// };
  
// Get a user's favorite cocktails
const getUserFavorites = async (req, res) => {
  // Extract the user ID from the request parameters
  const { userId } = req.params;

  // Use your MongoDB client to fetch the user's favorite cocktails
  const usersCollection = client.db(DB_NAME).collection("users");

  try {
    // Find the user by their ID and project the "favorites" field
    const user = await usersCollection.findOne({ _id: userId }, { projection: { favorites: 1 } });

    if (user) {
      // User found, return their favorite cocktails
      const favorites = user.favorites || [];
      res.status(200).json({ favorites });
    } else {
      // User not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle errors, such as database issues
    console.error("Error fetching user favorites:", error);
    res.status(500).json({ message: "Error fetching user favorites" });
  }
};
  
// Add a cocktail to a user's favorites
const addFavorite = async (req, res) => {
  // Extract the user ID and cocktail data from the request body
  const { userId } = req.params;
  const { cocktail } = req.body;

  // Use your MongoDB client to update the user's favorites
  const usersCollection = client.db(DB_NAME).collection("users");

  try {
    // Update the user's document to add the new favorite cocktail
    const result = await usersCollection.updateOne(
      { _id: userId },
      { $push: { favorites: cocktail } }
    );

    if (result.modifiedCount === 1) {
      // Cocktail added successfully
      res.status(201).json({ message: "Cocktail added to favorites" });
    } else {
      // User not found or cocktail not added
      res.status(404).json({ message: "User not found or cocktail not added" });
    }
  } catch (error) {
    // Handle errors, such as database issues
    console.error("Error adding favorite cocktail:", error);
    res.status(500).json({ message: "Error adding favorite cocktail" });
  }
};

//get current user 
const getCurrentUser = async (req, res) => {
  // Extract the user ID from the request parameters
  const { userId } = req.params;

  // Use your MongoDB client to fetch the user's favorite cocktails
  const usersCollection = client.db(DB_NAME).collection("users");

  try {
    // Find the user by their ID and project the "favorites" field
    const user = await usersCollection.findOne({ _id: userId }, { projection: { favorites: 1 } });

    if (user) {
      // User found, return their favorite cocktails
      const favorites = user.favorites || [];
      res.status(200).json({ favorites });
    } else {
      // User not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle errors, such as database issues
    console.error("Error fetching user favorites:", error);
    res.status(500).json({ message: "Error fetching user favorites" });
  } finally {
    // Close the connection to the database
    client.close();
  }

};


 
// Remove a cocktail from a user's favorites
const removeFavorite = async (req, res) => {
  // Extract the user ID and cocktail ID from the request parameters
  const { userId, cocktailId } = req.params;

  // Use your MongoDB client to update the user's favorites
  const usersCollection = client.db(DB_NAME).collection("users");

  try {
    // Update the user's document to remove the specified cocktail from favorites
    const result = await usersCollection.updateOne(
      { _id: userId },
      { $pull: { favorites: { id: cocktailId } } }
    );

    if (result.modifiedCount === 1) {
      // Cocktail removed successfully
      res.status(200).json({ message: "Cocktail removed from favorites" });
    } else {
      // User not found or cocktail not removed
      res.status(404).json({ message: "User not found or cocktail not removed" });
    }
  } catch (error) {
    // Handle errors, such as database issues
    console.error("Error removing favorite cocktail:", error);
    res.status(500).json({ message: "Error removing favorite cocktail" });
  }
};
  
  module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    // updateUserProfile,
    getUserFavorites,
    addFavorite,
    removeFavorite,
  };