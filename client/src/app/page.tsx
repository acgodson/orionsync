
import { Box, VStack } from "./chakraUI"

export default function Home() {
  return (

    <VStack
      h="100vh"
      alignItems={"center"}
      justifyContent={"center"}
      fontSize={"2xl"}
    >
      {/* tailwind */}
      <div className="w-full text-center">
        Hey!
      </div>
      {/* chakra */}
      <Box>
        Everyday is a good day
      </Box>
    </VStack>

  )
}