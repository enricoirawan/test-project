import GlassmorphicDialog from '@/shared/components/GlassmorphicDialog';
import { Button, Field, Input, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserFormSchema, userSchema } from '../schemas/UserSchema';
import { useUserStore } from '../store/useUserStore';
import { User } from '../types/user.types';

function AddAndUpdateContactDialog() {
  const formRef = useRef<HTMLFormElement>(null);
  const { addUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      address: {
        geo: {
          lat: '',
          lng: '',
        },
      },
      company: {},
    },
  });

  const [open, setOpen] = useState(false);

  const onSubmit = (data: UserFormSchema) => {
    const addUserPayload: User = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      name: data.name,
      username: data.username,
      email: data.email,
      address: data.address,
      phone: data.phone,
      website: data.website,
      company: data.company,
    };
    addUser(addUserPayload);
    setOpen(false);
  };

  return (
    <GlassmorphicDialog
      trigger={
        <Button
          colorScheme="whiteAlpha"
          size="lg"
          backdropFilter="blur(10px)"
          bg="whiteAlpha.200"
          border="1px solid"
          borderColor="whiteAlpha.400"
          _hover={{
            bg: 'whiteAlpha.300',
          }}
        >
          Add Contact
        </Button>
      }
      title="Add Contact"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      onConfirm={() => {
        formRef.current?.requestSubmit();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <Stack spaceY={3}>
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

          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email</Field.Label>
            <Input type="email" {...register('email')} />
            {errors.email && (
              <Field.ErrorText>{errors.email.message}</Field.ErrorText>
            )}
          </Field.Root>

          {/* Address Fields */}
          <Field.Root invalid={!!errors.address?.street}>
            <Field.Label>Street</Field.Label>
            <Input {...register('address.street')} />
            {errors.address?.street && (
              <Field.ErrorText>{errors.address.street.message}</Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.address?.suite}>
            <Field.Label>Suite</Field.Label>
            <Input {...register('address.suite')} />
            {errors.address?.suite && (
              <Field.ErrorText>{errors.address.suite.message}</Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.address?.city}>
            <Field.Label>City</Field.Label>
            <Input {...register('address.city')} />
            {errors.address?.city && (
              <Field.ErrorText>{errors.address.city.message}</Field.ErrorText>
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

          {/* Geo Fields */}
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

          {/* Phone & Website */}
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

          {/* Company Fields */}
          <Field.Root invalid={!!errors.company?.name}>
            <Field.Label>Company Name</Field.Label>
            <Input {...register('company.name')} />
            {errors.company?.name && (
              <Field.ErrorText>{errors.company.name.message}</Field.ErrorText>
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
        </Stack>
      </form>
    </GlassmorphicDialog>
  );
}

export default AddAndUpdateContactDialog;
