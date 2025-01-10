# B-Board - Department Bulletin Board System

A modern web application for managing department-specific announcements and events. Built with Next.js 14, Prisma, and Tailwind CSS.

## Features

### Role-Based Access Control

- **Contributors**: Create, edit, and delete announcements/events
- **Viewers**: Access department-specific announcements

### Announcement Management

- Create announcements with titles, descriptions, and date ranges
- Assign announcements to multiple departments
- Automatic archiving of past announcements
- Combined view of announcements across assigned departments

### Department-Specific Boards

- Predefined department structure
- Multi-department announcement tagging
- Department-specific viewing permissions

### User Interface

- Mobile-first, responsive design
- Intuitive dashboard for Contributors
- Easy-to-navigate bulletin board for Viewers
- Search functionality for announcements

### Security

- Password-protected access
- Role-based permission system

### Technical Features

- Built with Next.js 14
- Prisma with Neon Postgres DB
- Tailwind CSS for styling
- WCAG-compliant accessibility
- Optimized performance and scalability

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
