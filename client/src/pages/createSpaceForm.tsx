import { useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Input, Box, VStack, HStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Center, Spinner, FormControl, FormLabel, IconButton, Heading, ModalFooter } from "@chakra-ui/react";
import { useCreateSpace } from "@/hooks/walletHooks";


export default function CreateSpaceForm(prop: { spaceId: string }) {
  const spaceId = prop.spaceId;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [participants, setParticipants] = useState<any[]>([{ address: "", share: "0" }]);
  const { createSpace, loadingNewSpace } = useCreateSpace(spaceId, participants)

  const addParticipant = () => {
    const updatedParticipants: any = [...participants, { address: '', share: "0" }];
    setParticipants(updatedParticipants);
  };

  const removeParticipant = (index: any) => {
    if (index === 0) {
      return;
    }
    const updatedParticipants: any = [...participants];
    updatedParticipants.splice(index, 1);
    setParticipants(updatedParticipants);
  };




  return (
    <Box
      p={4}
      w="100%"
      position={"absolute"}
      bg="white"
      justifyContent={"center"}
      display={"flex"}
      left={0}
      top={0}>
      <Button colorScheme="blue" onClick={() => setIsModalOpen(true)}>
        Create Consensus
      </Button>


      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>  Create Consensus
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loadingNewSpace && (
              <LoadingScreen />
            )}

            <FormControl>
              <FormLabel>Space ID</FormLabel>
              <Input
                color={"blue"}
                readOnly={true}
                isDisabled={true}
                type="text" value={spaceId}
              />
            </FormControl>

            {participants.map((participant: any, index) => (
              <HStack py={3} key={index}>
                <FormControl w="80%">
                  <FormLabel>Participant {index + 1}</FormLabel>
                  <Input
                    type="text"
                    value={participant.address}
                    onChange={(e) => {
                      const updatedParticipants: any = [...participants];
                      updatedParticipants[index].address = e.target.value;
                      setParticipants(updatedParticipants);
                    }}
                  />
                </FormControl>

                <FormControl w="20%">
                  <FormLabel>Share</FormLabel>
                  <Input
                    type="number"
                    value={participant.share}
                    onChange={(e) => {
                      const updatedParticipants: any = [...participants];
                      updatedParticipants[index].share = e.target.value;
                      setParticipants(updatedParticipants);
                    }}
                  />
                </FormControl>

                {index !== 0 && (
                  <IconButton
                    icon={<CloseIcon />}
                    onClick={() => removeParticipant(index)}
                    aria-label="Remove Participant"
                    size="sm"
                    variant="ghost"
                  />
                )}
              </HStack>
            ))}


            <VStack py={2}>
              <Button colorScheme="blue" onClick={addParticipant} w="100%">
                Add Participant
              </Button>
            </VStack>

          </ModalBody>


          <ModalFooter>

            <>
              <Button colorScheme="blue" mr={3} onClick={createSpace}>
                Create
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>

  );
}


export function LoadingScreen() {
  return <Box
    right={0}
    top={0}
    zIndex={"tooltip"}
    position={"absolute"} h="100%" w="100%"
    bg="rgba(245, 245, 245, 0.5)">
    <Center h="100%">
      <Spinner />
    </Center>
  </Box>
}