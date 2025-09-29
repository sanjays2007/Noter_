# Running This Application Locally

This is a Next.js application that uses Genkit for its AI features. To run the full application on your local machine, you need to run two separate processes in two separate terminals.

## Prerequisites

- Node.js and npm installed.
- Firebase CLI installed (`npm install -g firebase-tools`).

## Running the Application

1.  **Install Dependencies:**
    Open a terminal in the project root and run:
    ```bash
    npm install
    ```

2.  **Start the Next.js Frontend:**
    In your first terminal, run the Next.js development server:
    ```bash
    npm run dev
    ```
    This will typically start your application on `http://localhost:9002`.

3.  **Start the Genkit AI Backend:**
    **This step is crucial for any AI features to work.** Open a **second terminal** in the project root and run:
    ```bash
    npm run genkit:watch
    ```
    This starts the Genkit development server, which handles all the AI-related tasks like file analysis, summarization, etc.

With both processes running, you can now access `http://localhost:9002` in your browser, and all features, including file analysis, should work exactly as they do in the cloud environment.