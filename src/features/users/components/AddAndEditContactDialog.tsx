import GlassmorphicDialog from '@/shared/components/GlassmorphicDialog';
import { Field, Input, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, ReactNode, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { UserFormSchema, userSchema } from '../schemas/UserSchema';
import { useUserStore } from '../store/useUserStore';
import { User } from '../types/user.types';

interface AddAndEditContactDialogProps {
  trigger: ReactNode;
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

function AddAndEditContactDialog({
  trigger,
  open,
  setOpen,
}: AddAndEditContactDialogProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { addUser, selectedUser, editUser } = useUserStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: '',
        },
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    },
  });

  useEffect(() => {
    if (open && selectedUser) {
      setValue('name', selectedUser.name);
      setValue('username', selectedUser.username);
      setValue('email', selectedUser.email);
      setValue('address', selectedUser.address);
      setValue('phone', selectedUser.phone);
      setValue('website', selectedUser.website);
      setValue('company', selectedUser.company);
    }
  }, [open, selectedUser]);

  const onSubmit = (data: UserFormSchema) => {
    let id = Date.now() + Math.floor(Math.random() * 1000);

    if (selectedUser) {
      id = selectedUser.id;
    }
    const addUserPayload: User = {
      id,
      name: data.name,
      username: data.username,
      email: data.email,
      address: data.address,
      phone: data.phone,
      website: data.website,
      company: data.company,
    };

    if (selectedUser) {
      editUser(addUserPayload);
    } else {
      addUser(addUserPayload);
    }

    setOpen(false);
  };

  return (
    <GlassmorphicDialog
      trigger={trigger}
      title={`${selectedUser ? 'Edit' : 'Add'} Contact`}
      open={open}
      onOpenChange={(e) => {
        setOpen(e.open);
      }}
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

export default AddAndEditContactDialog;
