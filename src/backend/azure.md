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

## JWT

JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims to be transferred between two parties. In the context of a .NET Core Web API, JWTs are often used for authentication and authorization purposes.

1. Install the necessary NuGet package
   We'll need the `Microsoft.AspNetCore.Authentication.JwtBearer` package. `JwtBearer` is an authentication middleware in ASP.NET Core that handles JSON Web Token authentication.

   The `JwtBearer` middleware is responsible for:

   1. **Extracting the JWT from the incoming request**: By default, it looks for the JWT in the `Authorization` header with the `Bearer` scheme.
   2. **Validating the JWT:** The middleware validates the JWT's signature, expiration time, issuer, audience, and any other configurable claims.
   3. **Setting the user identity and claims:** If the JWT is valid, the middleware creates a `ClaimsPrincipal` representing the user's identity, which includes the claims encoded in the JWT payload. This `ClaimsPrincipal` is then attached to the current request context, making the user's identity available throughout the request pipeline.

   The main advantage of using `JwtBearer` is that it simplifies the process of authenticating and authorizing requests based on JWT tokens. Instead of manually extracting and validating the JWT in our controllers or middleware, we can rely on the `JwtBearer` middleware to handle this automatically.

2. Configure JWT token and validation in appsettings.json

```json
  "Jwt": {
    "Key": "ThisIsAStrongRandomSecretKeyThatIs32Bytes",
    "Issuer": "eshop.com"
  },
```

3. Generate a JWT
   We can generate a JWT in our login or register action.

```csharp
    private string CreateToken(User user)
    {
        List<Claim> claims = new List<Claim>()
        {
            new Claim(ClaimTypes.Name, user.Name)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Issuer"],claims: claims, expires: DateTime.Now.AddMinutes(120), signingCredentials: credentials);

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }
```

- **Create Claims**: Claims are statements about an entity (typically, the user) and additional data. Here, a claim is created with the user's name.
- **Create Symmetric Security Key**: A symmetric security key is created from a secret key that is retrieved from the application's configuration. This key will be used to sign the JWT.
- **Create Signing Credentials**: Signing credentials are created with the symmetric security key and the HMAC SHA256 algorithm. These credentials will be used to sign the JWT.
- **Create JWT**: A JWT is created with the issuer, claims, expiration time, and signing credentials. The issuer is retrieved from the application's configuration.
- **Serialize JWT**: The JWT is serialized into a string that can be sent over the network.

4. Validate a JWT:
   We can validate JWTs using the JWT Bearer Authentication middleware. Here's how we can set it up in our `program.cs` file.

```csharp
var jwtIssuer = builder.Configuration.GetSection("Jwt:Issuer").Get<string>();
var jwtKey = builder.Configuration.GetSection("Jwt:Key").Get<string>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(options =>
  {
      options.TokenValidationParameters = new TokenValidationParameters
      {
          ValidateIssuer = true,
          ValidateAudience = true,
          ValidateLifetime = true,
          ValidateIssuerSigningKey = true,
          ValidIssuer = jwtIssuer,
          ValidAudience = jwtIssuer,
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
      };
  });
```
