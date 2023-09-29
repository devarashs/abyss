import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Group,
  Text,
  TextInput,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { selectUserInfo, signIn } from '../Store';
import { getError } from '../utiles';
import { COLORS } from '../constants/themeStatics';
import axios from '../axios';

export function LoginPage() {
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl;
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      terms: false,
    },

    validate: {
      email: isEmail('Enter A Correct email address'),
      password: isNotEmpty('You Need to Have an Password!'),
      terms: (value) => (value ? null : 'You Must Be a Good Person To Use Our Services!'),
    },
  });
  useEffect(() => {
    if (userInfo) {
      redirect && navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async () => {
    try {
      const { data } = await axios.post('/users/signin', {
        email: form.values.email,
        password: form.values.password,
      });
      dispatch(signIn(data));
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(getError(err));
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <Container
        my="xl"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Flex
          justify={{ base: 'center', md: 'space-between' }}
          align="center"
          gap={20}
          direction={{ base: 'column', md: 'row' }}
        >
          <Box w={{ base: '90vw', md: '60vw' }}>
            <Title
              my="lg"
              style={{
                backgroundColor: colorScheme === 'dark' ? COLORS.violet : COLORS.lightviolet,
                borderRadius: 45,
              }}
              p="md"
              ta="center"
              order={2}
              size={15}
            >
              Please Login to Your Account!
            </Title>
            <form
              style={{
                backgroundColor: colorScheme === 'dark' ? COLORS.violet : COLORS.lightviolet,
                padding: 20,
                borderRadius: 15,
              }}
              onSubmit={form.onSubmit(() => submitHandler())}
            >
              <TextInput
                type="email"
                withAsterisk
                label="Email"
                placeholder="Your Email"
                {...form.getInputProps('email')}
              />
              <TextInput
                type="password"
                withAsterisk
                label="Password"
                placeholder="Your Password"
                {...form.getInputProps('password')}
              />

              <Checkbox
                {...form.getInputProps('terms')}
                mt="md"
                label="I agree to Be a Good Person!"
              />

              <Group justify="flex-end" mt="md">
                <Button
                  color={colorScheme === 'dark' ? COLORS.lightviolet : COLORS.violet}
                  type="submit"
                >
                  Login
                </Button>
              </Group>
            </form>
          </Box>
          <Text
            w={{ base: '90vw', md: '60vw' }}
            p="lg"
            style={{
              backgroundColor: colorScheme === 'dark' ? COLORS.violet : COLORS.lightviolet,
              borderRadius: 45,
            }}
          >
            In 1956, a group of researchers including John McCarthy, Marvin Minsky, Nathaniel
            Rochester, and Claude Shannon organized the Dartmouth Workshop, marking the birth of
            artificial intelligence (AI) and machine learning. They believed that &quot;every aspect
            of learning or any other feature of intelligence can in principle be so precisely
            described that a machine can be made to simulate it.&quot;
          </Text>
        </Flex>
      </Container>
    </>
  );
}
