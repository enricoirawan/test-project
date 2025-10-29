import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface GlassmorphicDialogProps extends Dialog.RootProps {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
  showConfirm?: boolean;
  contentProps?: Dialog.ContentProps;
  headerProps?: Dialog.HeaderProps;
  bodyProps?: Dialog.BodyProps;
  footerProps?: Dialog.FooterProps;
}

function GlassmorphicDialog({
  trigger,
  title,
  children,
  confirmText = 'Save',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  showCancel = true,
  showConfirm = true,
  contentProps,
  headerProps,
  bodyProps,
  footerProps,
  ...dialogRootProps
}: GlassmorphicDialogProps) {
  return (
    <Dialog.Root {...dialogRootProps}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(8px)" bg="blackAlpha.400" />
        <Dialog.Positioner>
          <Dialog.Content
            bg="rgba(255, 255, 255, 0.3)"
            border="1px solid"
            borderColor="whiteAlpha.300"
            borderRadius="2xl"
            boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
            color="white"
            {...contentProps}
          >
            <Dialog.Header
              borderBottom="1px solid"
              borderColor="whiteAlpha.200"
              pb={4}
              {...headerProps}
            >
              <Dialog.Title fontSize="2xl" fontWeight="bold">
                {title}
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body py={6} {...bodyProps}>
              {children}
            </Dialog.Body>

            <Dialog.Footer
              borderTop="1px solid"
              borderColor="whiteAlpha.200"
              pt={4}
              gap={3}
              {...footerProps}
            >
              {showCancel && (
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant="ghost"
                    color="white"
                    _hover={{ bg: 'whiteAlpha.200' }}
                    onClick={onCancel}
                  >
                    {cancelText}
                  </Button>
                </Dialog.ActionTrigger>
              )}
              {showConfirm && (
                <Button
                  bg="whiteAlpha.300"
                  color="white"
                  border="1px solid"
                  borderColor="whiteAlpha.400"
                  _hover={{ bg: 'whiteAlpha.400' }}
                  onClick={onConfirm}
                >
                  {confirmText}
                </Button>
              )}
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild position="absolute" top={4} right={4}>
              <CloseButton
                size="sm"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default GlassmorphicDialog;
