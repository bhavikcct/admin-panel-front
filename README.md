# Admin Panel Frontend
 
This is a React-based admin panel built using [Vite](https://vitejs.dev/), styled with [Tailwind CSS](https://tailwindcss.com/), and powered by [Redux Toolkit](https://redux-toolkit.js.org/) and [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for state management and API calls. Axios is used for custom API interactions where necessary.
 
## 📁 Project Structure
 
    admin-panel-front/
    ├── node_modules/
    ├── public/
    └── src/
    ├── assets/ # Static assets like images, icons, etc.
    ├── components/ # Shared reusable UI components
    ├── features/ # Redux slices and RTK Query endpoints
    ├── layout/ # Layout components (e.g., sidebar, header)
    ├── pages/ # Page components (e.g., login, dashboard)
    ├── store/ # Redux store setup
    ├── utils/ # Utility functions/helpers
    ├── validation/ # Form validations
    ├── App.js / App.tsx # App root component
    ├── i18n.ts # Internationalization config (auth module only)
    ├── index.css # Global styles
    ├── main.tsx / main.js # Entry point
    └── vite-env.d.ts # Type declarations for Vite
 
 
## 🚀 Features
 
- ⚡ **Vite** - Fast build and dev environment
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧠 **Redux Toolkit** - Scalable and efficient state management
- 🌐 **RTK Query** - Data fetching and caching
- 📦 **Axios** - Custom API calls
- 🌍 **i18n** - Internationalization (implemented in Auth module only)
- 🔐 **Authentication** - Login, registration,forgot password,reset password etc.
- 📁 **Projects & Estimations** - Fully implemented and connected with backend
- 📊 **Static Dashboard** - Mock metrics display
 
## 🧩 Modules
 
- ✅ Authentication (with i18n)
- ✅ Projects
- ✅ Estimations
- ✅ Dashboard (static)
 
> ⚠️ Internationalization is only implemented in the **Auth** module due to time constraints.
 
## 🛠️ Getting Started
 
### Prerequisites
 
- Node.js >= 18
- pnpm / npm / yarn
 
### Installation
 
```bash
npm install
 
### Run Locally
 
```bash
npm run dev
 
### Build for Production
 
```bash
npm run build