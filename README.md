# AI Interview Platform

Welcome to the AI Interview Platform, an AI-driven tool designed to help you prepare for job interviews by generating questions based on job descriptions and providing feedback on your answers. This project is a clone of [Interviews by AI](https://interviewsby.ai/), an excellent platform for AI-powered interview preparation.

## Features

-   **AI-Generated Questions**: Select a job description and get AI-generated questions tailored to that role.
-   **Instant Feedback**: Receive immediate feedback on your responses along with sample answers.
-   **Interview Summary**: Get a summary of your interview performance, including an assessment of your answers.

## Technology Stack

-   **Framework**: Next.js
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS, ShadCN
-   **ORM**: Drizzle ORM
-   **Database**: Neon PostgreSQL
-   **AI Integration**: Bard AI

## Getting Started

### Prerequisites

-   Node.js
-   PostgreSQL

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/tier3guy/interview-genie
    cd interview-genie
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up the PostgreSQL database:

    ```bash
    # Create a new database
    createdb ai_interview_platform

    # Run database migrations
    npm run migrate
    ```

4. Create a `.env` file and add your configuration:

    ```env
    DATABASE_URL=postgres://user:password@localhost:5432/ai_interview_platform
    GEMINI_API_KEY=your_bard_ai_api_key
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Select a job description from the list.
2. Answer the AI-generated interview questions.
3. Receive instant feedback and sample responses.
4. At the end of the interview, review the summary of your performance.

## Contributing

We welcome contributions! Please see our [Code of Conduct](./CODE_OF_CONDUCT.md) and [Contributing Guidelines](./CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE.md](./LICENSE.md) file for details.

## Acknowledgements

Special thanks to [Interviews by AI](https://interviewsby.ai/) for inspiring this project.

## Contact

For any questions or feedback, please open an issue or contact us at [avinashgupta.works@gmail.com](mailto:avinashgupta.works@gmail.com).
