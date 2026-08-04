# Samavet

Samavet is an India-focused community technology platform for trusts, temples, Ganesh mandals, NGOs, and social organizations. The project combines a public brand experience with the ePawati operations portal used to manage digital donation receipts and community-event workflows.

This is a private, proprietary project. The repository is not intended for public distribution or open-source use.

## About the Project

The Samavet web experience has two primary parts:

### Public Website

The public website introduces Samavet, explains the organizations it serves, presents its services, and directs visitors toward WhatsApp conversations, demo requests, and the deployed ePawati portal.

The public experience includes:

- A responsive bilingual landing page in English and Marathi
- Dedicated sections for ePawati, event intelligence, supporting services, audiences, and workflow
- WhatsApp and email-based enquiry actions
- A separate static news and blog page at `/blog`
- Direct access to the deployed ePawati portal

### ePawati Portal

The ePawati portal is the operational system for digital Vargani and festival administration. It supports organization owners, mandal administrators, treasurers, group leaders, and collection members through role-aware workspaces.

The portal frontend communicates with the Samavet REST API and keeps authentication, organization records, festival data, receipts, templates, and operational activity within the protected portal experience.

## Description

Samavet helps community organizations replace fragmented paper-based processes with clear digital workflows. Contributions can be recorded as digital Vargani slips, receipts can be shared through WhatsApp, and organizers can review collections, expenses, members, tasks, and activity from one interface.

The public website acts as the platform's marketing and orientation layer. It communicates Samavet's purpose without exposing private portal data or administrative functionality. The blog provides a static editorial space for verified coverage and community-technology updates.

## Features

### Public Landing Page

- English and Marathi language modes
- Responsive desktop, tablet, and mobile layouts
- ePawati product story with expandable receipt examples
- Event intelligence dashboard preview
- Service bento grid for digital slips, analytics, streaming, and media
- Audience guidance for trusts, temples, Ganesh mandals, NGOs, and social organizations
- Connected workflow presentation
- WhatsApp demo and conversation actions
- Validated email demo-request form
- Accessible navigation, focus states, semantic sections, and reduced-motion support

### Static Blog

- Dedicated `/blog` page separate from the landing page
- Static editorial cards with publication dates, images, summaries, and source links
- Responsive reading layout based on Samavet's visual identity
- External article and WhatsApp channel links
- Page-specific title and description metadata

### Portal Access and Roles

- Token-based authenticated sessions
- Role-aware interfaces for super administrators, mandal administrators, treasurers, group leaders, and members
- Owner dashboard for mandal onboarding and account management
- Mandal workspace for festival operations
- English, Marathi, and Hindi interface support

### Digital Vargani and Receipts

- Create digital Vargani slips for contributors
- Record cash, UPI, cheque, bank-transfer, and other payment modes
- Track paid and pending contributions
- Search and filter slips by contributor, location, collector, status, and date
- Download generated slips as JPEG images
- Share receipt links and prepared messages through WhatsApp
- Cancel receipts while preserving operational history

### Organization Operations

- Manage mandals, festivals, groups, members, and user accounts
- Assign roles and generate portal logins
- Track member Vargani amounts and collection status
- Create and monitor festival tasks with priorities, assignees, due dates, and statuses
- Record expenses with categories, vendors, notes, dates, and approval statuses
- Review collection totals, payment-mode summaries, collector performance, expenses, and balance
- View activity logs for receipts, payments, and users

### Form and Template Management

- Configure custom fields for organization-specific receipt data
- Control required fields, options, ordering, dashboard filters, and printed fields
- Upload receipt backgrounds and manage active template versions
- Position and style receipt fields through the visual template editor
- Configure typography, alignment, sizing, wrapping, color, and field placement
- Support Devanagari rendering and automatic Marathi text conversion

## Tech Stack

### Application

- React 19
- TypeScript 6
- Vite 8
- React DOM

### Styling and UI

- Custom responsive CSS
- Tailwind CSS 4 tooling
- shadcn tooling and UI utility packages
- Lucide React icons
- CSS variables and component-scoped visual systems

### Motion and Interaction

- Framer Motion
- Motion for React
- GSAP and ScrollTrigger
- Canvas Confetti for selected interactions

### Data and API Integration

- TanStack React Query
- Native Fetch API
- Versioned REST API integration
- Bearer-token authentication
- Browser local and session storage for interface preferences and session state

### Quality and Validation

- TypeScript project builds
- Oxlint
- Node.js test runner
- Vite production bundling
