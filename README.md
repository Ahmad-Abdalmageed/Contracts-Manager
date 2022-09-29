# Contracts-Manager
Serverless API Project for Contracts Management, Serverless computing is a cloud computing execution model in which the cloud provider allocates machine resources on demand, taking care of the servers on behalf of their customers. This makes it easier for developers/engineers to focus on code and don't worry about the configurations of the hardware.
This Application uses AWS Lambda which is an event-driven, Serverless computing platform provided by Amazon as a part of Amazon Web Services. It is a computing service that runs code in response to events and automatically manages the computing resources required by that code. With AWS Lambda, you are charged for every 1 millisecond (ms) your code runs, and the number of times your code is triggered. You pay for consistent throughput or execution duration, instead of by server unit.

## Pre-requisites

| Binaries | Version          |
| -------- | ---------------- |
| NodeJS   | >= 14.17.6 - LTS |
| NPM      | 8.12..1          |
| yarn     | >=1.22.19        |

Other Binaries and Versions are Included in `package.json` file. You'd also need to have Serverless installed globally on your machine. This Application is in its development stages still so it is a great idea to have your tests run offline before deploying to AWS, for this we'll need `serverless-offline` plug-in. For the Database we'll use AWS DynamoDB and for the sake of offline testing we will use the offline plugin which require the following:

- serverless@^1

- Java Runtime Engine (JRE) version 6.x or newer *OR* docker CLI client [download](https://www.oracle.com/java/technologies/downloads/#java8)

  

## Project Structure

```sh
.
├── jest.config.js
├── jest-dynamodb-config.js
├── lambdas
│   ├── common
│   │   ├── API_Responses.js
│   │   └── DynamoClient.js
│   └── endpoints
│       ├── createContract.js
│       ├── getContract.js
│       └── getContractsIDs.js
├── offline
│   └── migration
│       └── contracts.json
├── package.json
├── package-lock.json
├── README.md
├── serverless.yml
├── tests
│   ├── integrations
│   │   ├── createContract.int.test.js
│   │   ├── getContract.int.test.js
│   │   └── getContractsIDs.int.test.js
│   ├── unit
│   │   ├── API_Responses.unit.test.js
│   │   └── dynamo.unit.test.js
│   └── utils
│       ├── eventGenerator.js
│       └── validators.js
└── webpack.config.js

```

- **`jest.config.js`** && **`jest-dynamodb-config.js`**: Jest Testing Configurations 
- **`./lambdas`**: Contains the Lambda Function definitions exposing each endpoint 
- **`./tests`**: Unit and Integrations testing functionality
- **`./offline`** : Dynamodb Offline Tables Configurations
- **`webpack.config.js`** : Webpack Framework limits the amount of code deployed to AWS. 

## Installation

```sh
# Serverless 
npm install -g serverless

# Clone the Repo
git clone git@github.com:Ahmad-Abdalmageed/Contracts-Manager.git
cd ./Contracts-Manager

# Install Packages
npm install
sls dynamodb install

# Start Serverless
npm run start-offline

```

## API Reference

#### Contracts

- getContractsIDs

```http
  GET 'http://localhost:3000/getContractsIDs/'
```

- getContract

```http
  GET 'http://localhost:3000/getContract/{id}'
```

- createContract

```http
  POST 'http://localhost:3000/createContract'
```

## Testing

Well the best tool to spin up this API is to use Postman, you can setup the endpoints and pass in the payloads required. However we have a Testing Directory with all the Required Test just by running the following command:

```sh
npm run test-offline
```

This manages running a local Serverless and a DynamoDB instances and test our API with the identified Payloads

## Future Steps

The Application is running and fine but we need to define the next steps :

- **Deploying to AWS**: This requires creating an account and configuring the AWS Credentials to be used in the Serverless.yml
- **Securing the API**: Serverless provide Security for the API by locking the endpoints and accessing only by an Access Key which is set in the Serverless.yml
- **Authorizations** & **Authentication** : A great tool for this would be AWS Cognito
- **CI/CD** : Define the Continuous Integration Pipeline
- Apply a better System Design for Scaling Functionality. 
