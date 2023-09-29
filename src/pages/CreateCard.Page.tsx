import {
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  Group,
  Image,
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
      usageCost: '',
      rareity: '',
      description: '',
      guild: '',
      skills: '',
      role: '',
      soul: false,
      sentient: false,
      hiddenMessage: '',
      magic: '',
      mana: '',
      intelligence: '',
      kindness: '',
      merciness: '',
      weaponCombatLevel: '',
      magicCombatLevel: '',
      strategicCombatLevel: '',
      sacrificeLevel: '',
      confidenceLevel: '',
    },

    validate: {
      name: isNotEmpty('Can not be Empty'),
      level: isNotEmpty('Can not be Empty'),
      class: isNotEmpty('Can not be Empty'),
      category: isNotEmpty('Can not be Empty'),
      value: isNotEmpty('Can not be Empty'),
      usageCost: isNotEmpty('Can not be Empty'),
      rareity: isNotEmpty('Can not be Empty'),
      description: isNotEmpty('Can not be Empty'),
      guild: isNotEmpty('Can not be Empty'),
      skills: isNotEmpty('Can not be Empty'),
      role: isNotEmpty('Can not be Empty'),
      hiddenMessage: isNotEmpty('Can not be Empty'),
      magic: isNotEmpty('Can not be Empty'),
      mana: isNotEmpty('Can not be Empty'),
      intelligence: isNotEmpty('Can not be Empty'),
      kindness: isNotEmpty('Can not be Empty'),
      merciness: isNotEmpty('Can not be Empty'),
      weaponCombatLevel: isNotEmpty('Can not be Empty'),
      magicCombatLevel: isNotEmpty('Can not be Empty'),
      strategicCombatLevel: isNotEmpty('Can not be Empty'),
      sacrificeLevel: isNotEmpty('Can not be Empty'),
      confidenceLevel: isNotEmpty('Can not be Empty'),
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
          usageCost: form.values.usageCost,
          rareity: form.values.rareity,
          description: form.values.description,
          guild: form.values.guild,
          skills: form.values.skills,
          role: form.values.role,
          soul: form.values.soul,
          sentient: form.values.sentient,
          hiddenMessage: form.values.hiddenMessage,
          magic: form.values.magic,
          mana: form.values.mana,
          intelligence: form.values.intelligence,
          kindness: form.values.kindness,
          merciness: form.values.merciness,
          weaponCombatLevel: form.values.weaponCombatLevel,
          magicCombatLevel: form.values.magicCombatLevel,
          strategicCombatLevel: form.values.strategicCombatLevel,
          sacrificeLevel: form.values.sacrificeLevel,
          confidenceLevel: form.values.confidenceLevel,
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
              type="number"
              my="sm"
              withAsterisk
              label="Usage Cost ( Based on Pixels )"
              {...form.getInputProps('usageCost')}
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
            <TextInput
              my="sm"
              type="text"
              withAsterisk
              label="Guild"
              {...form.getInputProps('guild')}
            />
            <TextInput
              my="sm"
              type="text"
              withAsterisk
              label="Skills"
              {...form.getInputProps('skills')}
            />

            <TextInput
              my="sm"
              type="text"
              withAsterisk
              label="Role"
              {...form.getInputProps('role')}
            />
            <TextInput
              type="text"
              my="sm"
              withAsterisk
              label="Hidden Message"
              {...form.getInputProps('hiddenMessage')}
            />
            <TextInput
              my="sm"
              type="number"
              withAsterisk
              label="Magic"
              {...form.getInputProps('magic')}
            />
            <TextInput
              my="sm"
              type="number"
              withAsterisk
              label="Mana"
              {...form.getInputProps('mana')}
            />
            <TextInput
              my="sm"
              type="number"
              withAsterisk
              label="Intelligence"
              {...form.getInputProps('intelligence')}
            />
            <TextInput
              my="sm"
              type="number"
              withAsterisk
              label="Kindness"
              {...form.getInputProps('kindness')}
            />
            <TextInput
              my="sm"
              type="number"
              withAsterisk
              label="Merciness"
              {...form.getInputProps('merciness')}
            />
            <TextInput
              type="number"
              my="sm"
              withAsterisk
              label="Weapon Combat Level"
              {...form.getInputProps('weaponCombatLevel')}
            />
            <TextInput
              type="number"
              my="sm"
              withAsterisk
              label="Magic Combat Level"
              {...form.getInputProps('magicCombatLevel')}
            />
            <TextInput
              type="number"
              my="sm"
              withAsterisk
              label="Strategic Combat Level"
              {...form.getInputProps('strategicCombatLevel')}
            />
            <TextInput
              type="number"
              my="sm"
              withAsterisk
              label="Sacrifice Level"
              {...form.getInputProps('sacrificeLevel')}
            />
            <TextInput
              type="number"
              my="sm"
              withAsterisk
              label="Confidence Level"
              {...form.getInputProps('confidenceLevel')}
            />
            <Checkbox
              mt="md"
              label="Does The Hero Has Soul ?"
              {...form.getInputProps('soul', { type: 'checkbox' })}
            />
            <Checkbox
              mt="md"
              label="Is The Hero Sentient ?"
              {...form.getInputProps('sentient', { type: 'checkbox' })}
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
