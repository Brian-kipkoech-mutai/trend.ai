 # Trend.ai

## Project Structure

The project is divided into two main parts: `frontend` and `backend`.

### Frontend

The frontend is built using Next.js and is located in the `frontend` directory. It includes various components, hooks, and services to manage the user interface and interactions.

#### Key Directories and Files

- `/frontend/.next/server/chunks/ssr/`: Contains server-side rendered chunks.
- `/frontend/components/ui/`: Contains UI components like `card.tsx`, `label.tsx`, etc.
- `/frontend/hooks/`: Contains custom hooks like `useFormData.ts`.
- `/frontend/services/`: Contains service files like `campaignServices.ts`.
- `/frontend/app/dashboard/campaign/`: Contains pages related to campaigns.

### Backend

The backend is built using NestJS and is located in the `backend` directory. It includes various services, controllers, and schemas to manage the application's business logic and data.

#### Key Directories and Files

- `/backend/src/submissions/`: Contains services and DTOs related to submissions.
- `/backend/src/database/schemas/`: Contains Mongoose schemas like `submission.schema.ts`.
- `/backend/src/interfaces/`: Contains interface files like `campaign.interface.ts` and `influencer.interface.ts`.

## API Endpoints

The API endpoints are defined in the `api-enpoints.tsx` file and include routes for authentication, campaigns, and submissions.

### Authentication

- `api/auth/login`
- `api/auth/logout`
- `api/auth/register`
- `api/auth/forgot-password`
- `api/auth/user`

### Campaigns

- `api/campaigns/create`
- `api/campaigns/brand`
- `api/campaigns/all`
- `api/campaigns/{id}`
- `api/campaigns/submit-application`

### Submissions

- `api/submissions/all-user-submissions`
- `api/submissions/accepted`
- `api/submissions/all`
- `api/submissions/process`

## Usage

To run the project, navigate to the `frontend` and `backend` directories and follow the respective setup instructions.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run start:dev
```

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Backend**: NestJS, TypeScript, Mongoose
- **Database**: MongoDB
- **Authentication**: JWT
- **Styling**: Tailwind CSS

## Best Practices

- **Code Quality**: Use ESLint and Prettier for consistent code formatting and linting.
- **Testing**: Write unit and integration tests using Jest.
- **Version Control**: Follow GitFlow for branching and merging.
- **Documentation**: Maintain clear and concise documentation for all modules and services.
- **Security**: Implement proper authentication and authorization mechanisms. Use environment variables for sensitive information.

## Security

   - **Authentication**: I use JWT for authentication to ensure secure access to the API endpoints.
- **Signed Cookies**: I use signed cookies to store session information securely. This helps prevent tampering and ensures the integrity of the session data.
- **Environment Variables**: Sensitive information such as API keys and database credentials are stored in environment variables to keep them secure and out of the source code.

## Optimization

- **Data Caching with React Query**: I use React Query to cache data on the client side. This improves performance by reducing the number of network requests and providing a better user experience.
  - **Automatic Refetching**: React Query automatically refetches data in the background to keep the UI up-to-date.
  - **Stale-While-Revalidate**: React Query follows the stale-while-revalidate strategy, which serves stale data from the cache while fetching fresh data in the background.
  - **Query Invalidation**: I invalidate queries when data changes to ensure the cache is always up-to-date.

## Modularity

- **Custom Decorators**: I use custom decorators to handle roles and permissions within the application. For example, the `@Roles` decorator is used to restrict access to certain endpoints based on user roles.
  ```typescript
  import { SetMetadata } from '@nestjs/common';

  export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
  ```

- **Common Enums**: I define common enums to standardize values across the application. This helps maintain consistency and reduces the risk of errors.
  ```typescript
  export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
  }

  export enum SubmissionStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
  }
  ```

- **Configuration Service**: I use a configuration service to load environment variables. This ensures that sensitive information is securely managed and easily accessible throughout the application.
  ```typescript
  import { Injectable } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';

  @Injectable()
  export class AppConfigService {
    constructor(private configService: ConfigService) {}

    get databaseHost(): string {
      return this.configService.get<string>('DATABASE_HOST');
    }

    // Add more getters for other environment variables as needed
  }
  ```

- **Modular Structure**: The application is organized into modules to promote separation of concerns and improve maintainability. Each module encapsulates related functionality and can be developed and tested independently.
  ```typescript
  import { Module } from '@nestjs/common';
  import { SubmissionsService } from './submissions.service';
  import { SubmissionsController } from './submissions.controller';

  @Module({
    providers: [SubmissionsService],
    controllers: [SubmissionsController],
  })
  export class SubmissionsModule {}

  
  ```
the end for now !