module.exports = {
  url: {
    production: {
      LANDING: 'https://pagezilla.ir/',
      DOCUMENTATION: 'https://pagezilla.ir/r/docs/overview/',
      BASIC_EXAMPLE: 'https://pagezilla.ir/examples/basic/',
    },
    staging: {
      LANDING: 'https://pagezilla.netlify.com/',
      DOCUMENTATION: 'https://pagezilla.netlify.com/r/docs/overview/',
      BASIC_EXAMPLE: 'https://pagezilla.netlify.com/examples/basic/',
    },
    development: {
      LANDING: 'http://localhost:3001/',
      DOCUMENTATION: 'http://localhost:3000/r/docs/overview/',
      BASIC_EXAMPLE: 'http://localhost:3002/',
    },
  }[process.env.ENV || 'development'],
};
