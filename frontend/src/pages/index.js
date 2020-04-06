import React, { useState, useEffect, useCallback } from 'react'
import { useWeb3Injected } from '@openzeppelin/network/react'
import {
  Box,
  Text,
  Grid,
  Link,
  Input,
  Select,
  Button,
  useToast,
  FormLabel,
  SimpleGrid,
  FormControl,
  RadioButtonGroup,
} from '@chakra-ui/core'
import capitalize from 'lodash.capitalize'
import { FaEthereum } from 'react-icons/fa'

// Components
import { SEO } from '../ui/components/Seo'
import { Radio } from '../ui/components/Radio'

// Constants
const networks = [
  {
    value: 'ropsten',
    label: 'Ropsten',
    disabled: false,
    availableEths: [1],
    link: 'https://faucet.ropsten.be',
  },
  {
    value: 'kovan',
    label: 'Kovan',
    disabled: false,
    availableEths: [1],
    link: 'https://faucet.kovan.network/',
  },
  {
    value: 'rinkeby',
    label: 'Rinkeby',
    disabled: false,
    availableEths: [3, 7.5, 18.75],
    link: 'https://faucet.rinkeby.io/',
  },
  {
    value: 'goerli',
    label: 'Goerli',
    disabled: false,
    availableEths: [1, 2.5, 6.25],
    link: 'https://faucet.goerli.mudit.blog/',
  },
]

const HomePage = () => {
  // React hooks - Network
  const [network, setNetwork] = useState(null)
  const [faucetLink, setFaucetLink] = useState(null)

  // React hooks - Eth
  const [eth, setEth] = useState('')
  const [availableEths, setAvailableEths] = useState([])

  // React hooks - Address
  const [address, setAddress] = useState('')
  const [isValidAddress, setIsValidAddress] = useState(false)

  // Web3 hooks
  const injected = useWeb3Injected()

  // Chakra hooks
  const toast = useToast()

  const displayMessage = useCallback(
    (title, description, status) => {
      toast({ title, status, description, duration: 3000, isClosable: true, position: 'top-right' })
    },
    [toast],
  )

  // Handlers
  const handleNetworkChange = (network) => setNetwork(network)

  const handleEthChange = ({ target: { value } }) => setEth(value)

  const handleAddressChange = ({ target: { value } }) => setAddress(value)

  const handleEthClick = () => {
    const { isAddress } = injected.lib.utils
    const isAddressValid = isAddress(address)

    setIsValidAddress(!isAddressValid)
    if (!isAddressValid) return displayMessage('Address error', `${address} is not valid.`, 'error')

    displayMessage(`Eths being sent`, `We've sent ${eth} ethers 🚀`, 'success')
    setTimeout(() => {}, 1000)
  }

  // Effect - Update available eth and selected eth when network changes
  useEffect(() => {
    if (!network) return

    const foundNetwork = networks.find(({ value }) => value === network)
    if (!foundNetwork) return displayMessage('Network warning', `${capitalize(network)} is not supported.`, 'warning')

    const { availableEths, link } = foundNetwork
    setAvailableEths(availableEths)

    setEth(availableEths[0])
    setFaucetLink(link)
  }, [network, displayMessage])

  // Effect - Update network from user provider
  useEffect(() => {
    if (!injected || !injected.networkName) return
    setNetwork(injected.networkName.toLowerCase())
  }, [injected, injected.networkName])

  // Effect - Ask permission to the user provider
  useEffect(() => {
    if (!injected || !injected.requestAuth) return
    injected.requestAuth()
  }, [injected, injected.requestAuth])

  // Effect - Update address from user provider
  useEffect(() => {
    if (!injected || !injected.connected) return
    const [account] = injected.accounts
    setAddress(account)
  }, [injected, injected.connected, injected.accounts])

  return (
    <Box w="100%" height="100vh" bg="gray.50" p={4} d="flex" justifyContent="center" alignItems="center">
      <SEO title={`${network ? `Connected on ${capitalize(network)}` : ''}`} />

      <SimpleGrid>
        <Grid columnGap={6} templateColumns={['auto', 'auto', 'minmax(auto, 432px) auto']}>
          <FormControl>
            <FormLabel color="gray.700" mb={1}>
              Choose your network:
            </FormLabel>

            <RadioButtonGroup
              isInline
              d="flex"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="center"
              value={network}
              onChange={handleNetworkChange}
            >
              {networks.map(({ value, label, disabled }) => (
                <Radio
                  flex="1"
                  key={value}
                  value={value}
                  isDisabled={disabled}
                  _hover={{ boxShadow: 'sm' }}
                  _active={{ boxShadow: 'md' }}
                >
                  {label}
                </Radio>
              ))}
            </RadioButtonGroup>
          </FormControl>

          <FormControl mt={[2, 2, 0, 0]} isDisabled={!network}>
            <FormLabel htmlFor="eth" color="gray.700" mb={1}>
              Choose eth quantity:
            </FormLabel>
            <Select
              id="eth"
              color="gray.700"
              minWidth="186px"
              iconSize={4}
              icon={FaEthereum}
              onChange={handleEthChange}
              _hover={{ boxShadow: 'sm' }}
              _active={{ boxShadow: 'md' }}
              value={eth}
              placeholder={availableEths ? null : 'Gave me 1 eth!'}
            >
              {availableEths &&
                availableEths.map((availableEth) => (
                  <option key={availableEth} value={availableEth}>
                    {availableEth} ether{availableEth === 1 ? '' : 's'}
                  </option>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid columnGap={6} mt={2} templateColumns={['auto', 'auto', 'minmax(auto, 432px) auto']}>
          <FormControl isDisabled={!eth}>
            <FormLabel htmlFor="eth" color="gray.700" mb={1}>
              Insert your address:
            </FormLabel>

            <Input
              color="gray.700"
              value={address}
              isInvalid={isValidAddress}
              onChange={handleAddressChange}
              aria-label="Insert your address"
              placeholder="0x0000000000000000000000000000000000000000"
            />
          </FormControl>

          <FormControl mt={[2, 2, 0, 0]} isDisabled={!address}>
            <FormLabel htmlFor="eth" color="gray.700" mb={1}>
              Ready?
            </FormLabel>

            <Button
              width="100%"
              d="flex"
              size="md"
              bg="gray.600"
              color="white"
              isDisabled={!network}
              _hover={{ boxShadow: 'sm' }}
              _active={{ boxShadow: 'md' }}
              onClick={handleEthClick}
            >
              Send eth
            </Button>
          </FormControl>
        </Grid>
      </SimpleGrid>

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
        <Text>Buy me a coffee</Text>
        <Text>
          {faucetLink ? (
            <Link href={faucetLink} isExternal>
              Support faucet
            </Link>
          ) : null}
        </Text>
      </Box>
    </Box>
  )
}

export default HomePage
