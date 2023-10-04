import {
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  NativeSelect,
  TextInput,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getError } from '../utiles';
import { selectUserInfo } from '../Store';
import axios from '../axios';
import { COLORS, SIZES } from '../constants/themeStatics';
import imagethumbnail from '../../images/blackbackground.jpg';
import { FrameSelection } from '../constants/creatorStatics';

export function CreateCardPage() {
  const [loading, setLoading] = useState(false);
  const [uploadloading, setUploadLoading] = useState(false);
  const [ImageUploaded, setImageUploaded] = useState('empty');
  const { colorScheme } = useMantineColorScheme();
  const userInfo = useSelector(selectUserInfo);
  const form = useForm({
    initialValues: {
      name: '',
      level: '',
      class: '',
      category: '',
      value: '',
      rareity: '',
      description: '',
      frameType: '',
    },

    validate: {
      name: isNotEmpty('Can not be Empty'),
      level: isNotEmpty('Can not be Empty'),
      class: isNotEmpty('Can not be Empty'),
      category: isNotEmpty('Can not be Empty'),
      value: isNotEmpty('Can not be Empty'),
      rareity: isNotEmpty('Can not be Empty'),
      description: isNotEmpty('Can not be Empty'),
      frameType: isNotEmpty('Can not be Empty'),
    },
  });

  useEffect(() => {}, [ImageUploaded]);

  const handleSubmit = async () => {
    if (!userInfo) {
      // Handle the case when userInfo is null
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        '/cards/create',
        {
          name: form.values.name,
          level: form.values.level,
          image: ImageUploaded,
          class: form.values.class,
          category: form.values.category,
          value: form.values.value,
          rareity: form.values.rareity,
          description: form.values.description,
          frameType: form.values.frameType,
          owner: userInfo._id,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      toast.success('Card created successfully');
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(getError(err));
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploadLoading(true);
    if (!userInfo) return;
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) {
      toast.error('You Have Not Added an Image!');
      return;
    }
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      // dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      // dispatch({ type: 'UPLOAD_SUCCESS' });
      setUploadLoading(false);
      toast.success('Image uploaded successfully');

      setImageUploaded(data.secure_url);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(getError(err));
      }
      setUploadLoading(false);
      // dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    } finally {
      setUploadLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Create a Card</title>
      </Helmet>
      <Flex justify="center" align="start" direction={{ base: 'column', sm: 'row' }}>
        <Container
          my="xl"
          size="sm"
          style={{
            backgroundColor: colorScheme === 'dark' ? COLORS.black : COLORS.gray2,
            padding: SIZES.xLarge,
            borderRadius: SIZES.small,
          }}
        >
          <Title pb="xl" size={20} ta="center" order={2}>
            Fill This Form , You Have To Specify alot Of Aspects Of The Hero , Do it Carefully
            Please!
          </Title>
          <Divider py="md" color={colorScheme === 'dark' ? COLORS.gray2 : COLORS.black} size="xs" />

          <form onSubmit={form.onSubmit(() => handleSubmit())}>
            <TextInput
              my="sm"
              type="text"
              withAsterisk
              label="Name"
              {...form.getInputProps('name')}
            />
            <TextInput
              my="sm"
              type="number"
              withAsterisk
              label="Level"
              {...form.getInputProps('level')}
            />
            <TextInput
              onChange={(event) => uploadFileHandler(event)}
              disabled={uploadloading}
              my="sm"
              type="file"
              withAsterisk
              label="Image/Artwork"
            />
            <TextInput
              my="sm"
              type="text"
              withAsterisk
              label="Class"
              {...form.getInputProps('class')}
            />
            <TextInput
              my="sm"
              type="text"
              withAsterisk
              label="Category"
              {...form.getInputProps('category')}
            />
            <TextInput
              my="sm"
              type="number"
              withAsterisk
              label="Value"
              {...form.getInputProps('value')}
            />
            <TextInput
              my="sm"
              type="text"
              withAsterisk
              label="Rareity"
              {...form.getInputProps('rareity')}
            />
            <TextInput
              my="sm"
              withAsterisk
              label="Description"
              {...form.getInputProps('description')}
            />

            <NativeSelect
              w={{ base: '100%', md: '50%' }}
              label="Choose Frame Type"
              my="md"
              data={FrameSelection}
              {...form.getInputProps('frameType')}
            />
            <Group justify="flex-end" mt="md">
              <Button
                loading={loading}
                type="submit"
                color={colorScheme === 'dark' ? COLORS.lightviolet : COLORS.violet}
              >
                Create
              </Button>
            </Group>
          </form>
        </Container>
        <Container
          my="xl"
          size="sm"
          w={{ base: '100%', md: '30%' }}
          style={{
            backgroundColor: colorScheme === 'dark' ? COLORS.black : COLORS.gray2,
            padding: SIZES.xLarge,
            borderRadius: SIZES.small,
          }}
        >
          <Image
            style={{
              objectFit: 'contain',
              opacity: ImageUploaded === 'empty' ? 0.1 : 1,
            }}
            src={ImageUploaded === 'empty' ? imagethumbnail : ImageUploaded}
          />
        </Container>
      </Flex>
    </>
  );
}
