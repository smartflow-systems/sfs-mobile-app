# 📱 SFS Mobile App

**SmartFlow Systems Mobile Command Center**

A unified React Native mobile app that gives you access to all SmartFlow Systems platforms on the go!

## 🎯 Features

### Control Tower
- 📊 Real-time monitoring of all 26 repositories
- 💰 Billing overview with revenue, MRR, and subscriptions
- 📈 System health metrics
- 🔄 Pull-to-refresh for live updates
- 🎨 SFS brown/black/gold branding

### Client Management
- 👥 View and search all clients
- ✨ Client status tracking (Active, Inactive, Churned)
- 📧 Contact information
- 🏢 Company details
- ➕ Add new clients (coming soon)

### Analytics (Coming Soon)
- 📊 Detailed analytics dashboard
- 📉 Revenue trends
- 👤 Customer insights
- 🚀 Growth metrics

### Settings (Coming Soon)
- ⚙️ App configuration
- 🔐 Authentication management
- 🔔 Notification preferences
- 🌐 API endpoint configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+
- Expo CLI (installed automatically)

### Installation

```bash
cd /home/garet/SFS/sfs-mobile-app
npm install
```

### Running the App

#### Web (Easiest for testing)
```bash
npm run web
```
Open http://localhost:8081 in your browser

#### iOS (macOS only)
```bash
npm run ios
```

#### Android
```bash
npm run android
```
Make sure you have Android Studio installed

#### Using Expo Go App
1. Install Expo Go on your iPhone or Android phone
2. Run `npx expo start`
3. Scan the QR code with your camera (iOS) or Expo Go app (Android)

## 📡 Backend Requirements

The mobile app connects to these local services:

- **Control Tower API**: http://localhost:3000
- **White-Label Dashboard**: http://localhost:5001
- **SmartFlow Site**: http://localhost:5000

Make sure these are running before starting the app!

```bash
# Terminal 1 - Control Tower API
cd /home/garet/SFS/sfs-control-tower
npm run dev:server

# Terminal 2 - White-Label Dashboard
cd /home/garet/SFS/sfs-white-label-dashboard
PORT=5001 npm run dev

# Terminal 3 - Mobile App
cd /home/garet/SFS/sfs-mobile-app
npm run web
```

## 📁 Project Structure

```
sfs-mobile-app/
├── src/
│   ├── screens/           # App screens
│   │   ├── DashboardScreen.tsx
│   │   └── ClientsScreen.tsx
│   ├── components/        # Reusable components
│   ├── navigation/        # Navigation config
│   ├── services/          # API clients
│   │   └── api.ts
│   ├── types/            # TypeScript types
│   ├── constants/        # App constants
│   │   └── theme.ts
│   ├── hooks/            # Custom hooks
│   └── utils/            # Utility functions
├── App.tsx               # Main app component
└── package.json
```

## 🎨 Theming

The app uses SmartFlow Systems signature colors:

- **Gold**: `#FFD700` (Primary)
- **Brown**: `#3B2F2F` (Secondary)
- **Black**: `#0D0D0D` (Background)
- **Beige**: `#F5F5DC` (Text)

All theme constants are in `src/constants/theme.ts`

## 📦 Key Dependencies

- **React Native**: Core framework
- **Expo**: Development platform
- **React Navigation**: Navigation library
- **React Query**: Data fetching & caching
- **Axios**: HTTP client

## 🔌 API Integration

The app connects to multiple backend services:

### Control Tower API

```typescript
import { getRepoHealth, getBillingOverview } from './services/api';

// Get repository health
const repos = await getRepoHealth();

// Get billing data
const billing = await getBillingOverview();
```

### White-Label API

```typescript
import { getClients, createClient } from './services/api';

// Get all clients
const clients = await getClients();

// Create new client
const client = await createClient({
  name: 'New Client',
  email: 'client@example.com',
  status: 'active'
});
```

## 🔔 Push Notifications (Coming Soon)

The app will support push notifications for:
- Failed CI/CD deployments
- New client signups
- Revenue milestones
- System alerts

## 🔐 Authentication (Coming Soon)

Multi-tenant authentication with:
- JWT tokens
- Secure token storage
- Role-based access control
- Multi-account support

## 📴 Offline Mode (Coming Soon)

- Local data caching
- Offline-first architecture
- Background sync
- Conflict resolution

## 🚢 Deployment

### Build for Production

#### iOS
```bash
npm run build:ios
```

#### Android
```bash
npm run build:android
```

### Publishing to App Stores

Follow [Expo's publishing guide](https://docs.expo.dev/distribution/introduction/)

## 🤝 Contributing

Part of SmartFlow Systems internal tooling.

## 📄 License

MIT

---

**Built with ❤️ by SmartFlow Systems**

Part of the SmartFlow Systems ecosystem | 26 integrated tools, one mobile command center
