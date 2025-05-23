# School Management API

A Node.js RESTful API built with Express.js and MySQL to manage school data.  
The API allows users to add new schools and retrieve a list of schools sorted by proximity to a given location.

## Database Setup

Create a MySQL database and run the following query to create the `schools` table:

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```
## API Endpoints

### 1. Add School

- **URL:** `/addSchool`  
- **Method:** POST  
- **Payload Example:**

```json
{
  "name": "Green Valley School",
  "address": "456 Hill Road",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```
Success Response:

```json
{
  "message": "School added successfully",
  "schoolId": 1
}
```
## 2. List Schools
URL: /listSchools

Method: GET

Query Parameters:

latitude (required): User's latitude as a number

longitude (required): User's longitude as a number

Example Request:

```
GET /listSchools?latitude=40.7128&longitude=-74.0060
```
Success Response:

```json
{
  "schools": [
    {
      "id": 1,
      "name": "Green Valley School",
      "address": "456 Hill Road",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "distance": 0.00
    },
    {
      "id": 2,
      "name": "Another School",
      "address": "789 Oak St",
      "latitude": 40.7306,
      "longitude": -73.9352,
      "distance": 7.53
    }
  ]
}
```
Errors:

Missing or invalid latitude/longitude parameters will return a 400 Bad Request with an appropriate error message.

## Installation
Clone the repository:
```
git clone https://github.com/your-username/your-repo.git
cd your-repo
```
Install dependencies:
```
npm install
```
Set up your MySQL database and update the configuration in config/db.js with your credentials.

Running the Server
Start the server with:
```
node server.js
```
By default, it runs on http://localhost:3001.

## Testing
You can test the APIs using tools like Postman or any API client.

Import the provided Postman collection to quickly test all endpoints.

Make sure to provide latitude and longitude query parameters when listing schools.

Use valid JSON bodies when adding schools.

## Hosting
To host the API on a cloud platform, you can use services like:

Heroku

AWS Elastic Beanstalk

DigitalOcean

Render

Make sure your MySQL database is accessible from your hosting environment or use managed database services.

## Postman Collection
A Postman collection is included in the repository (SchoolManagementAPI.postman_collection.json) containing:

Add School API example requests

List Schools API example requests

Documentation of expected responses

Share this collection with stakeholders for easy testing.

## License
This project is licensed under the MIT License.

