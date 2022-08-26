import { Button } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'

const BUCKET_URL = 'https://anatolykehl.s3.eu-central-1.amazonaws.com/'

export const Home = () => {
  const router = useRouter()
  const { data } = useSession()
  console.log({ data })
  return (
    <div>
      <Button onClick={() => signIn('cognito')}>login</Button>
      <Button onClick={() => signOut()}>logout</Button>
    </div>
  )
  // const [isPaypalScriptLoaded, setIsPaypalScriptLoaded] = useState(false)
  //
  // return (
  //   <div>
  //     <Script
  //       src="https://www.paypal.com/sdk/js?client-id=test&currency=USD"
  //       onLoad={() => setIsPaypalScriptLoaded(true)}
  //     />
  //
  //     <a href="http://localhost:3002/auth/steam">login</a>
  //     <Button
  //       onClick={() => {
  //         fetch('http://localhost:3002/new-api-key?steamid=76561198019416534', {
  //           credentials: 'include',
  //         })
  //           .then((res) => res.json)
  //           .then(console.log)
  //       }}
  //     >
  //       new key
  //     </Button>
  //     <Button
  //       onClick={() => {
  //         fetch('http://localhost:3002/auth/logout', {
  //           credentials: 'include',
  //         })
  //           .then((res) => res.json)
  //           .then(console.log)
  //       }}
  //     >
  //       logout
  //     </Button>
  //     <Button
  //       onClick={() => {
  //         fetch('http://localhost:3002/profile', {
  //           credentials: 'include',
  //         })
  //           .then((res) => res.json)
  //           .then(console.log)
  //       }}
  //     >
  //       profile
  //     </Button>
  //     <Button
  //       onClick={() => {
  //         return fetch('http://localhost:3002/stripe/checkout', {
  //           method: 'POST',
  //           body: JSON.stringify({ steamid: '76561198019416534', amount: 5 }),
  //           credentials: 'include',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           redirect: 'follow',
  //         })
  //           .then((res) => res.json)
  //           .then(console.log)
  //       }}
  //     >
  //       checkout
  //     </Button>
  //     {isPaypalScriptLoaded && (
  //       <PayPalButton
  //         createOrder={(data, actions) => {
  //           return fetch('http://localhost:3002/paypal/checkout', {
  //             method: 'post',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({ amount: 5 }),
  //           })
  //             .then(function (res) {
  //               return res.json()
  //             })
  //             .then(function (orderData) {
  //               return orderData.orderId
  //             })
  //         }}
  //         amount="5"
  //         options={{ disableCard: 'amex' }}
  //         onApprove={(data, actions) => {
  //           return fetch('http://localhost:3002/paypal/approve', {
  //             method: 'post',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({
  //               orderId: data.orderID,
  //               steamid: '76561198019416534',
  //             }),
  //           })
  //             .then(function (res) {
  //               return res.json()
  //             })
  //             .then(function (orderData) {})
  //         }}
  //       />
  //     )}
  //
  //     <SwaggerUI url="http://localhost:3002/docs" />
  //   </div>
  // )
}

export default Home
