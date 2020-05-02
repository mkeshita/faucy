import React, { useState, useRef } from 'react';
import { Box, Link, Button, PseudoBox, Textarea, Text } from '@chakra-ui/core';
import { FaGithub, FaHeart, FaComment } from 'react-icons/fa';
import useOnClickOutside from 'use-onclickoutside';

const emojis = [
  { id: 'stars', value: '🤩' },
  { id: 'happy', value: '😃' },
  { id: 'confused', value: '😕' },
  { id: 'sad', value: '😢' },
];

const Emoji = ({ colorMode, id, emoji, selected, onEmojiClick }) => (
  <PseudoBox
    _hover={{ transform: 'scale(1.08)' }}
    alignItems="center"
    borderColor={selected ? '#319795' : colorMode === 'light' ? 'gray.300' : 'gray.400'}
    borderRadius="50%"
    borderWidth="1px"
    cursor="pointer"
    d="inline-flex"
    fontSize={'lg'}
    height="31px"
    justifyContent="center"
    mr={2}
    transform={selected ? 'scale(1.08)' : ''}
    transformOrigin="center center"
    transition="all .2s cubic-bezier(.5,-1,.5,2)"
    width="31px"
    willChange="transform"
    onClick={() => onEmojiClick(id)}
  >
    <Box d="inline-block" height="25px" width="18px">
      {emoji}
    </Box>
  </PseudoBox>
);

const EmojiPalette = ({ colorMode }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const handleEmojiClick = (emojiId) => setSelectedEmoji(emojiId);

  return (
    <Box flex="1">
      {emojis.map((emoji) => (
        <Emoji
          key={emoji.id}
          colorMode={colorMode}
          emoji={emoji.value}
          id={emoji.id}
          selected={selectedEmoji === emoji.id}
          onEmojiClick={handleEmojiClick}
        />
      ))}
    </Box>
  );
};

export const Footer = ({ colorMode }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setIsFeedbackOpen(false));

  return (
    <Box
      alignItems="center"
      bottom={2}
      color={colorMode === 'light' ? 'gray.600' : 'gray.200'}
      d="flex"
      justifyContent="space-between"
      maxWidth={['100%', '100%', '606px']}
      position="absolute"
      px={[4, 4, 0, 0]}
      width="100%"
    >
      <Link isExternal alignItems="center" d="flex" fontSize={'sm'} href={'https://www.xivis.com'}>
        Made by Xivis <Box as={FaHeart} d="inline" ml={2} size="14px" />
      </Link>
      <Link isExternal alignItems="center" d="flex" fontSize={'sm'} href={'https://github.com/xivis/faucy'}>
        GitHub <Box as={FaGithub} d="inline" ml={2} size="14px" />
      </Link>
      <Box position="relative">
        <Button
          _focus={{ boxShadow: 'none' }}
          fontSize="sm"
          fontWeight={400}
          variant="ghost"
          onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
        >
          Feedback <Box as={FaComment} d="inline" ml={2} size="14px" />
        </Button>
        <Box
          ref={ref}
          bg={colorMode === 'light' ? 'white' : 'gray.700'}
          borderRadius="md"
          bottom={'0'}
          boxShadow="xl"
          d={isFeedbackOpen ? 'block' : 'none'}
          pb={1}
          position="absolute"
          pt={2}
          px={2}
          right={'0'}
          width="339px"
        >
          <Text fontSize="sm" mb={2} textTransform="uppercase">
            Feedback
          </Text>
          <Textarea
            _focus={{ borderColor: '#319795', boxShadow: '0 0 0 1px #319795' }}
            borderRadius="md"
            height="124px"
            placeholder="Your feedback..."
            resize={'none'}
            size="sm"
          />
          <Box alignItems="center" d="flex" px={1} py={3}>
            <EmojiPalette colorMode={colorMode} />
            <Button size="sm" onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}>
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
