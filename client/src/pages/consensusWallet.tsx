import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from "wagmi";
import { useSpaceInfo, useWalletInfo, useCreateSpace, useSignAgreement } from '@/hooks/walletHooks';
import { Box, HStack, Text, Icon, Divider, VStack, Heading, Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { FaCheckCircle, FaClock } from 'react-icons/fa';
import { handleOpenExplorer, shortenAddress } from '@/constants';
import CreateSpaceForm from './createSpaceForm';
import { FiExternalLink } from 'react-icons/fi';

export type Address = string | null;

const WalletCard = ({ title, subtitle, symbol, trailing, amount, value }: any) => {
    return (
        <Box
            borderRadius="13.65px"
            h="219.55px"
            w="357.52px"
            background="linear-gradient(239.6deg, #4F81FF 0%, #151515 44.36%)"
        >
            <VStack
                w="100%"
                justifyContent="space-between"
                alignItems="flex-start"
                h="100%"
                px={6}
                py={4}
            >
                <Box>
                    <Text
                        fontSize="20px"
                        textAlign="left"
                        color="white"
                    >
                        {title}
                    </Text>
                    <Text
                        fontSize="xs"
                        textAlign="left"
                        color="#9E9E9E"
                        fontWeight="semibold"
                    >
                        {subtitle}
                    </Text>
                </Box>
                <Box>
                    <Text
                        fontSize="30px"
                        textAlign="left"
                        color="white"
                        fontWeight="normal"
                        alignItems="center"
                        display="flex"
                        py={5}
                    >
                        {amount}{' '}
                        <span style={{ marginLeft: "5px", fontSize: "12px" }}>
                            {symbol}
                        </span>
                    </Text>
                    <Text
                        fontSize="20px"
                        textAlign="left"
                        color="white"
                        fontWeight="bold"
                    >
                        ${value}
                    </Text>
                    <Text
                        fontSize="xs"
                        textAlign="left"
                        color="#9E9E9E"
                        fontWeight="semibold"
                    >
                        {trailing}
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
};

const ConsensusWallet = ({ spaceId }: { spaceId: string }) => {
    const { address } = useAccount();
    const membersList: string[] = [
        "0xf2750684eB187fF9f82e2F980f6233707eF5768C",
        "0x75bD5a94c5a727d1B458b26f546b728159587968"
    ];
    const { spaceCreated, walletCreated } = useSpaceInfo(spaceId);
    const { spaceWallet, totalBalance, walletInfo, withdraw, history } = useWalletInfo(spaceId, address!);
    const { signatureStatuses, isUserSigned, signAgreement } = useSignAgreement(spaceId, membersList, address!);
    const [ethToUsd, setEthToUsd] = useState(null);
    const ethValueInUsd1 = ethToUsd ? (parseFloat(ethers.utils.formatEther(walletInfo.balance.toString())) * ethToUsd).toFixed(3) : '-';
    const ethValueInUsd2 = ethToUsd ? (totalBalance * ethToUsd).toFixed(3) : '-';

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
                const data = await response.json();
                const ethPriceInUsd = data.ethereum.usd;
                setEthToUsd(ethPriceInUsd);
            } catch (error) {
                console.error('Error fetching exchange rate:', error);
            }
        };

        if (walletInfo) {
            fetchExchangeRate();
        }
    }, [walletInfo]);

    return (
        <HStack w="100%" bg="#f9faff" h="100vh" justifyContent="center">
            <VStack
                mt={48}
                h="100%"
                py={3}
                alignItems="flex-start"
                justifyItems="flex-start"
                w="100%"
                px={32}
                bg="#f9faff"
                justifyContent="flex-start"
            >
                <HStack spacing={28}>
                    <WalletCard
                        title="Total Balance"
                        amount={totalBalance}
                        subtitle={walletCreated && spaceWallet ? shortenAddress(spaceWallet) : ""}
                        symbol="GoerliETH"
                        value={`${ethValueInUsd2}`}
                        trailing="total value"
                    />
                    <WalletCard
                        title="My Balance"
                        amount={walletInfo ? ethers.utils.formatEther(walletInfo.balance.toString()) : "0"}
                        symbol="GoerliETH"
                        value={`${ethValueInUsd1}`}
                        trailing=" "
                        subtitle={walletInfo ? walletInfo.share + "% derivative" : ""}
                    />
                </HStack>

                {spaceWallet && walletInfo && (
                    <HStack py="35px">
                        <Button
                            w="139px"
                            h="49px"
                            bg="#2A3C68"
                            color="white"
                            onClick={withdraw}
                        >
                            Withdraw
                        </Button>
                        <Button
                            w="139px"
                            h="49px"
                            bg="white"
                            border="2px solid #2A3C68"
                            color="2A3C68"
                        >
                            Transfer
                        </Button>
                        <Button
                            h="49px"
                            bg="gray.200"
                            onClick={() => handleOpenExplorer(spaceWallet)}

                            aria-label="open explorer"
                        ><FiExternalLink />
                        </Button>
                    </HStack>
                )}

                {spaceCreated && !walletCreated && signatureStatuses && membersList.map((addr: any) => (
                    <Box key={Math.random()} w="100%" px={12}>
                        <HStack alignItems="center" w="100%" justifyContent="space-between">
                            <Text fontSize="xs">{shortenAddress(addr)}</Text>
                            <Icon
                                py={1}
                                as={signatureStatuses[addr] ? FaCheckCircle : FaClock}
                                boxSize={6}
                                color={signatureStatuses[addr] ? "green.500" : "yellow.500"}
                            />
                            {addr === address && !isUserSigned && (
                                <Button colorScheme="blue" fontSize="xs" onClick={signAgreement}>
                                    Sign Agreement
                                </Button>
                            )}
                        </HStack>
                        <Divider py={1} />
                    </Box>
                ))}

                <VStack w="100%" alignItems="space-between">
                    <Text textAlign="left" fontSize="16"
                        px={12}
                        color="#545454"
                    >
                        Transaction History
                    </Text>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Method</Th>
                                <Th>Date</Th>
                                <Th>From</Th>
                                <Th>To</Th>
                                <Th>Amount</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {history &&
                                history.map((transaction: any, index: number) => (
                                    <Tr key={index}>
                                        <Td color={transaction.method === 'Deposit' ? "#2BCC7E" : "#ED7770"}>{transaction.method}</Td>
                                        <Td>{transaction.date}</Td>
                                        <Td>{transaction.from}</Td>
                                        <Td>{transaction.to}</Td>
                                        <Td>{transaction.amount}</Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </VStack>

                {!spaceCreated && (
                    <Box
                        position="absolute"
                        w="100%"
                        top={0}
                        p={8}
                    >
                        <CreateSpaceForm
                            spaceId={spaceId}
                        />
                    </Box>
                )}

            </VStack>

        </HStack>
    );
};

export default ConsensusWallet;


