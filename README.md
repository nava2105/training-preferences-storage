# training-preferences-storage

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Cassandra](https://img.shields.io/badge/Cassandra-1287B1?style=for-the-badge&logo=apache-cassandra&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge)

---

## Table of Contents
1. [General Info](#general-info)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Architecture](#architecture)
5. [Setup & Installation](#setup--installation)
6. [API Endpoints](#api-endpoints)
7. [Environment Variables](#environment-variables)
8. [Database Schema](#database-schema)

---

## General Info

`training-preferences-storage` is a **Node.js-based backend service** that enables management of user training preferences using a **Cassandra database**. It is configured as a **webhook endpoint** that processes `POST` requests for creating, updating, or retrieving user-specific training preferences for authenticated users.

The service is designed with **authentication integration** using external APIs and focuses on scalability and modularity.

---

## Features

### Key Functionalities:
1. **Training Preference Management**:
   - Create, update, and retrieve training preferences for authenticated users.
   - Training preferences include options like "days per week", "hours per day", and "availability time."

2. **Authentication & Authorization**:
   - Ensures all requests are validated using JWT authentication tokens processed through an external **Auth API**.
   - Middleware enforces secure access to routes.

3. **Cassandra Integration**:
   - Efficiently stores and manages training preference data in a scalable and resilient NoSQL database.

4. **Modular Design**:
   - Utilize Data Transfer Objects (DTOs) and Repositories for clean and maintainable code structure.

---

## Technologies

- **Node.js**: Framework for building performant, scalable server-side applications.
- **Express.js**: Web framework for building RESTful APIs.
- **Cassandra**: NoSQL database for scalable data storage.
- **Axios**: HTTP client for interacting with external APIs.
- **dotenv**: For managing application environment variables.
- **Body-Parser**: Middleware for parsing incoming request bodies.

---

## Architecture

This project follows a layered architecture for better maintainability:

1. **Controllers**:
   - Handle incoming HTTP requests and responses.
   - Encapsulate business logic using DTOs and Repositories.

2. **Middleware**:
   - Handles authentication and ensures only valid users can access the endpoints.
   - Enforces token-based access through **Auth API**.

3. **Repositories**:
   - Manages database operations with Cassandra.
   - Abstracts queries for inserting, updating, and retrieving user data.

4. **Factories**:
   - Configures the Cassandra database client and creates required tables and keyspaces.

5. **Data Transfer Objects (DTOs)**:
   - Provide a consistent structure for training preference data between different layers.

6. **Models**:
   - Define the structure of the training preferences that interact with the DTO layer.

---

## Setup & Installation

### Prerequisites
1. **Node.js**: Ensure Node.js is installed on your system.
2. **Cassandra**: Install and run Apache Cassandra locally or on a server.
3. **Environment Variables**: Ensure required variables are defined in a `.env` file (see [Environment Variables](#environment-variables)).

---

### Steps to Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nava2105/training-preferences-storage.git
   cd training-preferences-storage
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the project root and set the required configuration (see [Environment Variables](#environment-variables)).

4. **Run the application**:
   ```bash
   node server.js
   ```

5. **Access the server**:
   - The server runs locally on the default port: `http://localhost:3000`.

---

## API Endpoints

### **Base URL:** `http://localhost:3000`

The following endpoints are available:

1. **Create Training Preferences**:
   - **Method**: `POST`
   - **Path**: `/training/preferences`
   - **Description**: Creates a new training preference for the authenticated user.
   - **Example Request Body**:
     ```json
     {
       "event_type": "create",
       "data": {
         "days_per_week": 4,
         "hours_per_day": 1.5,
         "availability_start_hour": 9,
         "availability_end_hour": 11
       }
     }
     ```

2. **Update Training Preferences**:
   - **Method**: `POST`
   - **Path**: `/training/preferences`
   - **Description**: Updates an existing training preference for the user.
   - **Example Request Body**:
     ```json
     {
       "event_type": "update",
       "data": {
         "days_per_week": 5,
         "hours_per_day": 2,
         "availability_start_hour": 10,
         "availability_end_hour": 12
       }
     }
     ```

3. **Get Training Preferences**:
   - **Method**: `POST`
   - **Path**: `/training/preferences`
   - **Description**: Retrieves the training preferences associated with the authenticated user.
   - **Example Request Body**:
     ```json
     {
       "event_type": "get"
     }
     ```

---

## Environment Variables

The application requires the following variables configured in the `.env` file:

| Variable            | Description                      | Example                                      |
|---------------------|----------------------------------|----------------------------------------------|
| `PORT`              | Application's running port       | `3000`                                       |
| `KEYSPACE`          | Cassandra keyspace name          | `training_preferences`                       |
| `TABLE`             | Cassandra table name             | `training_preferences`                       |
| `CONTACT_POINTS`    | List of Cassandra contact points | `["127.0.0.1"]`                              |
| `LOCAL_DATA_CENTER` | Cassandra data center            | `datacenter1`                                |
| `AUTH_URI`          | External Auth API URI            | `http://localhost:90/api/auth/user_id/token` |

---

## Database Schema

The Cassandra table structure is defined as follows:

| **Field**                 | **Type** | **Description**                      |
|---------------------------|----------|--------------------------------------|
| `user_id`                 | `int`    | Unique user identifier (Primary Key) |
| `days_per_week`           | `int`    | Number of training days per week     |
| `hours_per_day`           | `int`    | Number of training hours per day     |
| `availability_start_hour` | `int`    | User's availability starting hour    |
| `availability_end_hour`   | `int`    | User's availability ending hour      |

---

## Notes

1. **Authentication**:
   - All API requests require a valid `Authorization` header in the format:
     ```
     Authorization: Bearer <your_token>
     ```

2. **Cassandra Setup**:
   - Ensure Cassandra is running and configured as per the `.env` file.
   - The database schema is automatically created if it doesn't exist.

3. **Error Handling**:
   - The API provides appropriate error codes and messages for malformed requests or validation failures.
