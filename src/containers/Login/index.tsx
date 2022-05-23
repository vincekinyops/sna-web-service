import React from "react"
import { 
  Box, 
  Center, 
  Text,
  Input,
  Button,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Label = ({ children, ...rest } : { children: any }) => (
  <Text 
    fontFamily="DIN2014-Regular"
    fontSize={{ base: "3.5897vw", md: "2vw", xl: "1.04vw"}}
    {...rest}
  >{children}</Text>
)

export const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  const onSubmit = () => {
    setLoading(true)

    if (!email || !password) {
      return
    }

    const creds = {
      email, password
    }

    axios.post(`${process.env.REACT_APP_API_SERVICE_URL}api/users/login`, creds)
    .then((response) => {
      
      if(response?.data.data && response.data.data.user) {
        localStorage.setItem('loginData', JSON.stringify(response.data))
        setLoading(false)
        navigate('/m', {replace: true})
      }
    }).catch((err) => {
      console.log(err)

      setLoading(false)
    })
  }

  return (
    <Box>
      <Box 
        pos="relative"
        h="100vh"
        w="100vw"
      >
        <Center
          pos="absolute"
          top="0"
          h="100vh"
          w="100vw"
          fontFamily="DIN2014-Regular"
          flexDir="column"
          justifyContent={{base: 'flex-start', md: 'center'}}
          mt={{base: '38.4615vw', md: 'unset'}}
        >
          <Center 
            w={{ base: "90%", md: "50vw", xl: "31.71vw"}} 
            flexDir="column"
          >
            <Text fontFamily="DIN2014-Bold" fontSize={{ base: '9.2307vw', md: "2.6041vw"}}>LOGIN</Text>
            <Box mt={{ base: "17vw", md: "3.3vw"}} w="100%">
              <Label>E-mail</Label>
              <Input 
                disabled={loading}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                placeholder="test@exam.com"
              />
            </Box>
            <Box mt={{ base: '14.9vw', md: "2.22vw"}} w="100%">
              <Label>Password</Label>
              <Input
                disabled={loading}
                placeholder="****"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                onKeyPress={(e) => {
                  if(e?.key === "Enter") {
                    onSubmit()
                  }
                }}
              />
            </Box>
            <Button
              _hover={{
                opacity: 0.8,
                _disabled: {
                  bg: "#1CBF73"
                }
              }}
              loadingText="Login"
              mt={{ base: "12.8vw", md: "2.31vw"}}
              mb={{ base: "14vw", md: "2.44vw"}}
              w="100%"
              bg="#1CBF73"
              color="#FFF"
              borderRadius="0px"
              isLoading={loading}
              onClick={onSubmit}
            >Login</Button>
          </Center>
        </Center>
      </Box>
    </Box>
  )
}