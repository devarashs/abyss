import '@mantine/core/styles.css';
import { AppShell, Button, Group, Text, Title, useMantineColorScheme } from '@mantine/core';
import { IconBrightnessUp, IconMoonFilled } from '@tabler/icons-react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { COLORS } from './constants/themeStatics';
import { HeaderMenu } from './components/HeaderMenu/HeaderMenu';
import 'react-toastify/dist/ReactToastify.css';
import './App.module.css';
import { HomePage } from './pages/Home.page';
import { ProtectedRoute } from './components';
import { UserDashboard } from './pages/UserDashboard';
import { CreatorDashboard } from './pages/CreatorDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { LoginPage } from './pages/Login.Page';
import { SignupPage } from './pages/Signup.Page';
import { CreateCardPage } from './pages/CreateCard.Page';
import { CardGalleryPage } from './pages/CardGallery.Page';

export default function App() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <BrowserRouter>
      <AppShell padding="md" header={{ height: 85 }} footer={{ height: 50 }}>
        <AppShell.Header
          m="xs"
          p="md"
          style={{
            backgroundColor: colorScheme === 'dark' ? COLORS.violet : COLORS.lightviolet,
            borderRadius: 15,
          }}
        >
          <Group justify="space-between">
            <Title size={40}>
              <Text
                inherit
                variant="gradient"
                component="span"
                gradient={{
                  from: colorScheme === 'dark' ? 'white' : 'pink',
                  to: colorScheme === 'dark' ? 'lightblue' : 'purple',
                }}
              >
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
                  Abyss
                </Link>
              </Text>
            </Title>
            <Group>
              {colorScheme === 'dark' ? (
                <Button
                  onClick={() => setColorScheme('light')}
                  style={{ backgroundColor: 'inherit' }}
                >
                  <IconMoonFilled
                    style={{
                      color: COLORS.lightviolet,
                    }}
                    size={35}
                    strokeWidth={2}
                  />
                </Button>
              ) : (
                <Button
                  onClick={() => setColorScheme('dark')}
                  style={{ backgroundColor: 'inherit' }}
                >
                  <IconBrightnessUp
                    style={{
                      color: COLORS.violet,
                    }}
                    size={35}
                    strokeWidth={2}
                  />
                </Button>
              )}

              <HeaderMenu />
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          <ToastContainer
            theme={colorScheme === 'dark' ? 'dark' : 'light'}
            position="bottom-center"
            limit={1}
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Define Protected Routes Here */}

            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/cards/gallery" element={<CardGalleryPage />} />
            <Route
              path="/creator/dashboard"
              element={
                <ProtectedRoute>
                  <CreatorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/creator/createnewcard"
              element={
                <ProtectedRoute>
                  <CreateCardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <CreatorDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          {/* <Router /> */}
        </AppShell.Main>
        <AppShell.Footer
          style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}
          p="md"
        >
          <Text ta="center">
            &copy; {new Date().getFullYear()} Abyss all rights reserved - Find The Source Code{' '}
            <a
              style={{ color: colorScheme === 'dark' ? COLORS.violet : COLORS.lightviolet }}
              href="https://github.com/devarashs/abyss"
            >
              Here
            </a>
          </Text>
        </AppShell.Footer>
      </AppShell>
    </BrowserRouter>
  );
}
