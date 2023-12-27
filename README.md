<div align="center">
    <a href="https://www.cam.ac.uk/">
        <img src="https://www.cam.ac.uk/sites/www.cam.ac.uk/files/inner-images/logo.jpg" width="128px" />
    </a>
    <h1>Cambridge University Bot Interaction & LLMS Experiment Platform</h1>
    <p>An innovative platform for conducting experiments in user interaction with bots and Language Learning & Modeling Systems (LLMS).</p>
</div>

## 🌍 Project Overview

This platform, developed in collaboration with Cambridge University, is designed to facilitate advanced research in the field of user-bot interactions and LLMS models. It offers a comprehensive environment for conducting, monitoring, and analyzing experiments in this cutting-edge domain.

## 🚀 Quick Start

To set up and start using the project, follow these steps:

### Step 1: Set Up MongoDB Database

Before setting up the project, you'll need a MongoDB database. You can set this up locally on your machine, or use MongoDB Atlas for a cloud-based solution.

- **Setting up MongoDB Locally:**
  Follow [this guide](https://docs.mongodb.com/manual/installation/) to install MongoDB locally on your system.

- **Setting up MongoDB on Atlas:**
  MongoDB Atlas offers a cloud-based solution. You can set up a free cluster following [this guide](https://docs.atlas.mongodb.com/getting-started/).


### Step 2: Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
```

### Step 3: Install Dependencies

- For the client:
  ```bash
  cd client
  npm install
  ```

- For the server:
  ```bash
  cd server
  npm setup
  ```

Answer the necessary details when prompted during the server setup.

### Step 4: Running the Project

- For the Client:
    ```bash
    cd client
    npm start
    ```

**client will run on: http://localhost:3000**

- For the Server:
    ```bash
    cd server
    npm run dev
    ``` 
**server will run on: http://localhost:5000**

### Setup Process Details

During the setup process, you'll be guided through a series of prompts to configure your environment:

- `OPENAI_API_KEY`: Enter your OpenAI API key.
- `MONGODB_USER`: Enter the MongoDB username.
- `MONGODB_PASSWORD`: Enter the password for MongoDB.
- `MONGODB_URL`: Provide the MongoDB URL.
- `MONGODB_DB_NAME`: Specify the name of your MongoDB database.

Additionally, the setup script will guide you in creating an administrative user for your system. You'll need to provide a username and password for this user.

### Functions of the Setup Script

The setup script automates several important tasks to get your server up and running:

- **Configures Environment Variables**: 
  - It creates a `.env` file containing essential environment variables like your OpenAI API key, MongoDB credentials, and other necessary configurations.
- **Installs Dependencies**: 
  - Executes `npm install` to install all the necessary npm packages that the server requires to function properly.
- **Builds the Project**: 
  - Runs the build process for your TypeScript code, compiling it and preparing your server for execution.
- **Initializes Admin User**: 
  - Creates an admin user within your system using the credentials you provide, facilitating immediate access to admin-level features.

This comprehensive setup ensures that all necessary components are correctly configured, laying the foundation for a smooth and efficient operation of the server.

## 🌐 Deployment

Deploying this project can be done in two different ways depending on your needs. Here's a guide for both methods:

### Method 1: Separate Deployment for Client and Server

This method involves hosting the client and server on different platforms. For instance, deploying the client on Firebase Hosting and the server on a platform like Render.

#### Deploying the Client to Firebase Hosting

1. **Prepare the Client for Deployment**:
   - Ensure your client application is production-ready.
   - Set up `firebase.json` and other necessary configurations.
   - Include a `build` script in your `package.json`.
2. **Deploy**:
   - Follow the instructions in [this guide to Firebase Hosting](https://firebase.google.com/docs/hosting) to deploy your client application.

#### Deploying the Server to Render

1. **Prepare the Server for Deployment**:
   - Confirm that your server has all necessary dependencies and is ready for deployment.
   - Make sure it listens on the `PORT` environment variable provided by Render.
2. **Deploy**:
   - Use [this guide to Render](https://render.com/docs/deploy-node-express-app) for deploying your server application.

#### Configuring Environment Variables

- **Client**:
  - In your client directory, create a `.env.production` file and include the server's address.
- **Server**:
  - Set up the necessary environment variables in the settings of your Render dashboard for the server.

### Method 2: Combined Deployment for Client and Server

This approach involves deploying both the client and server together on the same server, using a platform like Render.

#### Deploying Both Client and Server to Render

1. **Prepare for Deployment**:
   - Adjust your project structure to serve both client and server from the same codebase.
   - Configure the server to serve the client's static files.
2. **Deploy**:
   - Follow [this Render deployment guide](https://render.com/docs/deploy-node-express-app), ensuring your server serves your client application's static files.

#### Configuring Environment Variables

- **Server**:
  - In Render's dashboard, under your application settings, add the necessary environment variables.
- **Client**:
  - If your client application needs to know the server's address, configure it during the build process, or use relative URLs for API calls.

---

Adapt these instructions as necessary to fit your project's specific setup and configuration. The deployment process can vary depending on the particulars of your client and server architecture.

## 📘 Documentation

For detailed information about setting up and using the platform, please refer to our [documentation](#).

## 🛠️ Contributing

Interested in contributing? We value your input and contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for information on how to get started.

## 🔗 Useful Links

- [Project Homepage](https://www.cam.ac.uk/)
- [Research Paper](#) (Link to related research papers or articles)

## 📄 License

This project is licensed under the [Cambridge University License](LICENSE.md).

## 📞 Contact

For any inquiries or further information, reach out to us at [contact@cam.ac.uk](mailto:contact@cam.ac.uk).

## 👍 Show Your Support

Give a ⭐️ if this project helped you! Your support encourages us tremendously.
