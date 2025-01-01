# KN LionMiss

Welcome to this Node.js project 😎 It's a back for an online clothes shop 🛍️👕👗 This permits me to learn and test several techs ⚙️🛠️💻

---
- [KN LionMiss](#kn-lionmiss)
  - [1. Description](#1-description)
  - [2. Implementations](#2-implementations)
  - [3. Schemas](#3-schemas)
  - [4. Deploy](#4-deploy)
  - [5. Contribution](#5-contribution)

---

## 1. Description

This project consist on a complete back made in Node.js. The idea is -juntar several techs for learning porpouse. You can learn through this ficticial online clothe shop called LionMis. It's under construction yet, so I'm sorry for the incomplete or buggy parts

## 2. Implementations

Desc | Icon |
---------|----------|
 implemented | ✅ |
 partial implemented | ⚠️ |
 buggy | 🐞 |
 in a future... | 🍪 |

- **Model**
  - Complete model Schema ✅
  - Zod validation ✅ (Express.js middleware)
- **API Rest**
  - Express.js ✅
  - Koa 🍪
  - Swagger UI ⚠️
- **GraphQL**
  - Test bench ⚠️ (In this project)
  - Complete implementation 🍪
- **DB**
  - Data Access Layer ✅
  - Mongo official lib ✅
  - Prisma SQL ⚠️
- **Auth**
  - Middleware ✅
  - Session ✅
  - JWT ✅
  - OpenIDC 🍪
- **Tools & Deploy**
  - ESLint (complete config) ✅
  - TSConfig (complete config) ✅
  - Docker Compose (DB deploy) ✅
  - Docker Complete deploy ⚠️
  - .env files support ✅
  - NPM scripts ✅
- **Testing**
  - Fixture Generator ✅
  - Pass & Hash Generator ✅
  - Small tests in testing folder ⚠️

## 3. Schemas

Each link shows schema diagrams

- [UML Architecture](./src/docs/diagrams/uml-arch.md)
- [UML Class](./src/docs/diagrams/uml-class.md)
- [ER Schema](./src/docs/diagrams/er-sql.md)
- [Mongo Schema](./src/docs/diagrams/mongo.md)

## 4. Deploy

If you want to enjoy the app execute the following commands

```
npm install
npm docker:up
npm mongo:fix
npm build
npm start
```

You can use a browser API rest calling app or the Swaguer UI [http://localhost:3014/api-docs]([mongo-diagram.png](http://localhost:3014/api-docs)) 

## 5. Contribution

Welcome to anyone who want to improve this project. I have never worked in collabs projects, but we can stablish some rules. If you are interested contact me, build the changes in a new branch and finally we decide to included or not. O the other hand, if you make a fork for personal porpouses, contact me to show the link of that project 