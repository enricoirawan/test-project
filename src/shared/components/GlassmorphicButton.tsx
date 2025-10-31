import { Button, ButtonProps } from '@chakra-ui/react';

interface GlassmorphicButtonProps extends ButtonProps {
  label: string;
  bgHover: ButtonProps['bg'];
}

function GlassmorphicButton({
  label,
  onClick,
  color,
  bg,
  bgHover,
  ...rest
}: GlassmorphicButtonProps) {
  return (
    <Button
      onClick={onClick}
      color={color}
      bg={bg}
      _hover={{
        bg: bgHover,
        opacity: 0.8,
      }}
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor="whiteAlpha.300"
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.2)"
      rounded="xl"
      transition="all 0.2s ease-in-out"
      filter="brightness(0.9) saturate(1.05)"
      px={6}
      py={5}
      {...rest}
    >
      {label}
    </Button>
  );
}

export default GlassmorphicButton;
