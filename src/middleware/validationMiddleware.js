const { ZodError } = require("zod");
const { StatusCodes } = require("http-status-codes");

function validateData(schema) {
  return (req, res, next) => {
    try {
      //console.log(" BODY:", req.body);
      //console.log(" FILES:", req.files);

      if (req.body.userId) req.body.userId = Number(req.body.userId);

      schema.parse(req.body);
      next();
    } catch (error) {
      console.error("Validation Middleware Error:", error);

      if (error instanceof ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Validation failed",
          errors: error.errors || []
        });
      }

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        details: error.message 
      });
    }
  };
}


module.exports = validateData;