# ViewCounter

This project is a simple Node.js application that tracks page views for different users and returns an SVG badge displaying the visitor count. It uses MongoDB to store the visitor count for each unique username.

## Features

- **SVG Badge Generation**: Displays visitor count in a badge format.
- **MongoDB Integration**: Stores and updates visitor counts in a MongoDB database.
- **API-based Tracking**: Tracks unique page views based on the `username` query parameter.

## Prerequisites

- Node.js
- MongoDB (locally or hosted on MongoDB Atlas)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ViewCounter.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ViewCounter
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following content:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   DB_NAME=your_database_name
   ```

5. Start the server:
   ```bash
   npm start
   ```

The server will be running on `http://localhost:3001`.

## Usage

To track visitor counts, make a `GET` request to the root endpoint with a `username` query parameter:

```bash
http://localhost:3001/?username=yourusername
```

This will return an SVG badge displaying the current page views for the specified user.

### Example Response

(todo: add screenshot here)

The badge will display the following information:

- **Page Views**: A fixed label indicating the type of statistic being displayed.
- **Visitor Count**: The current visitor count for the given username.

## API Endpoints

- **GET /**: Retrieve and increment the visitor count for a given `username` and return an SVG badge.

### Example Request

```bash
curl "http://localhost:3001/?username=exampleUser"
```

## Customization

You can modify the appearance of the badge by updating the `getBadge` function in `server.js`. The function returns an SVG string, which can be customized to suit your design needs.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---
