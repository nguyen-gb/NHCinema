import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useContext, lazy, Suspense } from 'react'

import { AppContext } from './contexts/app.context'
import path from './constants/path'

import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import UserLayout from './pages/User/layouts/UserLayout'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Verify = lazy(() => import('./pages/Verify'))
const ForgotPass = lazy(() => import('./pages/ForgotPass'))
const ForgotPassConfirm = lazy(() => import('./pages/ForgotPassConfirm'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'))
const BonusPoints = lazy(() => import('./pages/User/pages/BonusPoints'))
const Profile = lazy(() => import('./pages/User/pages/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ProductList = lazy(() => import('./pages/ProductList'))
const Home = lazy(() => import('./pages/Home'))
const ShowTimes = lazy(() => import('./pages/ShowTimes'))
const TicketPrices = lazy(() => import('./pages/TicketPrices'))
const Member = lazy(() => import('./pages/Member'))
const BookTickets = lazy(() => import('./pages/BookTickets'))
const Payment = lazy(() => import('./pages/Payment'))
const PaymentDetail = lazy(() => import('./pages/PaymentDetail'))
const PaymentDetailNoLogin = lazy(() => import('./pages/PaymentDetailNoLogin'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          index: true,
          path: path.home,
          element: (
            <Suspense>
              <Home />
            </Suspense>
          )
        },
        {
          index: true,
          path: path.movie,
          element: (
            <Suspense>
              <ProductList />
            </Suspense>
          )
        },
        {
          path: path.movieDetail,
          element: (
            <Suspense>
              <ProductDetail />
            </Suspense>
          )
        },
        {
          path: path.showtimes,
          element: (
            <Suspense>
              <ShowTimes />
            </Suspense>
          )
        },
        {
          path: path.fare,
          element: (
            <Suspense>
              <TicketPrices />
            </Suspense>
          )
        },
        {
          path: path.member,
          element: (
            <Suspense>
              <Member />
            </Suspense>
          )
        },
        {
          path: path.bookTickets,
          element: (
            <Suspense>
              <BookTickets />
            </Suspense>
          )
        },
        {
          path: '*',
          element: (
            <Suspense>
              <NotFound />
            </Suspense>
          )
        }
      ]
    },
    {
      path: path.paymentDetailNoLogin,
      element: (
        <Suspense>
          <PaymentDetailNoLogin />
        </Suspense>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.payment,
          element: (
            <MainLayout>
              <Suspense>
                <Payment />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.paymentDetail,
          element: (
            <MainLayout>
              <Suspense>
                <PaymentDetail />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.user,
          element: <MainLayout />,
          children: [
            {
              path: '',
              element: <UserLayout />,
              children: [
                {
                  path: path.profile,
                  element: (
                    <Suspense>
                      <Profile />
                    </Suspense>
                  )
                },
                {
                  path: path.changePassword,
                  element: (
                    <Suspense>
                      <ChangePassword />
                    </Suspense>
                  )
                },
                {
                  path: path.historyPurchase,
                  element: (
                    <Suspense>
                      <HistoryPurchase />
                    </Suspense>
                  )
                },
                {
                  path: path.historyPoint,
                  element: (
                    <Suspense>
                      <BonusPoints />
                    </Suspense>
                  )
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '',
          element: <RegisterLayout />,
          children: [
            {
              path: path.login,
              element: (
                <Suspense>
                  <Login />
                </Suspense>
              )
            },
            {
              path: path.register,
              element: (
                <Suspense>
                  <Register />
                </Suspense>
              )
            },
            {
              path: path.verify,
              element: (
                <Suspense>
                  <Verify />
                </Suspense>
              )
            },
            {
              path: path.forgotPass,
              element: (
                <Suspense>
                  <ForgotPass />
                </Suspense>
              )
            },
            {
              path: path.forgotPassConfirm,
              element: (
                <Suspense>
                  <ForgotPassConfirm />
                </Suspense>
              )
            }
          ]
        }
      ]
    }
  ])
  return routeElements
}
