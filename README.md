# Microservices Local Setup

This repository contains three independent applications:

- **product-service** – NestJS microservice
- **order-service** – NestJS microservice
- **client-app** – Next.js (TypeScript) frontend

Each service has its own `package.json` and runs independently.

---

## Prerequisites

Make sure the following are installed on your system:

- **Node.js**
- **npm**

---

## Project Structure

```
assignment-microservices/
├── product-service/
├── order-service/
├── client-app/
```

---

## 1. Install Dependencies

Run the following commands **inside each folder**.

### Product Service

```bash
cd product-service
npm install
```

### Order Service

```bash
cd ../order-service
npm install
```

### Client App (Next.js)

```bash
cd ../client-app
npm install
```

---

## 2. Run the Applications Locally

Open **three terminals** and run each service separately.

### Start Product Service

```bash
cd product-service
npm run start:dev
```

---

### Start Order Service

```bash
cd order-service
npm run start:dev
```

---

### Start Client App (Next.js)

```bash
cd client-app
npm run dev
```

---

## 3. Access the Application

- Frontend: **http://localhost:3000**
- Backend services run in the background and are consumed by the frontend or API layer

---
