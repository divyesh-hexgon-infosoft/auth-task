const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation Error',
        errors: err.errors
      });
    }
  
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized Access'
      });
    }
  
    if (err.name === 'ForbiddenError') {
      return res.status(403).json({
        status: 'error',
        message: 'Forbidden Access'
      });
    }
  
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
};
  
const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found'
  });
};

module.exports = { errorHandler, notFoundHandler };
