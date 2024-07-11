import { createContext, useCallback, useMemo, useState } from 'react'
import { Cinema } from 'src/types/cinema.type'
import { ExtendedPurchase } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'
import { getCinemaFromLS } from 'src/utils/cinema'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  cinema: Cinema
  setCinema: React.Dispatch<React.SetStateAction<Cinema>>
  reset: () => void
}

export const getInitialAppContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  cinema: getCinemaFromLS(),
  setCinema: () => null,
  reset: () => null
})

const initialAppContext = getInitialAppContext()
const initialCinema = {}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({
  children,
  defaultValue = initialAppContext
}: {
  children: React.ReactNode
  defaultValue?: AppContextInterface
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(defaultValue.profile)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(defaultValue.extendedPurchases)
  const [cinema, setCinema] = useState<Cinema>(defaultValue.cinema ?? initialCinema)

  const reset = useCallback(() => {
    setIsAuthenticated(false)
    setProfile(null)
    setExtendedPurchases([])
  }, [setIsAuthenticated, setProfile, setExtendedPurchases])

  const value = useMemo(() => {
    return {
      isAuthenticated,
      setIsAuthenticated,
      profile,
      setProfile,
      extendedPurchases,
      setExtendedPurchases,
      cinema,
      setCinema,
      reset
    }
  }, [
    isAuthenticated,
    setIsAuthenticated,
    profile,
    setProfile,
    extendedPurchases,
    setExtendedPurchases,
    cinema,
    setCinema,
    reset
  ])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
