---
icon: pen-to-square
date: 2023-01-18
category:
  - interview
tag:
  - networking
---

# Networking

## What is HTTP protocol?

Hypertext Transfer Protocol(HTTP) is a fundamental protocol used for communication on the World Wide Web. It is an application layer protocol that facilitates the transfer of data between a client (such as web browser) and a server. HTTP is the foundation of any data exchange on the Web, including the transfer of HTML pages, images, files, videos, and other resources.

1. **Stateless Protocol:**

- HTTP is stateless, meaning hat each request from a client to a server is independent and not aware of previous requests.

2. **Client-Server Architecture:**

- The communication in HTTP occurs between a client, typically a web browser, and a server. The client sends requests, and the server responds with the requested data.

3. **Request-Response Model:**

- Http follows a request-response model. The client sends an HTTP request to the server, specifying the method and the resource it is interested in. The server processes the request and sends back an HTTP response with the requested data.

4. **Methods:**

- HTTP defines various methods or verbs that indicate the action to be performed on a resource.
  - **GET:** Retrieve data from the server.
  - **POST:** Submit data to be processed to a specified resource.
  - **PUT:** Update a resource on the server.
  - **DELETE:** Request the removal of a resource.

5. **Status Codes:**

- HTTP responses include status codes that indicate the outcome of the request. Common status codes include:
  - **200 OK**: The request was successful
  - **404 NOT FOUND**: The requested resource could not be found.
  - **500 Interval Server Error:** A generic error message returned when an unexpected condition was encountered.

6. **Headers:**

- HTTP headers provide additional infoprmation about the request or response.

7. **URLs (Uniform Resource Locators)**

- Resources on the web are identified by URLs, which are used in HTTP requests to specify the location of the desired resource.

8. **Security (HTTPS):**

- To enhance security, HTTP can be used in conjunction with SSL/TLS protocols, creating HTTPS. HTTPs encrypts the data exchanged between the client and server, providing a secure communication channel.

## Router:

A router is a networking device that plays a central role in directing data traffic between different networks. Its primary function is to connect multiple networks together, manage the flow of data between them.

## DNS

DNS, or Domain Name System, is a hierarchical and decentralized system that translates human-readable names into IP addresses. It serves as a fundamental component of the internet's infrastructure, enabling users to access websites and other resources using easily memorable domain names instead of numeric IP addresses.

## LAN (Local Area Network):

LAN stands for Local Area Network. It is a network of interconnected computers and devices within a limited geographic area, such as home, office, school, or campus. LANs are designed to facilate communication and resource-sharing among devices in close proximity, typically within the same building or a small geographical area. Routers play a crucial role in LAN by connecting different devices within a network and facilate communication between the local network and external networks, such as the internet.

### Network Address Translation (NAT):

- Routers often use Network Address Translation (NAT) to allow multiple devices within a LAN to share a single IP address. This help conserve IPv4 address and provides a level of security by hiding internal IP addresses from external netwoeks.

### Dynamic Host Configuration Protocol (DHCP):

- DHCP is a network protocol that allows a router to dynamically assign IP address and other network configuration parameters to devices within its local network. DHCP simplies the network configuration process for devices by automatically providing them with an IP address, subnet mask, default gateway, and other parameters necessary for communication within the local network and beyond.

## IPv4

IPv4 refers to the version of the Internet Protocol (IP) and stands for Internet Protocol version 4.

## TCP(Transmission Control Protocol)

1. Connection-Oriented:

- TCP is a connection-oriented protocol. Before data exchange begins, a connection is established between sender and receiver. This connection is maintained throughout the communication session.

2. Reliability:

- TCP ensures reliable communication. It uses mechanisms such as acknowledgement and retransmission to guarantee that data is delivered correctly and in the correct order.

3. Connection Termination:

- TCP ensures a reliable connection termination process. A three-way handshake is used to establish a connection, and a four-way handshare is used to terminate it.

4. Flow Control:

- TCP incorporates flow control mechanism to prevent a fast sender from overwhelming a slow receiver. This helps in optimizing data transfer rates and preventing congestion.

### Examples of Applications:

- Web browsing(HTTP), email(SMTP), file transfer (FTP)

## UDP (User Datagram Protocol):

1. Connectionless:

- UDP is connectionless protocol. It does not establish before sending data, and each datagram(packet) is treated independently.

2. Unreliable:

- UDP does not guarantee reliable delivery of data. It does not use acknowledgements or retransmission mechanisms. If a packet is lost, there is no automatic recovery.

3. Low Overhead:

- UDP has lower overhead compared to TCP, making it suitable for applications that require minimal delay and can tolerate some packet loss.

4. Examples of Applications:

- Streaming data, online gaming
