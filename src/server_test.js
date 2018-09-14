import app from './app';

// Start the server
const PORT = 8000;

const server = app.listen(process.env.PORT || PORT, () => {
    console.log(`CORS-enabled web server listening on port ${server.address().port} [${ app.env }]`);
    console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
});

export default server;
