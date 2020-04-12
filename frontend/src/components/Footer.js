import React from 'react'
import { Box, Link } from '@chakra-ui/core'
import { FaGithub, FaHeart, FaExternalLinkSquareAlt } from 'react-icons/fa'

export const Footer = ({ faucetLink }) => {
  return (
    <Box
      position="absolute"
      width="100%"
      maxWidth={['367.25px', '367.25px', '665.2px']}
      bottom={2}
      px={[4, 4, 0, 0]}
      d="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Link color="gray.600" fontSize={'sm'} d="flex" alignItems="center" href={'https://www.xivis.com'} isExternal>
        Made by Xivis <Box ml={2} d="inline" as={FaHeart} size="14px" />
      </Link>
      <Link
        color="gray.600"
        fontSize={'sm'}
        d="flex"
        alignItems="center"
        href={'https://github.com/lndgalante/faucy'}
        isExternal
      >
        GitHub <Box ml={2} d="inline" as={FaGithub} size="14px" />
      </Link>
      <Link color="gray.600" fontSize={'sm'} d="flex" alignItems="center" href={faucetLink} isExternal>
        Faucet <Box ml={2} d="inline" as={FaExternalLinkSquareAlt} size="14px" />
      </Link>
    </Box>
  )
}
