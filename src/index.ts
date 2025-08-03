import express from "express";
import { enviromentVariables } from "./shared/config/enviroment-variables";
import { createHelperRoutes } from "./presentation/routes/helper_router/helper.router";
import { registerCategoryRoutes } from "./presentation/routes/category/category.routes";
import { registerDeckRoutes } from "./presentation/routes/deck/deck.routes";
import { registerQuestionRoutes } from "./presentation/routes/question/question.routes";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createHelperRoutes(app);
registerCategoryRoutes(app);
registerQuestionRoutes(app);
registerDeckRoutes(app);

// Error handling middleware (must be last)
// app.use(errorLogger);
// app.use(notFoundHandler);
// app.use(errorHandler);

// Start server
const PORT = enviromentVariables.port;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📖 Environment: ${enviromentVariables.nodeEnv}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

export default app;
