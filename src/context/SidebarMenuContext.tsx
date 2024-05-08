import { ReactNode, createContext, useState } from 'react'

interface SidebarMenuContextType {
  isDrawerSidebarMenu: boolean
  drawerSidebarMenu: () => void
}

export const SidebarMenuContext = createContext({} as SidebarMenuContextType)

interface SidebarMenuProviderProps {
  children: ReactNode
}

export function SidebarMenuProvider({ children }: SidebarMenuProviderProps) {
  const [isDrawerSidebarMenu, setIsDrawerSidebarMenu] = useState(false)

  function drawerSidebarMenu() {
    setIsDrawerSidebarMenu(!isDrawerSidebarMenu)
  }

  return (
    <SidebarMenuContext.Provider
      value={{ isDrawerSidebarMenu, drawerSidebarMenu }}
    >
      {children}
    </SidebarMenuContext.Provider>
  )
}
