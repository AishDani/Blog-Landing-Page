// export default function handler(request, response) {
//   console.log("req captured log ", request.body);
//   console.info("req captured info", request.body);
//   response.status(200).json({
//     body: `hello ${request.body}`,
//     query: request.query,
//   });
// }



import createEntry from "./utils.js";

export default async function handler(request, response) {
  console.log("In function");

  try {
    const body = {
      "entry": {
        "title": request.body.name,
        "comment": request.body.comment
      }
    };

    const result = await createEntry(body);
    
    response.setHeader("Access-Control-Allow-Origin", "*"); // Adjust as needed for security
    response.status(200).send({ shortName: result });
  } catch (error) {
    console.error("Error in handler:", error);
    response.setHeader("Access-Control-Allow-Origin", "*"); // Adjust as needed for security
    response.status(500).send({ error: "Failed to process the request" });
  }
}
