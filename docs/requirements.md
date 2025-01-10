# Requirements for the Bulletin Board Web App

## Overview

The Bulletin Board web app will serve as a platform for supervisors to manage and access announcements and events within their respective departments. The app will be built using modern technologies, ensuring a reactive, mobile-friendly, and aesthetically pleasing user experience.

### Key Features:

1. Role-based access control: **Contributors** (formerly Enterers) and **Viewers** (formerly Readers).
2. Mobile-friendly, reactive design.
3. Department-specific bulletin boards with combined announcements.

## Tech Stack

- **Frontend**: Next.js 14
- **Database**: Prisma with Neon Postgres DB
- **Styling**: Tailwind CSS
- **Hosting**: Neon.tech

## Functional Requirements

### Roles and Permissions:

1. **Contributors**:
   - Can create, edit, and delete announcements and events.
   - Can assign announcements to specific departments.
2. **Viewers**:
   - Can view all announcements and events assigned to their department.
   - Cannot create, edit, or delete announcements.

### Announcements and Events:

1. **Contributors** can create:
   - Title
   - Description
   - Start and end date (if applicable)
   - Departments it applies to (multi-select option).
2. Announcements will appear combined for all departments assigned to them.
3. Past announcements (older than the end date) will move to an archived state.

### Department Management:

1. Departments will be predefined in the app.
2. Each announcement or event will be tagged to one or more departments.

### Landing Page:

1. A welcoming landing page with a brief description of the app.
2. Login options for **Contributors** and **Viewers**.

## Non-Functional Requirements

1. **Responsive Design**:
   - Ensure mobile-first design.
   - Works seamlessly on desktops, tablets, and smartphones.
2. **Performance**:
   - Quick load times for all pages.
   - Efficient database queries to handle role-based access.
3. **Scalability**:
   - Ability to scale as more departments and announcements are added.
4. **Accessibility**:
   - Follow WCAG guidelines for accessibility.

## User Interface

### Contributor Interface:

- Dashboard to view and manage announcements.
- Form for creating and editing announcements.
- Option to assign announcements to departments.

### Viewer Interface:

- Department-specific bulletin board displaying announcements.
- Search functionality to filter announcements by date or keyword.

## Security

1. Password-protected login system.
2. Role-based access to prevent unauthorized actions.

## Documentation

- Include a `requirements.md` file detailing all functionalities.
- Provide a `README.md` with setup instructions.
- Add a `docs/` folder for additional documentation, such as:
  - Workflow explanations.
  - Database schema.
  - Role and permission descriptions.

## Development Process

1. Initial setup of the tech stack.
2. Implementation of role-based authentication.
3. Design and develop the landing page.
4. Build Contributor and Viewer interfaces.
5. Testing for responsiveness, performance, and security.
6. Deployment on Neon.tech.

## Future Enhancements

1. Notification system for new announcements.
2. Analytics for Contributors to view engagement metrics.
3. Integration with email for announcement alerts.

---

This document will serve as the primary reference for building the app. Any changes or additions to the requirements should be documented here.
