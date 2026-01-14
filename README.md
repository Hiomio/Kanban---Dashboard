# Multi-Tenant Project Management System

A full-stack project management application built with Django, GraphQL, React, and TypeScript. This system enables organizations to manage multiple projects, track tasks with a Kanban-style board, and collaborate through comments.

![Project Management System](https://img.shields.io/badge/Django-6.0-green) ![React](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![GraphQL](https://img.shields.io/badge/GraphQL-Enabled-pink)

## 📸 Screenshots

### Welcome Screen
![Welcome Screen](https://github.com/Hiomio/Kanban---Dashboard/blob/main/Screenshot%20(86).png)
*Beautiful landing page with feature highlights*

### Project Dashboard
![Project Dashboard](https://github.com/Hiomio/Kanban---Dashboard/blob/main/Screenshot%20(88).png)
*Visual project cards with status indicators and progress tracking*

### Task Board (Kanban View)
![Task Board](https://github.com/Hiomio/Kanban---Dashboard/blob/main/Screenshot%20(89).png)
*Drag-free Kanban board with To Do, In Progress, and Done columns*

### Create Organization Modal
![Create Organization](https://github.com/Hiomio/Kanban---Dashboard/blob/main/Screenshot%20(87).png)
*Modern modal for creating new projects*


## 🌟 Features

### Multi-Tenancy
- **Organization-based data isolation** - Each organization has its own set of projects and data
- **Secure data separation** - Ensures proper data privacy between organizations
- **Organization management** - Create and manage multiple organizations

### Project Management
- **Visual project dashboard** - Card-based layout with status indicators
- **Project CRUD operations** - Create, read, update, and delete projects
- **Project statistics** - Real-time task counts and completion rates
- **Status tracking** - Active, On Hold, and Completed states
- **Due date management** - Track project deadlines

### Task Management
- **Kanban board** - Visual task board with three columns (To Do, In Progress, Done)
- **Drag-free task updates** - Quick status changes with one-click buttons
- **Task assignments** - Assign tasks to team members via email
- **Task CRUD operations** - Full task lifecycle management
- **Task descriptions** - Detailed task information

### Collaboration
- **Comment system** - Add comments to tasks for team collaboration
- **Email-based identification** - Track who made which comments
- **Timestamp tracking** - View when comments were added

### Modern UI/UX
- **Responsive design** - Works seamlessly on desktop, tablet, and mobile
- **TailwindCSS styling** - Modern, clean, and professional interface
- **Gradient designs** - Beautiful blue-purple gradient theme
- **Loading states** - User feedback during data operations
- **Error handling** - Graceful error messages
- **Smooth animations** - Fade-in and slide-up transitions

## 🛠️ Tech Stack

### Backend
- **Django 6.0** - Python web framework
- **Django REST Framework** - API toolkit
- **Graphene-Django** - GraphQL integration
- **PostgreSQL** - Relational database (SQLite for development)
- **Python 3.11+** - Programming language

### Frontend
- **React 18.2** - JavaScript library for UI
- **TypeScript 5.0** - Type-safe JavaScript
- **Apollo Client 3.8** - GraphQL client
- **TailwindCSS 3.4** - Utility-first CSS framework
- **React Hooks** - Modern React state management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.11 or higher
- Node.js 18.0 or higher
- npm or yarn
- Git
- PostgreSQL (optional, SQLite works for development)

## 🚀 Installation & Setup

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/Hiomio/Kanban---Dashboard
cd project-management-system
```

2. **Navigate to backend directory**
```bash
cd backend
```

3. **Create virtual environment**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

4. **Install Python dependencies**
```bash
pip install django djangorestframework graphene-django psycopg2-binary django-cors-headers python-decouple
```

5. **Run migrations**
```bash
python manage.py makemigrations
python manage.py migrate
```

6. **Create superuser (optional)**
```bash
python manage.py createsuperuser
```

7. **Start the Django development server**
```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install Node dependencies**
```bash
npm install
```

3. **Start the React development server**
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## 🎯 Usage

### Getting Started

1. **Access the application** at `http://localhost:3000`

2. **Create an Organization**
   - Click the "New Organization" button
   - Enter organization name and contact email
   - Click "Create Organization"

3. **Select Organization**
   - Choose your organization from the dropdown

4. **Create a Project**
   - Click the "+ New Project" button
   - Fill in project details (name, description, status, due date)
   - Click "Create Project"

5. **Manage Tasks**
   - Click on any project card to open the task board
   - Click "+ Add Task" to create new tasks
   - Drag tasks between columns or use quick status buttons
   - Click on a task to edit it

6. **Add Comments**
   - Open a task in edit mode
   - Scroll to the comments section
   - Enter your email and comment
   - Click "Post Comment"

### GraphQL Playground

Access the GraphQL playground at `http://localhost:8000/graphql/`

**Example Queries:**

```graphql
# Get all organizations
query {
  organizations {
    id
    name
    slug
    projectCount
  }
}

# Get projects for an organization
query {
  projects(organizationSlug: "acme-corp") {
    id
    name
    status
    taskCount
    completionRate
  }
}

# Get tasks for a project
query {
  tasks(projectId: "1") {
    id
    title
    status
    assigneeEmail
  }
}
```

**Example Mutations:**

```graphql
# Create a project
mutation {
  createProject(
    organizationSlug: "acme-corp"
    name: "New Website"
    description: "Build a new company website"
    status: "ACTIVE"
    dueDate: "2026-03-31"
  ) {
    project {
      id
      name
    }
  }
}

# Update a task status
mutation {
  updateTask(
    id: "1"
    status: "DONE"
  ) {
    task {
      id
      status
    }
  }
}
```

## 📁 Project Structure

```
project-management-system/
├── backend/
│   ├── config/
│   │   ├── settings.py       # Django settings
│   │   ├── urls.py           # URL routing
│   │   └── wsgi.py
│   ├── projects/
│   │   ├── models.py         # Data models
│   │   ├── schema.py         # GraphQL schema
│   │   ├── types.py          # GraphQL types
│   │   └── admin.py          # Admin interface
│   ├── manage.py
│   └── db.sqlite3            # SQLite database
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── OrganizationSelector.tsx
│   │   │   ├── ProjectDashboard.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── CreateProjectModal.tsx
│   │   │   ├── EditProjectModal.tsx
│   │   │   ├── TaskBoard.tsx
│   │   │   └── TaskComments.tsx
│   │   ├── graphql/
│   │   │   ├── queries.ts    # GraphQL queries
│   │   │   └── mutations.ts  # GraphQL mutations
│   │   ├── types/
│   │   │   └── index.ts      # TypeScript interfaces
│   │   ├── apollo-client.ts  # Apollo setup
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🎨 Key Features Explained

### Multi-Tenancy Implementation
The system implements organization-based multi-tenancy where:
- Each organization has isolated data
- Projects are filtered by organization slug
- Tasks are scoped to projects within organizations
- All queries include organization context

### GraphQL API Design
- **Type-safe schema** with Graphene-Django
- **Efficient queries** with select_related and prefetch_related
- **Computed fields** like task counts and completion rates
- **Mutations** for all CRUD operations

### State Management
- **Apollo Client** for GraphQL state management
- **Automatic cache updates** after mutations
- **Optimistic UI updates** for better UX
- **Error handling** with user-friendly messages

### Responsive Design
- **Mobile-first approach** with TailwindCSS
- **Breakpoints**: sm (640px), md (768px), lg (1024px)
- **Grid layouts** that adapt to screen size
- **Touch-friendly** UI elements

## 🔒 Security Considerations

- CORS configured for development (adjust for production)
- CSRF protection enabled
- Input validation on forms
- SQL injection protection via Django ORM
- XSS protection via React's default escaping

## 🚧 Future Enhancements

- [ ] User authentication and authorization
- [ ] Real-time updates with GraphQL subscriptions
- [ ] File attachments for tasks
- [ ] Task dependencies and relationships
- [ ] Advanced filtering and search
- [ ] Email notifications
- [ ] Activity timeline
- [ ] Export to PDF/Excel
- [ ] Dark mode
- [ ] Drag-and-drop task reordering

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Ensure virtual environment is activated
- Check if all dependencies are installed: `pip list`
- Verify database migrations: `python manage.py migrate`

**Frontend won't start:**
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`
- Check Node version: `node --version` (should be 18+)

**GraphQL errors:**
- Verify backend is running on port 8000
- Check CORS configuration in `settings.py`
- Review browser console for network errors

**TypeScript errors:**
- Run `npm install` to ensure all types are installed
- Check `tsconfig.json` configuration
- Restart VS Code or your IDE

## 📝 API Documentation

### Core Models

**Organization**
- `id`: Unique identifier
- `name`: Organization name
- `slug`: URL-friendly identifier
- `contact_email`: Contact email
- `created_at`: Creation timestamp

**Project**
- `id`: Unique identifier
- `organization`: Foreign key to Organization
- `name`: Project name
- `description`: Detailed description
- `status`: ACTIVE | ON_HOLD | COMPLETED
- `due_date`: Optional deadline
- `created_at`: Creation timestamp

**Task**
- `id`: Unique identifier
- `project`: Foreign key to Project
- `title`: Task title
- `description`: Detailed description
- `status`: TODO | IN_PROGRESS | DONE
- `assignee_email`: Assigned team member
- `due_date`: Optional deadline
- `created_at`: Creation timestamp

**TaskComment**
- `id`: Unique identifier
- `task`: Foreign key to Task
- `content`: Comment text
- `author_email`: Comment author
- `created_at`: Creation timestamp

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [Kaluri Himabindhu](https://github.com/Hiomio)
- Email: blessykaluri@gmail.com

## 🙏 Acknowledgments

- Django documentation
- React documentation
- GraphQL documentation
- TailwindCSS team
- Apollo GraphQL team

---

**Built with ❤️ using Django, GraphQL, React, and TypeScript**
