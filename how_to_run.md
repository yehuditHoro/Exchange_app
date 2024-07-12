# How to Run This Project

This guide will help you set up and run the Exchange Rates Website project, which requires Python, Node.js, and several packages. Follow the steps below to get started:

## Prerequisites

- **Python 3.x**: Make sure Python is installed on your system. You can download it from the [official Python website](https://www.python.org/downloads/).
- **Node.js and npm**: Ensure Node.js and npm are installed. They can be downloaded from the [official Node.js website](https://nodejs.org/).

## Installation Steps

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/GittyRabinowitz/Exchange-Rates-Website.git
    ```

2. **Navigate to the Project Directory**:

    ```bash
    cd Exchange-Rates-Website
    ```

### Running Locally

#### Server Setup

3. **Navigate to the Server Directory**:

    ```bash
    cd server
    ```

4. **Create a Virtual Environment (Optional but Recommended)**:

    ```bash
    python3 -m venv venv
    ```

5. **Activate the Virtual Environment**:

    - On Windows:

      ```bash
      venv\Scripts\activate
      ```

    - On macOS/Linux:

      ```bash
      source venv/bin/activate
      ```

6. **Set Environment Variables (Replace with Your Actual API Key)**:

    ```bash
    export EXCHANGE_RATE_API_KEY="your_actual_api_key_here"
    ```

    - On Windows PowerShell:

      ```powershell
      $env:EXCHANGE_RATE_API_KEY="your_actual_api_key_here"
      ```

7. **Install Python Dependencies**:

    ```bash
    pip install -r requirements.txt
    ```

#### Client Setup

8. **Navigate to the Client Directory**:

    ```bash
    cd ../client
    ```

9. **Install Node.js Dependencies**:

    ```bash
    npm install
    ```

## Running the Project Locally

1. **Start the FastAPI Server**:

    ```bash
    cd ../server
    uvicorn main:app --reload
    ```

2. **Start the Client Application**:

    ```bash
    cd ../client
    npm run dev
    ```

## Additional Notes

- **Configuration**: Adjust environment variables in the `.env` file located in the `server` directory to customize API keys and other settings.
- **Further Information**: For detailed instructions on customization, testing, deployment, and more, refer to the `README.md` file.
