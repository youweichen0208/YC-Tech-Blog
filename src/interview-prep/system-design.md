---
icon: pen-to-square
date: 2024-05-13
category:
  - interview
tag:
  - system design
---

# System Design

## What is system design?

System design is the process of defining the architecture, interfaces, and data for a system that satisfies particular requirements.

### Functional Requirements:

Functional requirements are requirements the system has to deliver. These are the main goals of the system.

### Non-Functional Requirements:

Non-functional requirements restrict the system design through different qualities. They need to be analyzed, and if they are not fulfilled, they will harm the business plan or goals. Non-functional requirements include performance, security, reliability, scalability, maintainability, availability, etc.

## Case 1: Proximity Service

A proximity service is used to discover nearby places such as restaurants, hotels, theaters, museums, etc., and is a core component that powers features like finding the best restaurants nearby on the app.

### Step 1: understand the problem and establish Design Scope

#### Functional Requirements:

1. Return all business based on a user's location (latitude and longtitude pair) and radius.
2. Business owners can add, delete, or update a business, but this information doesn't need to be reflected in real-time.
3. Customers can view detailed information about a business.

#### Non-functional requirements:

1. Low-latency: users should be able to see nearby businesses quickly.
2. Data privacy: Location info is sensitive data.
3. High availability and scalability: we should ensure our system can handle the spike in traffic during peak hours in densely populated areas.

## Propose High-Level Design and Get Buy-in

### Data Model:

#### Read/write Ratio:

Read volumn is high because the following two features are commonly used:

1. Search for nearby business.
2. View the detailed information of a business

For a read-heavy system, a relational database such as MySQL and SQL Server can be a good fit.

#### Data Schema:

The key database tables are the business table and the geospatial (geo) index table.

- Business table contains detailed information about a business
- A geo index table is used for the efficient processing of spatial operations.

### High-level design:

The system comprises two parts: location-based service (LBS) and business related service.

#### Load balancer

The load balancer automatically distributes incoming traffic across multiple services. Normally, a company provides a single DNS entry point and internally routes the API calls to the appropriate services based on the URL paths.

#### Location-based service (LBS):

The LBS service is the core part of the system which finds nearby businesses for a given radius and location. The LBS has the following characteristics:

- it's a read-heavy service with no write requests.
- QPS is high, especially during peak hours dense areas.

#### Business Service:

Business service mainly deals with two types of requests:

- Business owners create, update, or delete businesses. Those requests are mainly write operations, and the QPS is not high.
- Customers view detailed information about a business. QPS is high during peak hours.

#### Database Cluster:

The database cluster can use the primary-secondary setup. In this setup, the primary database handles all the write operations, and multiple replicas are used for read operations. Data is saved to the primary database first and then replicated to replicas. Due to the replication delay, there might be some discrepancy between data read by the LBS and the data written to the primary database. This inconsistency is usually not an issue because business information doesn't need to be updated in real-time.

### Algorithms to fetch nearby businesses:

#### What is spatial indexing?

spatial indexing refers to the process of organizing and structuring geographic data in such a way that enables efficient retrieval of nearby objects or points based on their spatial relationships. Spatial indexing allows users to quickly identify and connect with other users who are nearby, facilitating location-based interactions and services.

#### Spatial Indexing Algorithms Comparison:

- Geohash:

1. Easy to use and implement. No need to build a tree
2. Supports returning businesses within a specified radius.
3. updating the index is easy. For example, to remove a business from the index, we just need to remove it from the corresponding row with the same geohash and business_id.

- Quadtree:

1. Slightly harder to implement because it needs to build a tree.
2. Supports fetching k-nearest businesses. Sometimes we just want to return k-nearest businesses and don't care if businesses are within a specified radius.
3. Updating the index is more complicated than geohash. A quadtree is a tree structure. If a business is removed, we need to traverse from the root to the leaf node, to remove the business.

### Scale the database:

#### What is sharding?

Sharding is a type of database partitioning that separates very large databases into smaller, faster, more easily managed parts called data shards. Each shard is held on a separate database server instance, spread across multiple physical or virtual machines to spread the load.

The main benefits of sharding:

1. **Improved performance:** by distributing the data, we can improve query response times and reduce the load on individual servers.
2. **Increased capacity:** sharding allows us to store more data than would fit on a single server by adding more shards on new servers.
3. **Fault Isolation:** if one shard fails, it doesn't impact the availability of the others.

#### Scale Business table

The data for business table may not all fit in one server, so it is a good candidate for sharding. The easiest approach is to shard everything by business ID. This sharding scheme ensures that load is evenly distributed among all the shards, and operationally it is easy to maintain.

#### Scale the geospatial index

Depending on the read volumn, a single database server might not have enough CPU or network bandwidth to handle all read requests. If that is the case, it is necessary to spread the read load among multiple data servers.

There are two general approaches for spreading the load of a relational database server. We can add read replicas, or shard the database.

### Caching:

Caching is most beneficial when our application performs frequent read operations on data that doesn't change frequently. By caching frequently accessed data in memory, we can reduce the latency associated with fetching data from the database repeatedly.

### Final logic

#### Get Nearby Businesses:

1. The client sentds the user location and radius to the load balancer.
2. The load balancer forwards the request to the LBS.
3. Based on the user location and radius info, the LBS finds the geohash length that matches the search.
4. LBS calculates neighboring geohashes and adds them to the list.
5. For each geohash in list_of_geohashes, LBS calls the "Geohash" Redis server to fetch corresponding business IDs. Calls to fetch business IDs for each geohash can be made in parallel to reduce latency.
6. Based on the list of business IDs returned, LBS fetches business information from the "Business Info" Redis server, then calculates distances between a user and businesses, ranks them, and returns the result to the client.

#### View, update, add or delete a business

All business-related APIs are separated from the LBS. To view the detailed information about a business, the business service first checks if the data is stored in the "Business Info" Redis cache. If it is, cached data will be returned to the client. If not, data is fetched from the database cluster and then stored in the Redis cache, allowing subsequent requests to get results from the cache directly.
