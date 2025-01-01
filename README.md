# KN KionMiss Back

Welcome to this Node.js project 😎 It's a back for an online clothes shop 🛍️👕👗 This permits me to learn and test several techs ⚙️🛠️💻

---

- [KN KionMiss Back](#kn-kionmiss-back)
  - [1. Description](#1-description)
  - [2. Techs](#2-techs)
  - [3. Architecture](#3-architecture)
    - [3.1. UML Architecture](#31-uml-architecture)
    - [3.2. UML Class](#32-uml-class)
    - [3.3 ER Schema](#33-er-schema)
    - [3.4. Mongo Schema](#34-mongo-schema)
  - [4. Deploy](#4-deploy)
  - [5. Contribution](#5-contribution)


---

## 1. Description

This project consist on a complete back made in Node.js. The idea is -juntar several techs for learning porpouse. You can learn through this ficticial online clothe shop called LionMis. It's under construction yet, so I'm sorry for the incomplete or buggy parts

## 2. Techs


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

## 3. Architecture

### 3.1. UML Architecture

This schema shows the diferent app parts. Pay attention to following:
- Data Access layer: One inetrface and several DB implementations which they must to respect it. This is a very good software practice but sadly ignored...
- The previous data access layer is apoyada ina whole model domaind. The data base schemes for several techs are based respecting this domain.
- Through env bars you can switch between techs for api, data-access and auth systems.

[picture]


### 3.2. UML Class

This is a complete domaind model of the online shop

[picture]

### 3.3 ER Schema

The SQL data base has this scheme

[picture]

Here you can find the SQL scripts.

### 3.4. Mongo Schema

This is the MongoDB document structure

[picture]

## 4. Deploy

If you want to enjoy the app execute the following commands

```
npm install
npm docker:up
npm mongo:fix
npm build
npm start
```

## 5. Contribution

Welcome to anyone who want to improve this project. I have never worked in collabs projects, but we can stablish some rules. If you are interested contact me, build the changes in a new branch and finally we decide to included or not. O the other hand, if you make a fork for personal porpouses, contact me to show the link of that project 