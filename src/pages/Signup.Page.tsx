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
import { isEmail, isNotEmpty, matchesField, useForm } from '@mantine/form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { selectUserInfo, signIn } from '../Store';
import { getError } from '../utiles';
import { COLORS } from '../constants/themeStatics';
import axios from '../axios';

export function SignupPage() {
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl;
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },

    validate: {
      name: isNotEmpty('Please Enter a Name'),
      email: isEmail('Enter A Correct email address'),
      password: isNotEmpty('You Need to Have a Password!'),
      confirmPassword: matchesField('password', 'Passwords are not the same'),
      terms: (value) => (value === false ? 'You Must Agree To Be A Good Person!' : null),
    },
  });
  useEffect(() => {
    if (userInfo) {
      redirect && navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async () => {
    console.log('yo im here');
    if (form.values.password !== form.values.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.post('/users/signup', {
        name: form.values.name,
        email: form.values.email,
        password: form.values.password,
      });
      dispatch(signIn(data));

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/user/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(getError(err));
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>Sign Up Page</title>
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
              Make an Account To Participate in Testing Of Alpha Versions. For Higher Access
              Accounts Contact <a href="https://discord.gg/CdSsAYzpd4">Discord</a>
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
                type="text"
                withAsterisk
                label="Your Name"
                placeholder="Your Name"
                {...form.getInputProps('name')}
              />
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
              <TextInput
                type="password"
                withAsterisk
                label="Confirm Password"
                placeholder="Confirm Password"
                {...form.getInputProps('confirmPassword')}
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
                  Sign up
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
            By Making An Account You Will Get 1024 Pixels , Which is the Imaginary Currency We Will
            Be Using in Transactions. You Can Only Earn Pixels By Playing. During This Development
            Time , You can Make as Many Accounts as You Want , Know that User Data Collected in
            Alpha Versions Can Be Deleted At Anytime , And The Cards And Assets Will Be Changed
            Constantly , Please Give Any idea Or Recommendations That You Have in The{' '}
            <a href="https://discord.gg/CdSsAYzpd4">Discord</a> Server.{' '}
            <a href="https://github.com/devarashs">devarash</a>
          </Text>
        </Flex>
      </Container>
    </>
  );
}
