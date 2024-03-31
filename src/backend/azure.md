---
icon: pen-to-square
date: 2024-03-26
category:
  - backend
tag:
  - DevOps
  - Azure
---

# Azure and DevOps

## What is DevOps

DevOps combines development (Dev) and operations (Ops) to increase the efficiency, speed, and security of software development and delivery compared to traditional process. DevOps is the union of people, process, and products to enable continuous delivery of value to our customers. A sign of a healthy DevOps practice is when everyone works together with a shared set of practices and tools. Essential DevOps practices include agile planning, continuous integration, continuous delivery, and monitoring of applications.

- **Continuous Integration (CI)**: CI is practice of frequently merging code changes from multiple contributors into a main branch of a shared repository. Automated builds and tests are run to detect integration issues early. This allows teams to deliver software more rapidly while mitigating bugs.

- **Continuous Delivery (CD)**: CD is the natural extension of continuous integration, where code changes that pass the automated tests are automatically released into a production or staging environment. This enables frequent, low-risk software development and faster feedback loops.

- **Containerization**: Containerization is the packaging of software code along with its dependencies and configurations into a single image that can run consistently in different environments. Docker is the most popular containerization platform.

## Azure Container Apps:

Azure Container Apps is a fully managed container service in Azure that allows us to build and deploy modern, containerized applications quickly and efficiently. It provides serverless computing experience, where we don't need to provision or manage any underlying infrastructure.

## Azure Container Registry (ACR):

Azure Container Registry is a private, managed container registry service provided by Azure. It allows us to build, store, and manage container images securely in the cloud.

- private, secure container image storage
- support for Docker and Open Container Initiative images
- Image scanning for vulnerabilities

## How they work together:

When building and deploying containerized applications in Azure, we typically use Azure Container Registry to store and manage our container images. We can build and push our container images to ACR, and then deploy those images to Azure Container Apps or other Azure container services like ASK or ACI.
