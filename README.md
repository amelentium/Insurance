# Insurance Microservices project
EMIL Group Full-stack Developer Test Assignment.

## Challenge
Task is to implement a nodejs service that is responsible for saving and managing
data for claims/damages based on insurance contracts.

The main parts of the project:
- [ ] Front-end;
- [x] REST API Gateway;
- [x] gRPC Service;
- [x] Database;

Criteria for evaluation:
- Clean code and general code structure (separation of concerns);
- Authentication;
- Logging;
- Containerization;
- Code quality (unit/integration/performance testing and maintainability);
- Design and error handling;
- Data management;
- Build Script/CI.

## Setup Guide
First of all, run ```node ci``` to install all dependencies.

To launch the application, execute the ```npm run launch``` from the ```Insurance-microservices``` folder.
Or run in Docker by executing the ```docker-compose up``` command from the ```Insurance``` root folder.

Also, don't forget to apply the database migrations by running the ```npm run migrate``` command.

---

Best regards, Andrii
