import { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import 'react-toastify/dist/ReactToastify.css'
import useRouteElements from './useRouteElements'
import { localStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
import ErrorBoundary from './components/ErrorBoundary'
import cinemaApi from 'src/apis/cinema.api'
import { Cinema } from './types/cinema.type'
import { getLanguageFromLS, setCinemaToLS, setLanguageToLS } from './utils/cinema'

function App() {
  const routeElements = useRouteElements()
  const { reset, cinema } = useContext(AppContext)
  const { data: cinemaData } = useQuery({
    queryKey: ['cinema'],
    queryFn: cinemaApi.getCinemas
  })
  const language = getLanguageFromLS()

  useEffect(() => {
    setLanguageToLS(language || 'vi-VN')
  }, [language])

  useEffect(() => {
    let cinemaExists = false
    if (cinemaData?.data.data) {
      cinemaExists = cinemaData?.data.data.some((item) => item._id === cinema?._id)
    }
    setCinemaToLS(cinemaExists ? cinema : (cinemaData?.data.data[0] as Cinema) ?? {})
  }, [cinema, cinemaData])

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <HelmetProvider>
      <ErrorBoundary>
        {routeElements}
        <ToastContainer />
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </HelmetProvider>
  )
}

export default App
