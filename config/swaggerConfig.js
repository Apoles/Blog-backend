import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BLog uygulamasi",
      version: "1.0.0",
      description: "Blog database i",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./controller/*.js"], // files containing annotations as above
};

export const openapiSpecification = swaggerJSDoc(options);
