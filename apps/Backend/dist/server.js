import app from './app';
import logger from './utils/logger.js';
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
    logger.info(`Health check: http://localhost:${PORT}/health`);
    logger.info(`API routes: http://localhost:${PORT}/api`);
});
