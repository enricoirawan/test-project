import { toaster } from '@/components/ui/toaster';
import GlassmorphicButton from '@/shared/components/GlassmorphicButton';
import GlassmorphicDialog from '@/shared/components/GlassmorphicDialog';
import LazyImage from '@/shared/components/LazyImage';
import {
  Field,
  Grid,
  GridItem,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch } from 'react';
import { useForm } from 'react-hook-form';
import { UserFormSchema, userSchema } from '../schemas/UserSchema';
import { useUserStore } from '../store/useUserStore';
import { User } from '../types/user.types';

interface DetailUserProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

function DetailUser({ open, setOpen }: DetailUserProps) {
  const { editUser, deleteUser, selectedUser: user } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name,
      username: user?.username,
      email: user?.email,
      address: user?.address,
      phone: user?.phone,
      website: user?.website,
      company: user?.company,
    },
  });

  const onSubmit = (data: UserFormSchema) => {
    const editUserPayload: User = {
      id: user?.id ?? 0,
      name: data.name,
      username: data.username,
      email: data.email,
      address: data.address,
      phone: data.phone,
      website: data.website,
      company: data.company,
    };
    editUser(editUserPayload);
    toaster.create({
      description: 'Used edited successfully',
      type: 'success',
    });
    setOpen(false);
  };

  const onDeleteUser = () => {
    if (user) {
      deleteUser(user);
      setOpen(false);
    }
  };

  if (open && !user)
    return <Text>Something wrong, please try again later...</Text>;

  return (
    <GlassmorphicDialog
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      title="Contact Detail"
      size="cover"
      scrollBehavior="inside"
      confirmText="Delete Contact"
      cancelText="Close"
      showCancel={false}
      showConfirm={false}
    >
      <Grid
        templateColumns={{
          base: 'repeat(3, 1fr)',
          mdDown: 'repeat(1, 1fr)',
        }}
        gapX={{
          base: '6',
          mdDown: '0',
        }}
        gapY={{
          base: '0',
          mdDown: '6',
        }}
      >
        <GridItem colSpan={1} borderRadius="md">
          <LazyImage
            w="full"
            src={`https://picsum.photos/400/600?random=${user.id % 1000}.webp`}
            objectFit="cover"
            borderRadius="md"
          />
        </GridItem>
        <GridItem
          colSpan={2}
          border="1px solid"
          borderColor="whiteAlpha.300"
          borderRadius="lg"
          p={4}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spaceY={3}>
              <HStack>
                <Field.Root invalid={!!errors.name}>
                  <Field.Label>Name</Field.Label>
                  <Input {...register('name')} />
                  {errors.name && (
                    <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root invalid={!!errors.username}>
                  <Field.Label>Username</Field.Label>
                  <Input {...register('username')} />
                  {errors.username && (
                    <Field.ErrorText>{errors.username.message}</Field.ErrorText>
                  )}
                </Field.Root>
              </HStack>

              <Field.Root invalid={!!errors.email}>
                <Field.Label>Email</Field.Label>
                <Input type="email" {...register('email')} />
                {errors.email && (
                  <Field.ErrorText>{errors.email.message}</Field.ErrorText>
                )}
              </Field.Root>

              <HStack>
                <Field.Root invalid={!!errors.address?.street}>
                  <Field.Label>Street</Field.Label>
                  <Input {...register('address.street')} />
                  {errors.address?.street && (
                    <Field.ErrorText>
                      {errors.address.street.message}
                    </Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root invalid={!!errors.address?.suite}>
                  <Field.Label>Suite</Field.Label>
                  <Input {...register('address.suite')} />
                  {errors.address?.suite && (
                    <Field.ErrorText>
                      {errors.address.suite.message}
                    </Field.ErrorText>
                  )}
                </Field.Root>
              </HStack>

              <HStack>
                <Field.Root invalid={!!errors.address?.city}>
                  <Field.Label>City</Field.Label>
                  <Input {...register('address.city')} />
                  {errors.address?.city && (
                    <Field.ErrorText>
                      {errors.address.city.message}
                    </Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root invalid={!!errors.address?.zipcode}>
                  <Field.Label>Zipcode</Field.Label>
                  <Input {...register('address.zipcode')} />
                  {errors.address?.zipcode && (
                    <Field.ErrorText>
                      {errors.address.zipcode.message}
                    </Field.ErrorText>
                  )}
                </Field.Root>
              </HStack>

              <HStack>
                <Field.Root invalid={!!errors.address?.geo?.lat}>
                  <Field.Label>Latitude</Field.Label>
                  <Input {...register('address.geo.lat')} />
                  {errors.address?.geo?.lat && (
                    <Field.ErrorText>
                      {errors.address.geo.lat.message}
                    </Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root invalid={!!errors.address?.geo?.lng}>
                  <Field.Label>Longitude</Field.Label>
                  <Input {...register('address.geo.lng')} />
                  {errors.address?.geo?.lng && (
                    <Field.ErrorText>
                      {errors.address.geo.lng.message}
                    </Field.ErrorText>
                  )}
                </Field.Root>
              </HStack>

              <HStack>
                <Field.Root invalid={!!errors.phone}>
                  <Field.Label>Phone</Field.Label>
                  <Input {...register('phone')} />
                  {errors.phone && (
                    <Field.ErrorText>{errors.phone.message}</Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root invalid={!!errors.website}>
                  <Field.Label>Website</Field.Label>
                  <Input {...register('website')} />
                  {errors.website && (
                    <Field.ErrorText>{errors.website.message}</Field.ErrorText>
                  )}
                </Field.Root>
              </HStack>

              <Field.Root invalid={!!errors.company?.name}>
                <Field.Label>Company Name</Field.Label>
                <Input {...register('company.name')} />
                {errors.company?.name && (
                  <Field.ErrorText>
                    {errors.company.name.message}
                  </Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.company?.catchPhrase}>
                <Field.Label>Catch Phrase</Field.Label>
                <Input {...register('company.catchPhrase')} />
                {errors.company?.catchPhrase && (
                  <Field.ErrorText>
                    {errors.company.catchPhrase.message}
                  </Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.company?.bs}>
                <Field.Label>BS</Field.Label>
                <Input {...register('company.bs')} />
                {errors.company?.bs && (
                  <Field.ErrorText>{errors.company.bs.message}</Field.ErrorText>
                )}
              </Field.Root>

              <GlassmorphicButton
                variant="outline"
                label="Edit"
                color="white"
                bgHover="brand.900"
                type="submit"
              />

              <GlassmorphicButton
                variant="outline"
                label="Delete"
                onClick={onDeleteUser}
                color="white"
                bgHover="red.500"
              />
            </Stack>
          </form>
        </GridItem>
      </Grid>
    </GlassmorphicDialog>
  );
}

export default DetailUser;
